import {
  Flex,
  Box,
  Text,
  Divider,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsShareFill } from "react-icons/bs";
import { useRouter } from "next/router";
import ApplyJobPopup from "../components/ApplyJobPopup";

const JobDescription: React.FC = () => {
  const fg = useColorModeValue("light.200", "dark.200");
  const router = useRouter();
  return (
    <Flex direction={"column"} align="center" padding={4}>
      <Box width={"80vw"} flex="1" rounded={8} bgColor={fg} p={4}>
        <Flex align={"center"} justify={"space-between"}>
          <IconButton
            aria-label="Back Button"
            background="none"
            _hover={{ background: "none" }}
            icon={<BsArrowLeftShort size={24} />}
            color="primary.400"
            onClick={() => router.back()}
          />
          <Flex direction={"column"} align={"center"}>
            <Text fontSize={18} fontWeight={"semibold"}>
              Senior Software Engineer
            </Text>
            <Text fontSize={10} fontWeight={"hairline"}>
              San Francisco, CA
            </Text>
          </Flex>
          <IconButton
            aria-label="Share Button"
            background="none"
            _hover={{ background: "none" }}
            icon={<BsShareFill size={16} />}
            color="primary.400"
            onClick={() => {}}
          />
        </Flex>
        <Divider borderColor={"border"} mt="3" />
        <Box overscroll={"auto"}>
          <Text fontSize={12} fontWeight={"thin"} textAlign="start" padding={2}>
            Join the Media Infrastructure team and find out! We`&apos;`re
            responsible for storing, processing and serving 100PB+ worth of user
            generated media to our users in a reliable, cost effective, safe and
            secure way. As a Media Infrastructure engineer, you will be directly
            responsible for the end to end journey of media on Discord. You will
            also create the building blocks our product teams are using to
            launch new features allowing our users to express themselves with
            media.
            <br />
            <br /> What you`&apos;`ll be
            <br />- Solve incredibly hard scaling challenges
            <br />- Ensure our systems are fast, reliable and efficient
            <br />- Collaborate with product teams to add new features
            <br />- Write code but also manage our infrastructure
            <br />- Work with a talented team of engineers who have built one of
            the largest media serving infrastructure in the world.
            <br />
            <br /> What you should have
            <br />- 5+ years of experience writing and designing backend systems
            <br />- Experience solving complex distributed system problems
            <br />- Experience operating systems handling 1M+ qps
            <br />- Familiar with open source software, and not afraid to dig
            into the source code of a library to find the answer you`&apos;`re
            looking for
            <br />- Comfortable making tradeoffs when leading projects to ensure
            constant progress
            <br />
            <br /> Benefits found in job post
            <br />- Commuter benefits
            <br />- Medical insurance
          </Text>
        </Box>
      </Box>
      <ApplyJobPopup />
    </Flex>
  );
};

export default JobDescription;
