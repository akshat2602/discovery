import { Flex, Text, Button, Divider } from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";

import JobCard from "../../../components/JobCard";
import { DashboardLayout } from "../../../components/Dashboard/DashboardLayout";

import { useJobStore } from "../../../store/jobStore";

const JobsPage: React.FC = () => {
  const jobs = useJobStore((state) => state.jobs);
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
                {jobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </DashboardLayout>
    </>
  );
};

export default JobsPage;
