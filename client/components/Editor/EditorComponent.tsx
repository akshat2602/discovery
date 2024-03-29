import { useState } from "react";

import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import { useEffect } from "react";
import { useRouter } from "next/router";
// import languages from "../../public/languages.json";
// import themeList from "monaco-themes/themes/themelist.json";

import { useBearStore } from "../../store/bearStore";

export const EditorComponent = () => {
  const activeTab = useBearStore((state) => state.activeTab);
  const ws = useBearStore((state) => state.wsForEditor);
  const router = useRouter();
  const [activeTheme, setActiveTheme] =
    useState<editor.IStandaloneThemeData | null>(null);
  const assessmentID = router.query.assessmentId as string;

  // const getLanguageFromExtension = (extension: string) => {
  //   for (const lang of languages) {
  //     if (lang.extensions && lang.extensions.includes(extension)) {
  //       return lang.name;
  //     }
  //   }
  // };

  useEffect(() => {
    import("monaco-themes/themes/Dracula.json").then((data) => {
      setActiveTheme(data as editor.IStandaloneThemeData);
    });
  }, []);
  let eventToEmit: NodeJS.Timeout | undefined = undefined;
  const handleChange = (
    value: string | undefined,
    e: editor.IModelContentChangedEvent
  ) => {
    if (value) {
      clearTimeout(eventToEmit);
      if (activeTab) {
        eventToEmit = setTimeout(() => {
          const writeFile: wsRequestResponseInterface = {
            type: "writeFile",
            payload: {
              data: value,
              file_path: activeTab.path,
              assessment_id: assessmentID,
              port: null,
            },
          };
          if (ws) {
            ws.send(JSON.stringify(writeFile));
          }
        }, 2000);
      }
    }
  };

  return (
    activeTheme && (
      <Editor
        saveViewState={true}
        height="74vh"
        width="100%"
        path={activeTab ? activeTab.path : ""}
        defaultLanguage={undefined}
        defaultValue={
          activeTab ? activeTab.value : "Click on a file and start editing"
        }
        onChange={handleChange}
        onMount={(editor, monaco) => {
          monaco.editor.defineTheme("dracula", activeTheme);
          monaco.editor.setTheme("dracula");
        }}
        options={{
          readOnly: activeTab ? false : true,
          fontSize: 14,
          fontFamily: "Roboto Mono, monospace",
        }}
      />
    )
  );
};
