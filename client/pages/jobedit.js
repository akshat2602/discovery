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
import ListOfCandidates from "@/components/ListOfCandidates";

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
const JobEdit = () => {
  const router = useRouter();
  const [jobSteps, setJobSteps] = useState([
    {
      roundName: "",
      isActive: true,
      isCompleted: false,
    },
  ]);
  return (
    <Flex direction={"column"} align="center" padding={4}>
      <Flex w={"100%"} marginX={12} marginY={8} direction={"column"}>
        <Flex>
          <IconButton
            background="none"
            _hover={{ background: "none" }}
            icon={<BsArrowLeftShort size={24} />}
            color="primary.50"
            onClick={() => router.back()}
          />
          <Text fontSize={30} fontWeight={"bold"} color={"white"} noOfLines={1}>
            Edit Job Details
          </Text>
        </Flex>
        <Divider my={2} borderColor={"border"}></Divider>
        <Container height={8} />
        <FormControl>
          <FormLabel fontSize={20} color={"white"}>
            Job Title
          </FormLabel>
          <Input
            type={"text"}
            placeholder={"Software Development Engineer"}
            textColor={"white"}
            size={"md"}
            _placeholder={{ color: "gray.500" }}
          />
        </FormControl>
        <Container height={8} />
        <FormControl>
          <FormLabel fontSize={20} color={"white"}>
            Job Description
          </FormLabel>
          <Textarea
            borderRadius={6}
            placeholder={"This is a placeholder job description."}
            size="md"
            height={"auto"}
            rows={10}
            textColor={"white"}
            _placeholder={{ color: "gray.500" }}
          />
        </FormControl>
        <Container height={8} />
        <Flex direction={"row"} justify={"center"}>
          <Menu>
            <MenuButton
              backgroundColor={"light.50"}
              as={Button}
              rightIcon={<FiChevronDown />}
            >
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
          <FormLabel fontSize={20} color={"white"}>
            Interview Rounds
          </FormLabel>
          {jobSteps.map((step, index) => {
            return (
              <Card
                key={index}
                rounded={12}
                borderTop={"2px"}
                borderTopColor="primary.50"
                bgColor={"light.50"}
                mb={2}
              >
                <Text
                  color={"white"}
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
                    textColor={"white"}
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
                    <Text color={"white"}>Active</Text>
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
                    <Text color={"white"}>Completed</Text>
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
                    icon={<BsFillTrashFill />}
                    color={"red.500"}
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
              bgColor={"border"}
              leftIcon={<FiPlus size={24} />}
              onClick={() => {
                setJobSteps([...jobSteps, jobStepUnit()]);
              }}
            >
              Add Round
            </Button>
          </Center>
        </FormControl>

        <ListOfCandidates />
        <Container height={8} />

        <Center>
          <Button bgColor={"primary.50"} width="170px">
            Save Edit
          </Button>
        </Center>
      </Flex>
    </Flex>
  );
};

export default JobEdit;
