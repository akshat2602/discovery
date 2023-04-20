import { Box, Button } from "@chakra-ui/react";

import { useBearStore } from "../../../store/bearStore";
import { useRouter } from "next/router";

interface ContextForFilesProps {
  setOpen: React.Dispatch<React.SetStateAction<Boolean>>;
  x: number;
  y: number;
}

export const ContextForFiles: React.FC<ContextForFilesProps> = ({
  setOpen,
  x,
  y,
}) => {
  const [path, ws] = useBearStore((state) => [state.path, state.wsForEditor]);
  const router = useRouter();
  const assessmentID = router.query.assessmentId as string;
  const deleteFile = () => {
    const wsReq: wsRequestResponseInterface = {
      type: "deleteFile",
      payload: {
        file_path: path!,
        data: null,
        assessment_id: assessmentID,
        port: null,
      },
    };
    ws?.send(JSON.stringify(wsReq));
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
        color={"white"}
        backgroundColor={"dark.200"}
        borderRadius={"0px"}
        w={"100%"}
        h={"2.5rem"}
        cursor={"pointer"}
        border={"none"}
        outline={"none"}
        onClick={deleteFile}
      >
        Delete File
      </Button>
      {/* <Button
        color={"white"}
        backgroundColor={"dark.200"}
        borderRadius={"0px"}
        w={"100%"}
        h={"2.5rem"}
        cursor={"pointer"}
        border={"none"}
        outline={"none"}
        // onClick={renameFile}
      >
        Rename File
      </Button> */}
    </Box>
  );
};
