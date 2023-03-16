import { Flex, Text, Divider, IconButton } from "@chakra-ui/react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { FiChevronDown, FiPlus } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import { useState } from "react";
import Head from "next/head";

import ListOfCandidates from "../../../../components/ListOfCandidates";
import { DashboardLayout } from "../../../../components/Dashboard/DashboardLayout";

const jobStepUnit = () => {
  return Object.assign(
    {},
    {
      roundName: "",
      isActive: true,
      isCompleted: false,
    }
  );
};
const JobEdit: React.FC = () => {
  const router = useRouter();
  const [jobSteps, setJobSteps] = useState([
    {
      roundName: "",
      isActive: true,
      isCompleted: false,
    },
  ]);
  return (
    <>
      <Head>
        <title>Discovery | Edit Job Posting</title>
      </Head>
      <DashboardLayout>
        <Flex marginX={5} marginY={8} direction={"column"} align="center">
          <Flex>
            <Text fontSize={30} fontWeight={"bold"} noOfLines={1}>
              View Candidates
            </Text>
          </Flex>
          <Divider my={2} borderColor={"border"}></Divider>
          <ListOfCandidates />
          <Container height={8} />
        </Flex>
      </DashboardLayout>
    </>
  );
};

export default JobEdit;
