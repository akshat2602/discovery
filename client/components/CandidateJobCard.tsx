import { Card, Divider, useColorModeValue, Flex, Text } from "@chakra-ui/react";
import { BsPeopleFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import Link from "next/link";

const CandidateJobCard = () => {
  const fg = useColorModeValue("light.200", "dark.200");
  return (
    <Card
      borderRadius="8"
      borderTopColor="primary.400"
      bgColor={fg}
      width={240}
      p={4}
      margin={2}
      height={140}
    >
      <Link href={"/jobdescription"}>
        <Flex direction={"column"} w="100%">
          <Text
            fontSize={16}
            fontWeight={"medium"}
            noOfLines={2}
            textOverflow={"ellipsis"}
            mb={1}
          >
            Intern - Product Management Intern
          </Text>
          <Text
            mb={1}
            fontSize={12}
            fontWeight={"light"}
            noOfLines={1}
            textOverflow={"ellipsis"}
          >
            San Francisco, CA
          </Text>
          <Divider borderColor={"border"} />
          <Flex height={"10"} justify={"space-between"}>
            <Flex align={"center"}>
              <BsPeopleFill color="white" height={32} />
              <Text
                ml={2}
                fontSize={10}
                fontWeight={"light"}
                noOfLines={2}
                textOverflow={"ellipsis"}
              >
                5,996
                <br />
                Applicants
              </Text>
            </Flex>
            <Flex align={"center"}>
              <AiOutlineClockCircle color="white" height={32} />
              <Text
                ml={2}
                fontSize={10}
                fontWeight={"light"}
                noOfLines={2}
                textOverflow={"ellipsis"}
              >
                Posted On
                <br />
                Feb 11, 2023
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </Card>
  );
};

export default CandidateJobCard;
