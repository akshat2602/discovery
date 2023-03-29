import {
  Flex,
  Text,
  Divider,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  Input,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import CandidateJobCard from "../components/CandidateJobCard";
import Discovery from "../components/Util/Discovery";
import Logo from "../components/Util/Logo";

const CandidateJobs: React.FC = () => {
  const fg = useColorModeValue("light.200", "dark.200");
  return (
    <>
      <Flex
        flexDirection="row"
        align={"center"}
        justify={"center"}
        mt={4}
        mb="2"
      >
        <Logo height={35} width={35} />
        <Discovery fontSize={36} />
      </Flex>
      <Text fontSize={30} fontWeight={"bold"} noOfLines={1} align={"center"}>
        Welcome, Let&lsquo;s Find Your Job!
      </Text>
      <Divider my={2} borderColor={"border"}></Divider>
      <Center>
        <InputGroup
          margin={3}
          rounded={8}
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
          borderColor={fg}
          bgColor={fg}
        >
          <InputLeftElement pointerEvents="none">
            <BsSearch color="white" />
          </InputLeftElement>
          <Input type="text" fontWeight="medium" />
        </InputGroup>
      </Center>
      <SimpleGrid
        minChildWidth="240px"
        alignContent={"center"}
        ml={8}
        spacing="2"
      >
        <CandidateJobCard />
        <CandidateJobCard />
        <CandidateJobCard />
        <CandidateJobCard />
        <CandidateJobCard />
        <CandidateJobCard />
      </SimpleGrid>
    </>
  );
};

export default CandidateJobs;
