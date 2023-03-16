import { Flex, Text, Input, Button, Center } from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";

const Login: React.FC = () => {
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
            placeholder="johndoe@gmail.com"
            type="email"
            variant="filled"
            bgColor={"dark.400"}
            mb={3}
          />
          <Input
            placeholder="**********"
            type="password"
            variant="filled"
            bgColor={"dark.400"}
            mb={6}
          />
          <Center>
            <Link href={"/dashboard/jobs"}>
              <Button bgColor="primary.400" mb={8}>
                Log In
              </Button>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
