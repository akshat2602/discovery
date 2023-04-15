import { useState } from "react";

import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
// import themeList from "monaco-themes/themes/themelist.json";

import { useBearStore } from "../../store/bearStore";
import { useEffect } from "react";

export const EditorComponent = () => {
  const activeTab = useBearStore((state) => state.activeTab);
  const ws = useBearStore((state) => state.wsForEditor);
  const [activeTheme, setActiveTheme] =
    useState<editor.IStandaloneThemeData | null>(null);
  // const themes: { label: string; value: string }[] = [];

  // Object.entries(themeList).forEach(([key, value]) => {
  //   themes.push({
  //     label: value,
  //     value: key,
  //   });
  // });

  // const themeLoadPromises = {};
  // function loadTheme(value) {
  //   if (themeLoadPromises[value]) {
  //     return themeLoadPromises[value];
  //   }

  //   const themePath = themeList[value];
  //   return import(
  //     /* webpackChunkName: "theme/[request]" */ `monaco-themes/themes/${themePath}`
  //   ).then((data) => {
  //     loadedThemes[value] = true;
  //     monaco.editor.defineTheme(value, data);
  //   });
  // }

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
