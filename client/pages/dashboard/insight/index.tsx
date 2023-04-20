import { Flex, Text, Divider } from "@chakra-ui/react";
import Head from "next/head";
import { DashboardLayout } from "../../../components/Dashboard/DashboardLayout";

const AnalyticsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Discovery | Analytics</title>
      </Head>
      <DashboardLayout>
        <Flex w="100%">
          <Flex w={"100%"} marginX={5} marginY={8} direction={"column"}>
            <Flex justify={"space-between"} align={"center"}>
              <Text fontSize={30} fontWeight={"bold"} noOfLines={1}>
                Checkout your Analytics!
              </Text>
              {/* <Link href={"/dashboard/job/create"}>
                <Button width="11.25rem">Post</Button>
              </Link> */}
            </Flex>
            <Divider my={2} borderColor={"border"}></Divider>
            <Flex mt={"2%"}>
              <Flex direction={"column"} w="100%" pr={4}>
                <Text>
                  This page is under construction. Please check back later!
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </DashboardLayout>
    </>
  );
};

export default AnalyticsPage;
