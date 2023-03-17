import { Flex, Text, Divider, IconButton } from "@chakra-ui/react";
import { BsArrowLeftShort } from "react-icons/bs";
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
import Link from "next/link";
import { useRouter } from "next/router";

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
                    bgColor={"light.400"}
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
                            jobSteps[index].isActive = e.target.checked;
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
                            jobSteps[index].isCompleted = e.target.checked;
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
      </DashboardLayout>
    </>
  );
};

export default JobEdit;
