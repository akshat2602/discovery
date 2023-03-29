import {
  Flex,
  Text,
  Button,
  Divider,
  Box,
  Hide,
  Checkbox,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";

import JobCard from "../../../components/JobCard";
import { DashboardLayout } from "../../../components/Dashboard/DashboardLayout";

const checkBoxes = ["Active", "Inactive"];

const AnalyticsPage: React.FC = () => {
  const fg = useColorModeValue("light.200", "dark.200");
  const [checkedItems, setCheckedItems] = useState([false, false]);

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
                Welcome Back, Post a new Job!
              </Text>
              <Link href={"/dashboard/job/create"}>
                <Button width="11.25rem">Post</Button>
              </Link>
            </Flex>
            <Divider my={2} borderColor={"border"}></Divider>
            <Flex mt={"2%"}>
              <Flex direction={"column"} w="100%" pr={4}>
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
              </Flex>
              <Hide below="sm">
                <Box
                  width={"200px"}
                  rounded={8}
                  height={"300px"}
                  bgColor={fg}
                  p={4}
                >
                  <Text fontSize={16} fontWeight={"medium"} noOfLines={1}>
                    Filter
                  </Text>
                  <Divider borderColor={"border"} />
                  <Flex direction={"column"}>
                    {checkBoxes.map((name, index) => (
                      <Checkbox
                        pt={2}
                        colorScheme={"primary.400"}
                        key={name}
                        isChecked={checkedItems[index]}
                        onChange={(e) => {
                          setCheckedItems([
                            ...checkedItems.slice(0, index),
                            e.target.checked,
                            ...checkedItems.slice(index + 1),
                          ]);
                        }}
                      >
                        <Text fontSize={14} fontWeight={""} noOfLines={1}>
                          {name}
                        </Text>
                      </Checkbox>
                    ))}
                  </Flex>
                </Box>
              </Hide>
            </Flex>
          </Flex>
        </Flex>
      </DashboardLayout>
    </>
  );
};

export default AnalyticsPage;
