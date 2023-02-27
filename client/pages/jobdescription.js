import { Button, Flex, Box, Text, Divider, IconButton } from "@chakra-ui/react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsShareFill } from "react-icons/bs";
import { useRouter } from "next/router";
import Popup from "@/components/ApplyJobPopup";
import ApplyJobPopup from "@/components/ApplyJobPopup";

const JobDescription = () => {
  const router = useRouter();
  return (
    <Flex direction={"column"} align="center" padding={4}>
      <Box
        width={"80vw"}
        flex="1"
        rounded={24}
        bgColor="light.50"
        p={4}
        align={"center"}
      >
        <Flex align={"center"} justify={"space-between"}>
          <IconButton
            background="none"
            _hover={{ background: "none" }}
            icon={<BsArrowLeftShort size={24} />}
            color="primary.50"
            onClick={() => router.back()}
          />
          <Flex direction={"column"} align={"center"}>
            <Text fontSize={18} fontWeight={"semibold"} color={"white"}>
              Senior Software Engineer
            </Text>
            <Text fontSize={10} fontWeight={"hairline"} color={"white"}>
              San Francisco, CA
            </Text>
          </Flex>
          <IconButton
            background="none"
            _hover={{ background: "none" }}
            icon={<BsShareFill size={16} />}
            color="primary.50"
            onClick={() => {}}
          />
        </Flex>
        <Divider borderColor={"border"} mt="3" />
        <Box overscroll={true}>
          <Text
            fontSize={12}
            fontWeight={"thin"}
            color={"white"}
            textAlign="start"
            padding={2}
          >
            Join the Media Infrastructure team and find out! We're responsible
            for storing, processing and serving 100PB+ worth of user generated
            media to our users in a reliable, cost effective, safe and secure
            way. As a Media Infrastructure engineer, you will be directly
            responsible for the end to end journey of media on Discord. You will
            also create the building blocks our product teams are using to
            launch new features allowing our users to express themselves with
            media.
            <br />
            <br /> What you'll be
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
            into the source code of a library to find the answer you're looking
            for
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
