import {
  Card,
  Divider,
  IconButton,
  useColorModeValue,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { TiLocation } from "react-icons/ti";
import { BsPeopleFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import Link from "next/link";

const JobCard: React.FC = () => {
  const fg = useColorModeValue("light.200", "dark.200");

  function randomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  const jobTitles = [
    "Intern - Product Management Intern",
    "Senior Software Engineer",
    "Software Developer - Android",
    "Software Developer - iOS",
    "Software Developer - Web",
    "Software Developer - Backend",
    "Software Developer - Full Stack",
    "Software Developer - Machine Learning",
    "Software Developer - Data Science",
    "Software Developer - DevOps",
    "Software Developer - QA",
    "Software Developer - Security",
    "Software Developer - UI/UX",
    "Software Developer - Game Development",
    "Software Developer - Blockchain",
    "Software Developer - Embedded Systems",
  ];

  return (
    <Link href={`/dashboard/job/${1}`}>
      <Card
        borderRadius="8"
        borderTopColor="primary.400"
        bgColor={fg}
        borderTop={"2px"}
        mb={2}
      >
        <Flex direction={"column"}>
          <Flex px={4} py={1} align="center" justify={"space-between"}>
            <Text fontSize={16} fontWeight={"medium"}>
              {jobTitles[Math.floor(Math.random() * jobTitles.length)]}
            </Text>
            <IconButton
              aria-label="Edit"
              background="none"
              _hover={{ background: "whiteAlpha.100" }}
              icon={<FiEdit />}
              color="primary.400"
              onClick={() => {}}
            />
          </Flex>
          <Divider borderColor={"border"} />
          <Flex height={"10"} justify={"space-between"} mx={4}>
            <Flex align={"center"}>
              <TiLocation color="white" height={24} />
              <Text
                // ml={1}
                fontSize={12}
                fontWeight={"light"}
                noOfLines={1}
                textOverflow={"ellipsis"}
              >
                Bangalore, India
              </Text>
            </Flex>
            <Flex align={"center"}>
              <BsPeopleFill color="white" height={24} />
              <Text
                // ml={1}
                fontSize={12}
                fontWeight={"light"}
                noOfLines={1}
                textOverflow={"ellipsis"}
              >
                {" "}
                {Math.floor(Math.random() * 100) +
                  Math.floor(Math.random() * 100)}{" "}
                Applicants
              </Text>
            </Flex>
            <Flex align={"center"}>
              <AiOutlineClockCircle color="white" height={24} />
              <Text
                // ml={1}
                fontSize={12}
                fontWeight={"light"}
                noOfLines={1}
                textOverflow={"ellipsis"}
              >
                Posted On{" "}
                {randomDate(new Date(2023, 1, 1), new Date()).toDateString()}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};

export default JobCard;
