import {
  Text,
  Box,
  SimpleGrid,
  Button,
  Divider,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiHomeCircle } from "react-icons/bi";
import { FiBriefcase } from "react-icons/fi";
import { SiGoogleanalytics } from "react-icons/si";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { useBearStore } from "../../store/bearStore";

import Logo from "../Util/Logo";
import Discovery from "../Util/Discovery";
import profileSVG from "../../public/profile.svg";

const SideBar: React.FC = () => {
  const fg = useColorModeValue("light.200", "dark.200");
  const router = useRouter();
  const user = useBearStore((state) => state.user);

  const [isOpen, setNavbar] = useState<Boolean>(false);
  const [number, setNumber] = useState<Number | null>(null);

  useEffect(() => {
    if (router.pathname.split("/")[2]) {
      switch (router.pathname.split("/")[2]) {
        case "job":
          setNumber(1);
          break;
        case "insight":
          setNumber(2);
          break;
        default:
          setNumber(0);
          break;
      }
    } else if (router.pathname.split("/")[1] === "dashboard") {
      setNumber(0);
    }
  }, [router]);

  return (
    <>
      {number !== null && (
        <Box
          h="100%"
          position="fixed"
          backgroundColor={fg}
          p="4"
          paddingTop={0}
          zIndex={12}
          style={{ textAlign: "center" }}
          onMouseEnter={() => {
            if (!isOpen) setNavbar(true);
          }}
          onMouseLeave={() => {
            if (isOpen) setNavbar(false);
          }}
          minWidth={isOpen ? "15%" : "4%"}
          transition="min-width 0.2s"
          boxShadow={"sm"}
        >
          <Box pt="1.5" borderRadius="xl">
            <Link href={"/dashboard"}>
              <Flex
                h="4rem"
                mt={4}
                flexDirection="row"
                justifyContent={"center"}
                alignItems={"center"}
              >
                {isOpen ? (
                  <>
                    <Logo />
                    <Discovery />
                  </>
                ) : (
                  <Logo />
                )}
              </Flex>
            </Link>
            <Divider />
            <SimpleGrid spacingY={4} spacingX={1} mt="14" width={"100%"}>
              <Box>
                <Link href={"/dashboard"}>
                  <Button
                    mb="2"
                    h={10}
                    w="100%"
                    variant={number === 0 ? "solid" : "ghost"}
                    colorScheme={number === 0 ? "primary" : "transparent"}
                    justifyContent="flex-start"
                    size="l"
                    boxShadow={number === 0 ? "xl" : "none"}
                    transition="width 0.2s"
                  >
                    <Box>
                      <BiHomeCircle style={{ marginLeft: 8 }} size={25} />
                    </Box>
                    {isOpen ? (
                      <Text marginLeft={4} fontWeight={"normal"}>
                        Home
                      </Text>
                    ) : (
                      <></>
                    )}
                  </Button>
                </Link>
              </Box>
              <Box>
                <Link href={"/dashboard/job"}>
                  <Button
                    mb="2"
                    h={10}
                    w="100%"
                    variant={number === 1 ? "solid" : "ghost"}
                    colorScheme={number === 1 ? "primary" : "transparent"}
                    justifyContent="flex-start"
                    size="l"
                    boxShadow={number === 1 ? "xl" : "none"}
                    transition="width 0.2s"
                  >
                    <Box>
                      <FiBriefcase style={{ marginLeft: 8 }} size={25} />
                    </Box>
                    {isOpen ? (
                      <Text marginLeft={4} fontWeight={"normal"}>
                        Jobs
                      </Text>
                    ) : (
                      <></>
                    )}
                  </Button>
                </Link>
              </Box>

              <Box>
                <Link href={"/dashboard/insight"}>
                  <Button
                    mb="2"
                    h={10}
                    w="100%"
                    variant={number === 2 ? "solid" : "ghost"}
                    colorScheme={number === 2 ? "primary" : "transparent"}
                    justifyContent="flex-start"
                    size="l"
                    boxShadow={number === 2 ? "xl" : "none"}
                    transition="width 0.2s"
                  >
                    <Box>
                      <SiGoogleanalytics style={{ marginLeft: 8 }} size={25} />
                    </Box>
                    {isOpen ? (
                      <Text marginLeft={4} fontWeight={"normal"}>
                        Insights
                      </Text>
                    ) : (
                      <></>
                    )}
                  </Button>
                </Link>
              </Box>

              <Box position={"absolute"} bottom="10">
                <Box>
                  <Link href="/profile">
                    <Flex justify={"space-between"} align={"center"}>
                      <Button
                        mb="2"
                        h={10}
                        w={"100%"}
                        variant={"ghost"}
                        colorScheme={"transparent"}
                        justifyContent="flex-start"
                        size="l"
                        boxShadow={"none"}
                        transition="width 0.2s"
                      >
                        <Box>
                          <Image
                            src={profileSVG.src}
                            height={40}
                            width={40}
                            alt="profile"
                          ></Image>
                        </Box>
                        {isOpen ? (
                          <Text marginLeft={4} fontWeight={"normal"}>
                            {user?.firstName}
                            {user?.lastName}
                            {user?.username}
                          </Text>
                        ) : (
                          <></>
                        )}
                      </Button>
                    </Flex>
                  </Link>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SideBar;
