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

const JobCard: React.FC<jobInterface> = (job) => {
  const fg = useColorModeValue("light.200", "dark.200");

  return (
    <Link href={`/dashboard/job/${job.id}`}>
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
              {job.title}
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
                {job.location}
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
                {job.applicants} Applicants
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
                Posted On {job.postedOn.toDateString()}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};

export default JobCard;
