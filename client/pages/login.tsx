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
} from "@chakra-ui/react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { callCreateLogin } from "../api/loginAPI";

import LoginLogo from "../public/login.svg";
import Discovery from "../components/Util/Discovery";
import Logo from "../components/Util/Logo";

const Login: React.FC = () => {
  const router = useRouter();
  const [creds, setCreds] = useState<loginRequestInterface>({
    email: "",
    password: "",
  });
  const [show, setShow] = useState<Boolean>(false);

  const toast = useToast();

  const handleClick = () => setShow(!show);
  const callLogin = async () => {
    const response = await callCreateLogin(creds);
    if (!response) {
      toast({
        title: "An error occurred. Please try again later.",
        status: "error",
        variant: "top-accent",
        isClosable: true,
      });
    } else if (response.status === 200) {
      // TODO: Set global state with user info
      router.push("/dashboard/job");
    }
  };

  return (
    <>
      <Head>
        <title>Discovery | Login</title>
      </Head>
      <Flex align="center" justify="center" h="100vh">
        <Grid templateColumns={"repeat(2,1fr)"} h="100%" w="100%" maxH="100vh">
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
                bg={"light.400"}
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
                  bgColor={"dark.400"}
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
                    bgColor={"dark.400"}
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
                    onClick={() => callLogin()}
                  >
                    Log In
                  </Button>
                </Center>
              </Flex>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};

export default Login;
