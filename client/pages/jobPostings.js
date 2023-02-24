import JobCard from "@/components/JobCard";
import Sidebar from "@/components/SideBar";
import {
  Flex,
  Text,
  Button,
  Divider,
  Box,
  Hide,
  Checkbox,
} from "@chakra-ui/react";

import { useState } from "react";

const checkBoxes = ["Active", "Inactive"];

export default function JobPostings() {
  const [isOpen, setSideBarOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState(checkBoxes.map(() => false));

  return (
    <>
      <Flex w="100%">
        <Hide below="sm">
          <Sidebar isOpen={isOpen} setSideBarOpen={setSideBarOpen} />
        </Hide>
        <Flex w={"100%"} marginX={12} marginY={8} direction={"column"}>
          <Flex justify={"space-between"} align={"center"}>
            <Text
              fontSize={30}
              fontWeight={"bold"}
              color={"white"}
              noOfLines={1}
            >
              Welcome Back, Post a new Job!
            </Text>
            <Button bgColor={"primary.50"} width="170px">
              Post
            </Button>
          </Flex>
          <Divider my={2} borderColor={"border"}></Divider>
          <Flex>
            <Flex direction={"column"} w="100%" pr={4}>
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
            </Flex>
            <Hide below="sm">
              <Box
                width={"200px"}
                rounded={24}
                height={"300px"}
                bgColor="light.50"
                p={4}
                align={"center"}
              >
                <Text
                  fontSize={16}
                  fontWeight={"medium"}
                  color={"white"}
                  noOfLines={1}
                >
                  Filter
                </Text>
                <Divider borderColor={"border"} />
                <Flex direction={"column"}>
                  {checkBoxes.map((name, index) => (
                    <Checkbox
                      pt={2}
                      colorScheme={"primary.50"}
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
                      <Text
                        fontSize={14}
                        fontWeight={""}
                        color={"white"}
                        noOfLines={1}
                      >
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
    </>
  );
}
