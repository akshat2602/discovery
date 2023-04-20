import { useBearStore } from "../../../store/bearStore";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface ContextForFoldersProps {
  setOpen: React.Dispatch<React.SetStateAction<Boolean>>;
  x: number;
  y: number;
  path: string | null;
}

export const ContextForFolders: React.FC<ContextForFoldersProps> = ({
  setOpen,
  x,
  y,
  path,
}) => {
  const [ws, setPath, setIsFile] = useBearStore((state) => [
    state.wsForEditor,
    state.setPath,
    state.setIsFile,
  ]);

  const router = useRouter();

  const deleteFolder = () => {
    const wsReq: wsRequestResponseInterface = {
      type: "deleteFolder",
      payload: {
        file_path: path!,
        data: null,
        assessment_id: router.query.assessmentId as string,
        port: null,
      },
    };
    ws?.send(JSON.stringify(wsReq));
  };

  const createDirectory = () => {
    setPath(path);
    setIsFile(0);
  };

  const createFile = () => {
    setPath(path);
    setIsFile(1);
  };

  return (
    <Box
      onMouseLeave={() => {
        setOpen(false);
      }}
      w={"125px"}
      zIndex={1000}
      position={"fixed"}
      fontSize={"0px"}
      left={x}
      top={y}
    >
      <Button
        onClick={createDirectory}
        color={"white"}
        backgroundColor={"dark.200"}
        borderRadius={"0px"}
        w={"100%"}
        h={"2.5rem"}
        cursor={"pointer"}
        border={"none"}
        outline={"none"}
      >
        Create Folder
      </Button>
      <Button
        onClick={createFile}
        color={"white"}
        backgroundColor={"dark.200"}
        borderRadius={"0px"}
        w={"100%"}
        h={"2.5rem"}
        cursor={"pointer"}
        border={"none"}
        outline={"none"}
      >
        Create File
      </Button>
      <Button
        onClick={deleteFolder}
        color={"white"}
        backgroundColor={"dark.200"}
        borderRadius={"0px"}
        w={"100%"}
        h={"2.5rem"}
        cursor={"pointer"}
        border={"none"}
        outline={"none"}
      >
        Delete Folder
      </Button>
    </Box>
  );
};
