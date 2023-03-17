import {
  Flex,
  Text,
  Input,
  Button,
  IconButton,
  Center,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import Head from "next/head";
import { useState } from "react";

import { createLogin } from "../api/loginAPI";

const Login: React.FC = () => {
  const [creds, setCreds] = useState<loginRequestInterface>({
    email: "",
    password: "",
  });
  const [show, setShow] = useState<Boolean>(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Head>
        <title>Discovery | Login</title>
      </Head>
      <Flex h="100vh" alignItems="center" justify="center">
        <Flex
          flexDirection="column"
          bg={"light.400"}
          p={12}
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
            onChange={(e) => setCreds({ ...creds, email: e.target.value })}
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
              onChange={(e) => setCreds({ ...creds, password: e.target.value })}
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
              onClick={() => createLogin(creds)}
            >
              Log In
            </Button>
          </Center>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
