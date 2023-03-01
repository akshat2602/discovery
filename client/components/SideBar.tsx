import { Flex } from "@chakra-ui/react";
import React from "react";
import {
  IconButton,
  Divider,
  Avatar,
  Heading,
  Text,
  Menu,
  Icon,
  Link,
  Image,
} from "@chakra-ui/react";
import profileIcon from "../public/profile.svg";
import discovery from "../public/discovery.svg";
import logo from "../public/logo.svg";
import { FiMenu, FiBriefcase } from "react-icons/fi";
import { useState } from "react";

interface sideBarProps {
  isOpen: boolean;
  // setSideBarOpen is React useState Function
  setSideBarOpen: Function;
}

const Sidebar: React.FC<sideBarProps> = ({ isOpen, setSideBarOpen }) => {
  const [selectedItem, setSelectedItem] = useState(1);
  return (
    <Flex
      bg="light.50"
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      w={isOpen ? "220px" : "90px"}
      rounded={24}
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      flexDir="column"
      justifyContent="space-between"
      align={"center"}
    >
      <Flex
        p="6px"
        flexDir="column"
        w="100%"
        alignItems={"flex-start"}
        as="nav"
        ml={5}
      >
        <Flex flexDirection="row" align={"center"} mt={5}>
          <IconButton
            aria-label="Menu"
            background="none"
            _hover={{ background: "none" }}
            icon={<FiMenu />}
            color="white"
            onClick={() => {
              isOpen ? setSideBarOpen(false) : setSideBarOpen(true);
            }}
          />
          <Image
            display={isOpen ? "flex" : "none"}
            src={logo.src}
            height={"18px"}
            alt="logo"
          ></Image>
          <Image
            display={isOpen ? "flex" : "none"}
            src={discovery.src}
            height={"18px"}
            ml={1}
            mt={1}
            alt="discovery"
          ></Image>
        </Flex>
        <Flex mt={30} flexDir="column" w={isOpen ? "170px" : "40px"}>
          <Menu>
            <Link
              backgroundColor={selectedItem == 1 ? "primary.50" : "none"}
              p={3}
              borderRadius={8}
              _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
              w={"100%"}
            >
              <Flex align={"center"} w="100%" height={"8px"} pt={2} pb={2}>
                <Icon as={FiBriefcase} fontSize={"18px"} color={"white"} />
                <Text
                  ml={5}
                  display={isOpen ? "flex" : "none"}
                  fontSize={18}
                  fontWeight={"medium"}
                  textColor={"white"}
                >
                  Jobs
                </Text>
              </Flex>
            </Link>
          </Menu>
        </Flex>
      </Flex>

      <Flex
        p="6px"
        flexDir="column"
        w="100%"
        height={"70px"}
        alignItems={"center"}
        mb={4}
      >
        <Divider borderColor={"border"} />
        <Flex mt={4} align="center">
          <Avatar size="sm" src={profileIcon.src} />
          <Flex flexDir="column" ml={4} display={isOpen ? "flex" : "none"}>
            <Heading
              fontSize="18"
              textColor={"white"}
              fontWeight={"medium"}
              maxWidth="130px"
              textOverflow={"clip"}
              noOfLines={1}
            >
              John Mathew
            </Heading>
            <Text
              fontSize="12"
              textColor={"white"}
              fontWeight={"thin"}
              maxWidth="130px"
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

export default Sidebar;
