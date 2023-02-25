import { Flex, Heading, Input, Button, Center } from "@chakra-ui/react";
import Link from "next/link";

export default function Login() {
  return (
    <Flex h="100vh" alignItems="center" justify="center">
      <Flex
        flexDirection="column"
        bg={"light.50"}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6} textColor={"white"}>
          Login
        </Heading>
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
}
