import { Divider, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { DashboardLayout } from "../../../components/Dashboard/DashboardLayout";

import { Box, Flex, Text, Grid } from "@chakra-ui/react";
// Define the data for job roles and stages of hiring
const jobData = [
  {
    jobRole: "Intern - Product Management Intern",
    stages: [
      { stage: "Applied", count: 200 },
      { stage: "Screening", count: 156 },
      { stage: "Coding test", count: 120 },
      { stage: "Interview-I", count: 68 },
      { stage: "HR Interview", count: 12 },
      { stage: "Hired", count: 9 },
    ],
  },
  {
    jobRole: "Mobile Developer",
    stages: [
      { stage: "Applied", count: 300 },
      { stage: "Screening", count: 216 },
      { stage: "Coding test", count: 160 },
      { stage: "Interview-I", count: 111 },
      { stage: "Interview-II", count: 75 },
      { stage: "HR Interview", count: 16 },
      { stage: "Hired", count: 9 },
    ],
  },
  {
    jobRole: "Senior Software Engineer",
    stages: [
      { stage: "Applied", count: 144 },
      { stage: "Screening", count: 101 },
      { stage: "Coding test", count: 78 },
      { stage: "Interview-I", count: 0 },
      { stage: "Interview-II", count: 0 },
      { stage: "Interview-III", count: 0 },
      { stage: "HR Interview", count: 0 },
      { stage: "Hired", count: 0 },
    ],
  },
  {
    jobRole: "Product Management Intern",
    stages: [
      { stage: "Applied", count: 200 },
      { stage: "Screening", count: 156 },
      { stage: "HR Interview", count: 12 },
      { stage: "Hired", count: 0 },
    ],
  },
  {
    jobRole: "Software Development Engineer",
    stages: [
      { stage: "Applied", count: 200 },
      { stage: "Screening", count: 0 },
      { stage: "Coding test", count: 0 },
      { stage: "Interview-I", count: 0 },
      { stage: "HR Interview", count: 0 },
      { stage: "Hired", count: 0 },
    ],
  },
];
const colorList = [
  "#7ED476",
  "#8CADED",
  "#F9FC6C",
  "#50FFFF",
  "#FF9C54",
  "#5EB1FF",
];
const AnalyticsPage: React.FC = () => {
  const fg = useColorModeValue("light.200", "dark.200");
  return (
    <>
      <Head>
        <title>Discovery | Insights</title>
      </Head>
      <DashboardLayout>
        <Box
          borderRadius="md"
          p={4}
          m={5}
          shadow="md"
          textAlign="center"
          bgColor={fg}
          borderTopWidth={"2px"}
          borderTopColor={"primary.200"}
        >
          <Text fontWeight="bold" fontSize={24}>
            HIRING PIPELINE
          </Text>
          <Divider mb={6} mt={3} borderColor={"primary.200"} />
          <Box width="100%">
            {jobData.map((job, index) => (
              <Flex
                key={job.jobRole}
                direction="row"
                width="100%"
                alignItems="center"
                mb={2}
              >
                <Flex width={"200px"}>
                  <Text
                    textAlign={"left"}
                    textOverflow={"ellipsis"}
                    noOfLines={2}
                    fontSize={16}
                    fontWeight={"medium"}
                  >
                    {job.jobRole}
                  </Text>
                </Flex>
                {job.stages.map((stage, stageIndex) => (
                  <Box
                    key={stage.stage}
                    flex={1}
                    height="65px"
                    bg={colorList[(index + stageIndex) % colorList.length]}
                    color="white"
                    textAlign="center"
                    p={2}
                    borderTopLeftRadius={stageIndex == 0 ? "md" : "none"}
                    borderBottomLeftRadius={stageIndex == 0 ? "md" : "none"}
                    borderTopRightRadius={
                      stageIndex == job.stages.length - 1 ? "md" : "none"
                    }
                    borderBottomRightRadius={
                      stageIndex == job.stages.length - 1 ? "md" : "none"
                    }
                    opacity={stage.count > 0 ? 1 : 0.5}
                  >
                    <Text
                      fontSize={14}
                      fontWeight={"medium"}
                      color={"dark.400"}
                    >
                      {stage.stage}
                    </Text>
                    {stage.count > 0 && (
                      <Text
                        fontSize={14}
                        fontWeight={"semilight"}
                        mt={1}
                        color={"dark.400"}
                      >
                        {stage.count} Candidates
                      </Text>
                    )}
                  </Box>
                ))}
              </Flex>
            ))}
          </Box>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default AnalyticsPage;
