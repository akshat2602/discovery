import { Button } from "@chakra-ui/react";

import { useRouter } from "next/router";

import { useBearStore } from "../../store/bearStore";

interface EditorButtonProps {
  path: string;
  isActive: boolean;
}

export const EditorButtonComponent: React.FC<EditorButtonProps> = ({
  path,
  isActive,
}) => {
  const [ws, addOrUpdateTab] = useBearStore((state) => [
    state.wsForEditor,
    state.addOrUpdateTab,
  ]);
  const router = useRouter();
  const assessmentID = router.query.assessmentId as string;
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
    <Button
      outline={"none"}
      minW={"100px"}
      h={"25px"}
      bg={isActive ? "dark.200" : "dark.400"}
      fontSize={"14px"}
      borderLeft={"none"}
      borderBottom={"none"}
      borderRight={"2px solid #191921"}
      fontFamily={"Droid Sans Mono, monospace"}
      // borderTop={isActive ? "1px solid #ff79c6" : "none"}
      color={isActive ? "white" : "#6272a4"}
      pl={"5px"}
      pr={"5px"}
      disabled={isActive}
      onClick={handleClick}
      borderRadius={"0px"}
    >
      {path.replace(/\\/g, "/").split("/").pop()}
    </Button>
  );
};
