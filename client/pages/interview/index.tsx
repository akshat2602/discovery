import { Button, Container, Flex, Heading, Image, Box } from "@chakra-ui/react";
import Discovery from "../../components/Util/Discovery";
import Logo from "../../components/Util/Logo";
import { CalendarIcon, RepeatClockIcon } from "@chakra-ui/icons";
import calender from "../../public/calender.svg";
import time from "../../public/access_time.svg";
const Interview: React.FC = () => {
  return (
    <>
      <Flex
        flexDirection="row"
        align="center"
        justify="space-between"
        ml={16}
        mr={16}
      >
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
    </>
  );
};
export default Interview;
