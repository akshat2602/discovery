import { Card, Divider, IconButton } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { TiLocation } from "react-icons/ti";
import { BsPeopleFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const JobCard = () => {
  return (
    <Link href={"/jobedit"}>
      <Card
        rounded={12}
        borderTop={"2px"}
        borderTopColor="primary.50"
        bgColor={"light.50"}
        mb={2}
      >
        <Flex direction={"column"}>
          <Flex px={4} py={1} align="center" justify={"space-between"}>
            <Text fontSize={16} fontWeight={"medium"} color={"white"}>
              Intern - Product Management Intern
            </Text>
            <IconButton
              background="none"
              _hover={{ background: "whiteAlpha.100" }}
              icon={<FiEdit />}
              color="primary.50"
              onClick={() => {}}
            />
          </Flex>
          <Divider borderColor={"border"} />
          <Flex height={"10"} justify={"space-between"} mx={4}>
            <Flex align={"center"}>
              <TiLocation color="white" height={24} />
              <Text
                ml={1}
                fontSize={12}
                fontWeight={"light"}
                color={"white"}
                noOfLines={1}
                textOverflow={"ellipsis"}
              >
                San Francisco, CA
              </Text>
            </Flex>
            <Flex align={"center"}>
              <BsPeopleFill color="white" height={24} />
              <Text
                ml={1}
                fontSize={12}
                fontWeight={"light"}
                color={"white"}
                noOfLines={1}
                textOverflow={"ellipsis"}
              >
                5,996 Applicants
              </Text>
            </Flex>
            <Flex align={"center"}>
              <AiOutlineClockCircle color="white" height={24} />
              <Text
                ml={1}
                fontSize={12}
                fontWeight={"light"}
                color={"white"}
                noOfLines={1}
                textOverflow={"ellipsis"}
              >
                Posted On Feb 11, 2023
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};

export default JobCard;
