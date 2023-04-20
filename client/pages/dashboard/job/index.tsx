import { Flex, Text, Button, Divider } from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";

import JobCard from "../../../components/JobCard";
import { DashboardLayout } from "../../../components/Dashboard/DashboardLayout";

import { useBearStore } from "../../../store/bearStore";

const JobsPage: React.FC = () => {
  const users = useBearStore((state) => state.users);

  return (
    <>
      <Head>
        <title>Discovery | Posted Jobs</title>
      </Head>
      <DashboardLayout>
        <Flex w="100%">
          <Flex w={"100%"} marginX={5} marginY={8} direction={"column"}>
            <Flex justify={"space-between"} align={"center"}>
              <Text fontSize={30} fontWeight={"bold"} noOfLines={1}>
                Welcome Back, Post a new Job!
              </Text>
              <Link href={"/dashboard/job/create"}>
                <Button width="11.25rem">Post</Button>
              </Link>
            </Flex>
            <Divider my={2} borderColor={"border"}></Divider>
            <Flex mt={"2%"}>
              <Flex direction={"column"} w="100%" pr={4}>
                {
                  // generate a random number of jobs
                  Array.from(
                    { length: Math.floor(Math.random() * 6) },
                    (_, i) => i
                  ).map((i) => (
                    <JobCard key={i} />
                  ))
                }
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </DashboardLayout>
    </>
  );
};

export default JobsPage;
