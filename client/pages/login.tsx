import {
  Flex,
  Text,
  Input,
  Button,
  IconButton,
  Center,
  InputGroup,
  InputRightElement,
  Grid,
  GridItem,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { usePostLogin, useCheckUserLogin } from "../api/userAPI";

import LoginLogo from "../public/login.svg";
import Discovery from "../components/Util/Discovery";
import Logo from "../components/Util/Logo";

const Login: React.FC = () => {
  const bg = useColorModeValue("light.400", "dark.400");
  const loginMutation = usePostLogin();
  const toast = useToast();
  const router = useRouter();
  const checkLoginMutation = useCheckUserLogin();

  const [showLoginScreen, setShowLoginScreen] = useState<Boolean>(false);
  const [creds, setCreds] = useState<loginRequestInterface>({
    email: "",
    password: "",
  });
  const [show, setShow] = useState<Boolean>(false);
  const handleClick = () => setShow(!show);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setShowLoginScreen(false);
      if (!checkLoginMutation.isLoading && !checkLoginMutation.isSuccess) {
        checkLoginMutation.mutate();
      }
    } else {
      setShowLoginScreen(true);
    }
    if (checkLoginMutation.isSuccess) {
      // If the user is successfully logged in, redirect them to the dashboard
      router.push("/dashboard");
    }
    if (checkLoginMutation.isError) {
      // If the user is not logged in, show the login screen
      setShowLoginScreen(true);
    }
  }, [router, checkLoginMutation]);

  return (
    <>
      <Head>
        <title>Discovery | Login</title>
      </Head>
      {!showLoginScreen && (
        <Flex align="center" justify="center" h="100vh">
          <Text fontSize={24}>Loading...</Text>
        </Flex>
      )}
      {showLoginScreen && (
        <Flex align="center" justify="center" h="100vh">
          <Grid
            templateColumns={"repeat(2,1fr)"}
            h="100%"
            w="100%"
            maxH="100vh"
          >
            <GridItem colSpan={1}>
              <Flex
                flexDirection={"column"}
                mr={"2%"}
                h="100%"
                justify={"center"}
                align={"flex-end"}
              >
                <Flex flexDirection={"row"} justify={"center"} align={"center"}>
                  <Logo width={150} height={150} />
                  <Discovery fontSize={48} />
                </Flex>
                <Flex justify="center" align="center" flexDirection={"row"}>
                  <Image
                    src={LoginLogo.src}
                    height={400}
                    width={400}
                    alt="Login"
                  />
                </Flex>
              </Flex>
            </GridItem>
            <GridItem colSpan={1}>
              <Flex justify="left" align="center" h="100%" ml={"2%"}>
                <Flex
                  justify="center"
                  align="center"
                  flexDirection="column"
                  bg={"dark.200"}
                  p={5}
                  borderRadius={8}
                  boxShadow="lg"
                >
                  <Center>
                    <Text mb={6} fontSize={"24"}>
                      Login
                    </Text>
                  </Center>
                  <Input
                    _placeholder={{ color: "white" }}
                    placeholder="johndoe@gmail.com"
                    type="email"
                    variant={"filled"}
                    bgColor={bg}
                    isRequired={true}
                    mb={3}
                    onChange={(e) =>
                      setCreds({ ...creds, email: e.target.value })
                    }
                  />
                  <InputGroup size="md">
                    <Input
                      isRequired={true}
                      pr="4.5rem"
                      variant={"filled"}
                      bgColor={bg}
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      _placeholder={{ color: "white" }}
                      onChange={(e) =>
                        setCreds({ ...creds, password: e.target.value })
                      }
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label="Toggle password visibility"
                        variant="ghost"
                        size="sm"
                        onClick={handleClick}
                        icon={show ? <AiFillEyeInvisible /> : <AiFillEye />}
                      ></IconButton>
                    </InputRightElement>
                  </InputGroup>
                  <Center>
                    <Button
                      isDisabled={
                        creds.email.length === 0 || creds.password.length === 0
                      }
                      mt={8}
                      onClick={() => {
                        loginMutation.mutate(creds, {
                          onSuccess: (data) => {
                            router.push("/dashboard");
                          },
                          onError: (error) => {
                            toast({
                              title:
                                "An error occurred. Please try again later.",
                              status: "error",
                              variant: "top-accent",
                              isClosable: true,
                            });
                          },
                        });
                      }}
                    >
                      Log In
                    </Button>
                  </Center>
                </Flex>
              </Flex>
            </GridItem>
          </Grid>
        </Flex>
      )}
    </>
  );
};

export default Login;
