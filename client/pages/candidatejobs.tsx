import {
  Flex,
  Text,
  Divider,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  Input,
  Center,
  Image,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import CandidateJobCard from "../components/CandidateJobCard";
import discovery from "../public/discovery.svg";
import logo from "../public/logo.svg";

const CandidateJobs: React.FC = () => {
  return (
    <>
      <Flex
        flexDirection="row"
        align={"center"}
        justify={"center"}
        mt={4}
        mb="2"
      >
        <Image src={logo.src} height={"18"} alt="logo"></Image>
        <Image src={discovery.src} height={"18"} alt="discovery"></Image>
      </Flex>
      <Text
        fontSize={30}
        fontWeight={"bold"}
        color={"white"}
        noOfLines={1}
        align={"center"}
      >
        Welcome, Let's Find Your Job!
      </Text>
      <Divider my={2} borderColor={"border"}></Divider>
      <Center>
        <InputGroup
          margin={3}
          rounded="20"
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
          borderColor={"light.50"}
          bgColor={"light.50"}
        >
          <InputLeftElement pointerEvents="none">
            <BsSearch color="white" />
          </InputLeftElement>
          <Input type="text" textColor={"white"} fontWeight="medium" />
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
