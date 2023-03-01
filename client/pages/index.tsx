import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import Logo from "../components/Util/Logo";
import Link from "next/link";
import Head from "next/head";
import Discovery from "../components/Util/Discovery";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Discovery</title>
        <meta name="description" content="Discovery | Find Jobs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box minH={"100vh"}>
        <Flex align={"center"} justify="center" h="100vh">
          <Grid
            templateColumns={"repeat(2,1fr)"}
            h="100%"
            w="100%"
            maxH="100vh"
          >
            <GridItem colSpan={1}>
              <Flex justify="center" align="center" h="100%">
                <Logo height={200} width={200} />
                <Discovery fontSize={100} />
              </Flex>
            </GridItem>
            <GridItem colSpan={1}>
              <Flex justify="center" align="center" h="100%">
                <Center>
                  <VStack>
                    <Text fontSize={"3xl"} textAlign={"center"}>
                      Welcome to Discovery!
                    </Text>
                    <Link href="/dashboard/jobs">
                      <Button
                        size="lg"
                        variant={"outline"}
                        colorScheme="primary"
                      >
                        Start hiring today!
                      </Button>
                    </Link>
                  </VStack>
                </Center>
              </Flex>
            </GridItem>
          </Grid>
        </Flex>
      </Box>
    </>
  );
};

export default Home;
