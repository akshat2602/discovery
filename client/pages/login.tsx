import { Flex, Text, Input, Button, Center } from "@chakra-ui/react";
import Link from "next/link";

const Login: React.FC = () => {
  return (
    <Flex h="100vh" alignItems="center" justify="center">
      <Flex
        flexDirection="column"
        bg={"light.50"}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Center>
          <Text mb={6} textColor={"white"} fontSize={"24"}>
            Login
          </Text>
        </Center>
        <Input
          placeholder="johndoe@gmail.com"
          type="email"
          variant="filled"
          bgColor={"dark.50"}
          textColor={"white"}
          mb={3}
        />
        <Input
          placeholder="**********"
          type="password"
          variant="filled"
          bgColor={"dark.50"}
          textColor={"white"}
          mb={6}
        />
        <Center>
          <Link href={"/jobpostings"}>
            <Button bgColor="primary.50" mb={8}>
              Log In
            </Button>
          </Link>
        </Center>
      </Flex>
    </Flex>
  );
};

export default Login;
