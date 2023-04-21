import {
  Button,
  Flex,
  Heading,
  Image,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";

import Discovery from "../../components/Util/Discovery";
import Logo from "../../components/Util/Logo";
import calender from "../../public/calender.svg";
import time from "../../public/access_time.svg";
import Camera from "../../components/Interview/Camera";
import focus from "../../public/focus.svg";
import code from "../../public/code.svg";
import video from "../../public/video.svg";
import mic from "../../public/mic.svg";
import notes from "../../public/notes.svg";
import settings from "../../public/settings.svg";
import speaker from "../../public/speaker.svg";
import { BsDot } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Select } from "chakra-react-select";
import { useRouter } from "next/router";

const Interview: React.FC = () => {
  const fg = useColorModeValue("light.200", "dark.200");
  const date = new Date();
  const router = useRouter();
  const [isCamView, setIsCamView] = useState<Boolean>(true);
  const [activeTheme, setActiveTheme] =
    useState<editor.IStandaloneThemeData | null>(null);
  const [language, setLanguage] = useState<string>("");
  useEffect(() => {
    import("monaco-themes/themes/Dracula.json").then((data) => {
      setActiveTheme(data as editor.IStandaloneThemeData);
    });
  }, []);
  return (
    <>
      <Flex flexDirection="row" align="center" justify="space-between" mx={16}>
        <Flex flexDirection="row" align={"center"} justify={"center"} my={4}>
          <Logo height={28} width={28} />
          <Discovery fontSize={32} />
        </Flex>
        <Flex
          flexDirection="column"
          align={"center"}
          justify={"center"}
          mt={4}
          mb="2"
        >
          <Heading fontSize={24}>
            Interview: Software Engineer - Backend
          </Heading>
          <Flex flexDirection="row" align={"center"} justify={"center"}>
            <Flex flexDirection="row" align={"center"} justify={"center"}>
              <Image src={calender.src} height={"12px"} width={"12px"} />
              <Box fontSize={"12px"} marginLeft={1} marginRight={2}>
                {date.toDateString()}
              </Box>
            </Flex>
            |
            <Flex
              flexDirection="row"
              align={"center"}
              justify={"center"}
              ml="2"
            >
              <Image src={time.src} height={"12px"} width={"12px"} />
              <Box fontSize={"12px"} marginLeft={1}>
                {date.getHours()}:00 to {date.getHours() + 2}:00, 2 hours
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <Button
          onClick={() => {
            router.push("/");
          }}
        >
          End Interview
        </Button>
      </Flex>
      <Flex
        borderRadius="8px"
        m={"auto"}
        width={"95vw"}
        objectFit={"fill"}
        justifyContent={"center"}
        height={"80vh"}
        backgroundColor={fg}
      >
        {isCamView ? (
          <Camera />
        ) : (
          <Box
            zIndex={100}
            m={"auto"}
            width={"95vw"}
            justifyContent={"center"}
            height={"80vh"}
            backgroundColor={fg}
          >
            <Select
              placeholder="select a language"
              onChange={(e) => setLanguage(e!.value)}
              options={[
                {
                  label: "C++",
                  value: "cpp",
                },
                {
                  label: "C",
                  value: "c",
                },
                {
                  label: "Python",
                  value: "python",
                },
                {
                  label: "Javascript",
                  value: "javascript",
                },
                {
                  label: "Typescript",
                  value: "typescript",
                },
                {
                  label: "Golang",
                  value: "golang",
                },
                {
                  label: "Java",
                  value: "java",
                },
              ]}
            ></Select>
            <Box
              backgroundColor={"#3A4750"}
              width="25px"
              height={"25px"}
              p={1}
              borderRadius={"8px"}
              cursor="pointer"
              onClick={() => setIsCamView(true)}
              ml={5}
            >
              <Image src={focus.src} />
            </Box>
            <Editor
              height="70vh"
              language={language}
              onMount={(editor, monaco) => {
                monaco.editor.defineTheme("dracula", activeTheme!);
                monaco.editor.setTheme("dracula");
              }}
            />
          </Box>
        )}
        <Flex
          position={"absolute"}
          height={"80vh"}
          flexDirection="column"
          justifyContent={"space-between"}
          pb={5}
        >
          <Flex
            direction={"row"}
            width="90vw"
            mt={4}
            justifyContent="space-between"
            px={4}
          >
            <Flex
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                backgroundColor={"#3A4750"}
                width="25px"
                height={"25px"}
                p={1}
                borderRadius={"8px"}
                cursor="pointer"
              >
                <Image src={focus.src} />
              </Box>
              <Box
                backgroundColor={"#3A4750"}
                width="25px"
                height={"25px"}
                marginLeft="10px"
                borderRadius={"8px"}
                onClick={() => setIsCamView(false)}
                cursor="pointer"
              >
                <Image
                  src={code.src}
                  width="17px"
                  marginTop={"8px"}
                  marginLeft="4px"
                />
              </Box>
            </Flex>
            <Flex
              flexDirection={"row"}
              backgroundColor="whiteAlpha.300"
              borderRadius={"999"}
              width="70px"
              height={"25px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <BsDot /> <Box>1:04</Box>
            </Flex>
          </Flex>
          <Flex
            direction={"row"}
            width="90vw"
            mt={4}
            justifyContent="space-between"
            px={4}
            alignItems="baseline"
          >
            <Box
              backgroundColor="whiteAlpha.300"
              borderRadius={"8px"}
              height={"25px"}
              px={2}
            >
              John Doe
            </Box>
            <Box>
              <Box
                background={"green"}
                width={"500px"}
                height={"300px"}
                borderRadius="8px"
              ></Box>
              <Box
                backgroundColor="whiteAlpha.300"
                borderRadius={"8px"}
                height={"25px"}
                px={2}
                position="absolute"
                marginTop={"-10"}
                marginLeft={"5"}
              >
                John Doe Bara
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        justifySelf={"center"}
        mx={"auto"}
        backgroundColor="#3A4750"
        justifyContent={"space-evenly"}
        p={2}
        mt={4}
        width={"350px"}
        borderRadius={"8px"}
      >
        <Image src={settings.src} cursor="pointer" />
        <Image src={video.src} cursor="pointer" />
        <Image src={mic.src} cursor="pointer" />
        <Image src={speaker.src} cursor="pointer" />
        <Image src={notes.src} cursor="pointer" />
      </Flex>
    </>
  );
};
export default Interview;
