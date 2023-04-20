import {
  Input,
  InputLeftElement,
  VStack,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import { AiOutlineReload } from "react-icons/ai";

import { useRouter } from "next/router";
import { useRef, useMemo } from "react";

import { useBearStore } from "../../../store/bearStore";

export const BrowserComponent = () => {
  const router = useRouter();
  const assessmentID = router.query.assessmentId as string;

  const [port, wsForEditor] = useBearStore((state) => [
    state.port,
    state.wsForEditor,
  ]);

  const browser = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    if (browser.current) {
      browser.current.src = browser.current.src;
    }
  };

  useMemo(() => {
    if (wsForEditor && !port) {
      const message: wsRequestResponseInterface = {
        type: "registerPort",
        payload: {
          data: null,
          file_path: "",
          assessment_id: assessmentID,
          port: null,
        },
      };
      wsForEditor.send(JSON.stringify(message));
    }
  }, [port, wsForEditor, assessmentID]);

  return (
    <>
      {port && (
        <VStack h={"100%"}>
          <InputGroup>
            <InputLeftElement>
              <Button
                variant={"ghost"}
                leftIcon={<AiOutlineReload />}
                onClick={handleRefresh}
              ></Button>
            </InputLeftElement>
            <Input
              variant={"outline"}
              defaultValue={`http://localhost:${port}`}
              w={"100%"}
              color={"white"}
              // h={"30px"}
              fontFamily={"Ubuntu Mono, monospace"}
            />
          </InputGroup>

          <iframe
            //   frameBorder={0}
            ref={browser}
            src={`http://localhost:${port}`}
            style={{ width: "100%", height: "100%" }}
          />
        </VStack>
      )}
    </>
  );
};
