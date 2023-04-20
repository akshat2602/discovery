import {
  Flex,
  Text,
  Divider,
  IconButton,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { TiLocation } from "react-icons/ti";
import { BsPeopleFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
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
  Box,
  TabList,
  Tabs,
  TabPanels,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiChevronDown, FiPlus } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { DashboardLayout } from "../../../../components/Dashboard/DashboardLayout";
import CandidatePipeline from "../../../../components/CandidatesPipeline";

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
  const fg = useColorModeValue("light.200", "dark.200");
  const router = useRouter();
  const [jobSteps, setJobSteps] = useState([
    {
      roundName: "",
      isActive: true,
      isCompleted: false,
    },
  ]);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <>
      <Head>
        <title>Discovery | Edit Job Posting</title>
      </Head>
      <DashboardLayout>
        <Flex direction={"column"} w="100%" ml={5}>
          <Text fontSize={24} fontWeight={"semibold"} mt={4}>
            Intern - Product Management Intern
          </Text>
          <Flex height={"10"} justify={"start"} mb={5}>
            <Flex align={"center"}>
              <TiLocation color="white" height={24} />
              <Text
                ml={1}
                fontSize={12}
                fontWeight={"light"}
                noOfLines={1}
                textOverflow={"ellipsis"}
              >
                San Francisco, CA
              </Text>
            </Flex>
            <Text fontSize={24} fontWeight={"semi-light"} color="grey" mx={4}>
              |
            </Text>
            <Flex align={"center"}>
              <BsPeopleFill color="white" height={24} />
              <Text
                ml={1}
                fontSize={12}
                fontWeight={"light"}
                noOfLines={1}
                textOverflow={"ellipsis"}
              >
                200 Applicants
              </Text>
            </Flex>
            <Text fontSize={24} fontWeight={"semi-light"} color="grey" mx={4}>
              |
            </Text>
            <Flex align={"center"}>
              <AiOutlineClockCircle color="white" height={24} />
              <Text
                ml={1}
                fontSize={12}
                fontWeight={"light"}
                noOfLines={1}
                textOverflow={"ellipsis"}
              >
                Posted On Feb 11, 2023
              </Text>
            </Flex>
          </Flex>
          <Box>
            <Tabs isLazy index={selectedTab} onChange={handleTabChange}>
              <TabList>
                <Tab
                  _selected={{
                    color: "primary.400",
                    borderColor: "primary.400",
                    fontWeight: "bold",
                  }}
                >
                  CANDIDATES
                </Tab>
                <Tab
                  _selected={{
                    color: "primary.400",
                    borderColor: "primary.400",
                    fontWeight: "bold",
                  }}
                >
                  JOB DETAILS
                </Tab>
                <Tab
                  _selected={{
                    color: "primary.400",
                    borderColor: "primary.400",
                    fontWeight: "bold",
                  }} 
                >
                  SETTINGS
                </Tab>
              </TabList>
              <TabPanels mt={4}>
                <TabPanel>
                  <CandidatePipeline/>
                </TabPanel>
                <TabPanel>
                  <Flex
                    marginX={5}
                    marginY={8}
                    direction={"column"}
                    align="center"
                  >
                    <Flex w={"100%"} direction={"column"}>
                      <Flex justify={"space-between"}>
                        <Text fontSize={30} fontWeight={"bold"} noOfLines={1}>
                          Edit Job Details
                        </Text>
                        <Link href={router.asPath + "/candidate"}>
                          <Button>See applicants</Button>
                        </Link>
                      </Flex>
                      <Divider my={2} borderColor={"border"}></Divider>
                      <Container height={8} />
                      <FormControl>
                        <FormLabel fontSize={20}>Job Title</FormLabel>
                        <Input
                          type={"text"}
                          placeholder={"Software Development Engineer"}
                          size={"md"}
                          _placeholder={{ color: "gray.500" }}
                        />
                      </FormControl>
                      <Container height={8} />
                      <FormControl>
                        <FormLabel fontSize={20}>Job Description</FormLabel>
                        <Textarea
                          borderRadius={6}
                          placeholder={"This is a placeholder job description."}
                          size="md"
                          height={"auto"}
                          rows={10}
                          _placeholder={{ color: "gray.500" }}
                        />
                      </FormControl>
                      <Container height={8} />
                      <Flex direction={"row"} justify={"center"}>
                        <Menu>
                          <MenuButton as={Button} rightIcon={<FiChevronDown />}>
                            Job Location
                          </MenuButton>
                          <MenuList>
                            <MenuItem>Pune</MenuItem>
                            <MenuItem>Mumbai</MenuItem>
                            <MenuItem>Bangalore</MenuItem>
                            <MenuItem>San Francisco</MenuItem>
                            <MenuItem>New York</MenuItem>
                            <MenuItem>Frankfurt</MenuItem>
                            <MenuItem>Manchester</MenuItem>
                          </MenuList>
                        </Menu>
                      </Flex>
                      <Container height={8} />
                      <FormControl>
                        <FormLabel fontSize={20}>Interview Rounds</FormLabel>
                        {jobSteps.map((step, index) => {
                          return (
                            <Card
                              key={index}
                              rounded={8}
                              borderTop={"2px"}
                              borderTopColor="primary.400"
                              bgColor={fg}
                              mb={2}
                            >
                              <Text
                                paddingTop={4}
                                paddingRight={8}
                                paddingLeft={8}
                                fontSize={16}
                              >
                                Round {index + 1}
                              </Text>
                              <Flex
                                direction={"row"}
                                px={8}
                                py={4}
                                justify={"space-around"}
                                align={"center"}
                              >
                                <Input
                                  type={"text"}
                                  value={jobSteps[index].roundName}
                                  size={"md"}
                                  placeholder={"Enter round name"}
                                  _placeholder={{ color: "gray.500" }}
                                  onChange={(e) => {
                                    jobSteps[index].roundName = e.target.value;
                                    setJobSteps([...jobSteps]);
                                  }}
                                />
                                <Container width={8} />
                                <Stack direction={"row"}>
                                  <Text>Active</Text>
                                  <Switch
                                    isChecked={jobSteps[index].isActive}
                                    colorScheme={"teal"}
                                    size={"md"}
                                    onChange={(e) => {
                                      jobSteps[index].isActive =
                                        e.target.checked;
                                      setJobSteps([...jobSteps]);
                                    }}
                                  />
                                </Stack>
                                <Container width={8} />
                                <Stack direction={"row"}>
                                  <Text>Completed</Text>
                                  <Switch
                                    isChecked={jobSteps[index].isCompleted}
                                    colorScheme={"teal"}
                                    size={"md"}
                                    onChange={(e) => {
                                      jobSteps[index].isCompleted =
                                        e.target.checked;
                                      setJobSteps([...jobSteps]);
                                    }}
                                  />
                                </Stack>
                                <Container width={8} />
                                <IconButton
                                  aria-label="Delete"
                                  icon={<BsFillTrashFill />}
                                  fontSize={30}
                                  onClick={() => {
                                    jobSteps.splice(index, 1);
                                    setJobSteps([...jobSteps]);
                                  }}
                                />
                              </Flex>
                            </Card>
                          );
                        })}
                        <Container height={4} />
                        <Center>
                          <Button
                            leftIcon={<FiPlus size={24} />}
                            onClick={() => {
                              setJobSteps([...jobSteps, jobStepUnit()]);
                            }}
                          >
                            Add Round
                          </Button>
                        </Center>
                      </FormControl>
                      <Container height={8} />

                      <Center>
                        <Button width="11.25rem">Save Edit</Button>
                      </Center>
                    </Flex>
                  </Flex>
                </TabPanel>
                <TabPanel></TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </DashboardLayout>
    </>
  );
};

export default JobEdit;
