import { Box } from "@chakra-ui/react";

import { useEffect, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { EditorComponent } from "../../../components/Editor/EditorComponent";
import { FolderStructureComponent } from "../../../components/Editor/Folder/FolderComponent";
import { FolderModal } from "../../../components/Editor/Folder/FolderModal";
import { FileModal } from "../../../components/Editor/Folder/FileModal";
import { BrowserComponent } from "../../../components/Editor/Browser/BrowserComponent";
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
// import { useContainerCreate } from "../../../api/containerAPI";

const Playground: React.FC<{ assessmentId: string }> = ({ assessmentId }) => {
  const router = useRouter();
  const [
    setActiveTab,
    setEditorWs,
    setFolderStructure,
    setIsFile,
    setPath,
    setPort,
  ] = useBearStore((state) => [
    state.setActiveTab,
    state.setEditorWs,
    state.setFolderStructure,
    state.setIsFile,
    state.setPath,
    state.setPort,
  ]);

  const result = useGetDirectory(assessmentId);
  // const containerMutation = useContainerCreate(assessmentId);
  // containerMutation.mutate();
  useEffect(() => {
    if (result.isSuccess) {
      setFolderStructure(result.data.data.message[0]);
    }
  }, [result.isSuccess]);

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
            setActiveTab(path, fileContent!);
            break;
          case "validateFolderStructure":
            result.refetch();
            setPath(null);
            setIsFile(-1);
            break;
          case "registerPort":
            const port = data.payload.port;
            setPort(port!);
          default:
            break;
        }
      };
    };
  }

  return (
    <>
      <FolderModal />
      <FileModal />
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
        <BrowserComponent />
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  assessmentId: string;
}> = async (context) => {
  const assessmentId = context.params!.assessmentId as string;
  // Pass data to the page via props
  return { props: { assessmentId } };
};

export default Playground;
