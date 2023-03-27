import { Box } from "@chakra-ui/react";

import dynamic from "next/dynamic";
import { useEffect } from "react";

import { EditorComponent } from "../../../components/Editor/EditorComponent";
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

const Playground: React.FC = () => {
  const setActiveTab = useBearStore((state) => state.setActiveTab);
  const setEditorWs = useBearStore((state) => state.setEditorWs);
  const ws = useBearStore((state) => state.wsForEditor);

  useEffect(() => {
    const tempWs = new WebSocket("ws://localhost:8080/file");
    setEditorWs(tempWs);
  }, []);

  if (ws) {
    ws.onopen = () => {
      setEditorWs(ws);
      ws.onmessage = (msg) => {
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
          Folders go here!
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
