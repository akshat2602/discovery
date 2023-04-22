import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  Divider,
  Box,
  Button,
  Image,
  Heading,
} from "@chakra-ui/react";
// import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

import { DashboardLayout } from "../../../../../../components/Dashboard/DashboardLayout";

import { useBearStore } from "../../../../../../store/bearStore";

const JobEdit: React.FC = () => {
  const router = useRouter();
  const users = useBearStore((state) => state.users);
  const candidateId = router.query.candidateId;
  const user = users.find((user) => {
    console.log(user.login.uuid === candidateId);
    return user.login.uuid === candidateId;
  });

  return (
    <>
      <Head>
        <title>Discovery | View Candidate</title>
      </Head>
      <DashboardLayout>
        <Flex marginX={5} marginY={8} direction={"column"} align="center">
          <Flex>
            <Text fontSize={30} fontWeight={"bold"} noOfLines={1}>
              View Candidate
            </Text>
          </Flex>
          <Divider my={2} borderColor={"border"}></Divider>

          <Flex flexDir={"row"} justifyContent={"flex-start"}>
            <Box>
              <Image
                src={user!.picture.thumbnail}
                alt="profile_picture"
                width={150}
                borderRadius={"50%"}
                height={150}
              />
            </Box>
            <Flex flexDir={"column"} marginLeft="10">
              <Heading fontSize={24}>
                {user?.name.title} {user?.name.first} {user?.name.last}
              </Heading>
              <Divider />
              <Flex flexDirection={"row"}>
                <Box>
                  <EmailIcon height={10} /> {user?.email}
                </Box>
                <Box marginTop={2} marginLeft={4}>
                  |
                </Box>
                <Box marginLeft={5}>
                  <PhoneIcon height={10} /> {user?.phone}
                </Box>
              </Flex>

              <Flex flexDirection={"row"}>
                <Box>
                  <EmailIcon height={10} /> {user?.email}
                </Box>
                <Box marginTop={2} marginLeft={4}>
                  |
                </Box>
                <Box marginLeft={5}>
                  <PhoneIcon height={10} /> {user?.phone}
                </Box>
              </Flex>
            </Flex>
          </Flex>

          <Button
            onClick={() => {
              router.push(`/assessment/7cc8f159-cb87-4c76-b282-cc3749622fcc`);
            }}
          >
            View candidate's assignment
          </Button>
        </Flex>
      </DashboardLayout>
    </>
  );
};

export default JobEdit;
