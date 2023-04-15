import { Box } from "@chakra-ui/react";

import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { EditorComponent } from "../../../components/Editor/EditorComponent";
import { FolderStructureComponent } from "../../../components/Editor/FolderComponent";
const ShellComponent = dynamic(
  () =>
    import("../../../components/Editor/ShellComponent").then(
      (mod) => mod.ShellComponent
    ),
  {
    ssr: false,
  }
);

import { useBearStore } from "../../../store/bearStore";
import { useGetDirectory } from "../../../api/folderAPI";

const Playground: React.FC = () => {
  const router = useRouter();
  const [setActiveTab, setEditorWs, ws, setFolderStructure] = useBearStore(
    (state) => [
      state.setActiveTab,
      state.setEditorWs,
      state.wsForEditor,
      state.setFolderStructure,
    ]
  );
  const assessmentId = router.query["assessmentId"];
  const result = useGetDirectory(assessmentId as string);
  if (!result.isLoading && result.isSuccess) {
    setFolderStructure(result.data.data);
  }
  const isBrowser = typeof window !== "undefined";
  const tempWs = useMemo(
    () => (isBrowser ? new WebSocket("ws://localhost:8080/file") : null),
    [isBrowser]
  );
  if (tempWs) {
    tempWs.onopen = () => {
      setEditorWs(tempWs);
      tempWs.onmessage = (msg) => {
        const data: wsRequestResponseInterface = JSON.parse(msg.data);
        switch (data.type) {
          case "readFile":
            const fileContent = data.payload.data;
            const path = data.payload.file_path;
            setActiveTab(path, fileContent);
            break;
          default:
            break;
          // case "registerPort":
          //   const port = data.payload.port;
          //   setPort(port);
        }
      };
    };
  }

  return (
    ws && (
      <Box style={{ display: "flex" }}>
        <Box
          pr={10}
          pt={"0.25vh"}
          minW={"250px"}
          maxW={"25%"}
          h={"100vh"}
          overflow={"auto"}
        >
          <FolderStructureComponent />
        </Box>
        <Box display={"flex"} flexDirection={"column"} width={"100%"}>
          <Box borderBottom={"1px solid"}>
            <EditorComponent />
          </Box>
          <ShellComponent />
        </Box>
      </Box>
    )
  );
};

export default Playground;
