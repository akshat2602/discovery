import { Flex, Text, Divider, IconButton } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";

import Head from "next/head";

import ListOfCandidates from "../../../../../components/ListOfCandidates";
import { DashboardLayout } from "../../../../../components/Dashboard/DashboardLayout";

const JobEdit: React.FC = () => {
  return (
    <>
      <Head>
        <title>Discovery | View Candidates</title>
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
