import { Flex, Text, Divider, Box, Button } from "@chakra-ui/react";

import Head from "next/head";
import { useRouter } from "next/router";

import { DashboardLayout } from "../../../../../../components/Dashboard/DashboardLayout";

import { useBearStore } from "../../../../../../store/bearStore";

const JobEdit: React.FC = () => {
  const router = useRouter();
  const users = useBearStore((state) => state.users);
  const user = users.find((user) => user.id.value === router.query.candidateId);
  return (
    <>
      <Head>
        <title>Discovery | View Candidate</title>
      </Head>
      <DashboardLayout>
        <Flex marginX={5} marginY={8} direction={"column"} align="center">
          <Flex>
            <Text fontSize={30} fontWeight={"bold"} noOfLines={1}>
              View Candidate
            </Text>
          </Flex>
          <Divider my={2} borderColor={"border"}></Divider>
          <Box>
            Please add the candidate's details here. This is a work in progress.
          </Box>
          <Button
            onClick={() => {
              router.push(`/assessment/7cc8f159-cb87-4c76-b282-cc3749622fcc`);
            }}
          >
            View candidate's assignment
          </Button>
        </Flex>
      </DashboardLayout>
    </>
  );
};

export default JobEdit;
