import { Button, Flex, Heading, Image, Box } from "@chakra-ui/react";
import Discovery from "../../components/Util/Discovery";
import Logo from "../../components/Util/Logo";
import calender from "../../public/calender.svg";
import time from "../../public/access_time.svg";
import Camera from "../../components/Interview/Camera";
import focus from "../../public/focus.svg";
import code from "../../public/code.svg";
import { BsDot } from "react-icons/bs";
const Interview: React.FC = () => {
  return (
    <>
      <Flex flexDirection="row" align="center" justify="space-between" mx={16}>
        <Flex flexDirection="row" align={"center"} justify={"center"} my={4}>
          <Logo height={35} width={35} />
          <Discovery fontSize={36} />
        </Flex>
        <Flex
          flexDirection="column"
          align={"center"}
          justify={"center"}
          mt={4}
          mb="2"
        >
          <Heading fontSize={24}>Interview: Product Management Intern</Heading>
          <Flex flexDirection="row" align={"center"} justify={"center"}>
            <Flex flexDirection="row" align={"center"} justify={"center"}>
              <Image src={calender.src} height={"12px"} width={"12px"} />
              <Box fontSize={"12px"} marginLeft={1} marginRight={2}>
                Wednesday, Feb 16, 2023
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
                9:30am to 11:30am, 2 hours
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <Button>End Interview</Button>
      </Flex>
      <Flex
        borderRadius="8px"
        m={"auto"}
        width={"95vw"}
        objectFit={"fill"}
        justifyContent={"center"}
        height={"80vh"}
        backgroundColor={"black"}
      >
        <Camera />
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
              >
                <Image src={focus.src} />
              </Box>
              <Box
                backgroundColor={"#3A4750"}
                width="25px"
                height={"25px"}
                marginLeft="10px"
                borderRadius={"8px"}
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
    </>
  );
};
export default Interview;
