import { Flex } from "@chakra-ui/react";
import React from "react";
import {
  Divider,
  Avatar,
  Heading,
  Text,
  Menu,
  Icon,
  Link,
  Button,
} from "@chakra-ui/react";
import profileIcon from "../../public/profile.svg";
import { FiBriefcase } from "react-icons/fi";
import { useState } from "react";
import Logo from "../Util/Logo";
import Discovery from "../Util/Discovery";

const SideBar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState(1);

  return (
    <Flex
      bg="light.50"
      pos="fixed"
      // left="5"
      h="100vh"
      p={"0.25rem"}
      // marginTop="2.5vh"
      // rounded={24}
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      flexDir="column"
      justifyContent="space-between"
      align={"center"}
    >
      <Flex
        // m={"2rem"}
        flexDir="column"
        // w="100%"
        alignItems={"flex-start"}
        as="nav"
      >
        <Flex flexDirection="row" align={"center"} mt={5}>
          <Logo />
          <Discovery fontSize={24} />
        </Flex>

        <Flex marginY={12} flexDir="column">
          <Menu>
            <Link href="/dashboard/jobs" _hover={{ textDecor: "none" }}>
              <Flex align={"center"} height={"1rem"} pt={2} pb={2}>
                <Button
                  leftIcon={<FiBriefcase />}
                  backgroundColor={selectedItem == 1 ? "dark.400" : "none"}
                  p={4}
                  borderRadius={8}
                  w={"100%"}
                >
                  Jobs
                </Button>
              </Flex>
            </Link>
          </Menu>
        </Flex>
      </Flex>

      <Flex
        // m={"2rem"}
        flexDir="column"
        // w="100%"
        // height={"70px"}
        alignItems={"center"}
        mb={2}
      >
        <Divider borderColor={"border"} />
        <Flex mt={4} align="center">
          {/* TODO: Fix upar neeche profile icon */}
          <Avatar size="sm" src={profileIcon.src} />
          <Flex flexDir="column" ml={4}>
            <Heading
              fontSize="18"
              color={"white"}
              fontWeight={"medium"}
              // maxWidth="130px"
              textOverflow={"clip"}
              noOfLines={1}
            >
              John Mathew
            </Heading>
            <Text
              fontSize="12"
              fontWeight={"thin"}
              // maxWidth="130px"
              textOverflow={"clip"}
              noOfLines={1}
            >
              johnmathew@gmail.com
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;
