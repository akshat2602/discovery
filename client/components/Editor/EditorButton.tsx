import { Box, Text, HStack, Button } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";

import { useRouter } from "next/router";
import { useRef } from "react";

import { useBearStore } from "../../store/bearStore";

interface EditorButtonProps {
  path: string;
  isActive: boolean;
}

export const EditorButtonComponent: React.FC<EditorButtonProps> = ({
  path,
  isActive,
}) => {
  const [ws, addOrUpdateTab, removeTabs, removeActiveTab] = useBearStore(
    (state) => [
      state.wsForEditor,
      state.addOrUpdateTab,
      state.removeTabs,
      state.removeActiveTab,
    ]
  );
  const router = useRouter();
  const assessmentID = router.query.assessmentId as string;

  // const closeTab = (e: React.MouseEvent<Element, MouseEvent>) => {
  //   e.stopPropagation();
  //   removeTabs(path);
  //   if (isActive) {
  //     removeActiveTab();
  //   }
  // };

  const handleClick = () => {
    const message: wsRequestResponseInterface = {
      type: "readFile",
      payload: {
        data: null,
        file_path: path,
        assessment_id: assessmentID,
        port: null,
      },
    };
    ws!.send(JSON.stringify(message));
    addOrUpdateTab(path);
  };

  return (
    <Box
      cursor={"pointer"}
      outline={"none"}
      minW={"100px"}
      h={"100%"}
      bg={isActive ? "dark.200" : "dark.400"}
      fontSize={"14px"}
      borderLeft={"none"}
      borderBottom={"none"}
      borderRight={"2px solid #191921"}
      fontFamily={"Droid Sans Mono, monospace"}
      borderTop={isActive ? "1px solid #ff79c6" : "none"}
      color={isActive ? "white" : "#6272a4"}
      pl={"5px"}
      pr={"5px"}
      // disabled={isActive}
      onClick={handleClick}
      borderRadius={"4px 4px 0 0"}
    >
      {/* <HStack> */}
      <Text>{path.replace(/\\/g, "/").split("/").pop()}</Text>
      {/* <Button onClick={closeTab} h={"100%"} variant={"ghost"}>
          <AiOutlineClose size={"10px"} />
        </Button> */}
      {/* </HStack> */}
    </Box>
  );
};
