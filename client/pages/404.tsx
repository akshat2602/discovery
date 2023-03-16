import {
  Button,
  Box,
  Grid,
  GridItem,
  Flex,
  Center,
  VStack,
  Text,
} from "@chakra-ui/react";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import error from "../public/404.svg";

export default function Custom404() {
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
                <Image src={error} alt="404" width={500} height={500} />
              </Flex>
            </GridItem>
            <GridItem colSpan={1}>
              <Flex justify="center" align="center" h="100%">
                <Center>
                  <VStack>
                    <Text fontSize={"3xl"} textAlign={"center"}>
                      Looks like this page does not exist!
                    </Text>
                    <Link href="/">
                      <Button
                        size="lg"
                        variant={"outline"}
                        colorScheme="primary"
                      >
                        Take me back home!
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
}
