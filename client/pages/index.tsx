import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Text,
  VStack,
} from "@chakra-ui/react";

import Link from "next/link";
import Head from "next/head";

import LandingLogo from "../public/landing.svg";
import Logo from "../components/Util/Logo";
import Discovery from "../components/Util/Discovery";
import Image from "next/image";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Discovery</title>
        <meta name="description" content="Discovery | Find Jobs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex align={"center"} justify="center" h="100vh">
        <Grid templateColumns={"repeat(2,1fr)"} h="100%" w="100%" maxH="100vh">
          <GridItem colSpan={1}>
            <Flex justify="right" align="center" h="100%">
              <Image
                src={LandingLogo.src}
                height={400}
                width={400}
                alt="Landing"
              />
            </Flex>
          </GridItem>
          <GridItem colSpan={1}>
            <Flex justify="left" align="center" h="100%">
              <VStack>
                <Text fontSize={"3xl"} textAlign={"center"}>
                  Welcome to Discovery!
                </Text>
                <Link href="/dashboard/job">
                  <Button size="lg" variant={"outline"} colorScheme="primary">
                    Start hiring today!
                  </Button>
                </Link>
              </VStack>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};

export default Home;
