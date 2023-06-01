import { Box } from "@chakra-ui/react";

import { useEffect, useMemo } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

import { EditorComponent } from "../../../components/Editor/EditorComponent";
import { FolderStructureComponent } from "../../../components/Editor/Folder/FolderComponent";
import { FolderModal } from "../../../components/Editor/Folder/FolderModal";
import { FileModal } from "../../../components/Editor/Folder/FileModal";
import { BrowserComponent } from "../../../components/Editor/Browser/BrowserComponent";
import { EditorTabsComponent } from "../../../components/Editor/EditorTabsComponent";
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
      <Head>
        <title>Discovery | Assessment</title>
      </Head>
      <FolderModal />
      <FileModal />
      <Box display={"flex"}>
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
        <Box h={"100vh"} w={"100vw"}>
          <Allotment>
            <Box
              display={"flex"}
              flexDirection={"column"}
              w={"100%"}
              h={"100%"}
            >
              <Box borderBottom={"1px solid #bd93f9"}>
                <EditorTabsComponent />
                <EditorComponent />
              </Box>
              <ShellComponent />
            </Box>
            <BrowserComponent />
          </Allotment>
        </Box>
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
