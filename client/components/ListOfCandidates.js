import { Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import CandidateCard from "./CandidateCard";

const ListOfCandidates = () => {
  return (
    <Flex direction="column" width={"100%"} align="center" mt={10}>
      <Text fontSize={20} color={"white"} mb={4}>
        List of Candidates
      </Text>

      <CandidateCard
        name={"Sarah Johnson"}
        email={"sarah.johnson@example.com"}
      />
      <CandidateCard name={"Daniel Lee"} email={"daniel.lee@example.com"} />
      <CandidateCard name={"Emily Chen"} email={"emily.chen@example.com"} />
      <CandidateCard name={"Nathan Patel"} email={"nathan.patel@example.com"} />
      <CandidateCard name={"Olivia Davis"} email={"olivia.davis@example.com"} />
      <CandidateCard
        name={"Michael Smith"}
        email={"michael.smith@example.com"}
      />
      <CandidateCard
        name={"Grace Rodriguez"}
        email={"grace.rodriguez@example.com"}
      />
      <CandidateCard name={"Ethan Kim"} email={"ethan.kim@example.com"} />
      <CandidateCard
        name={"Sophia Hernandez"}
        email={"sophia.hernandez@example.com"}
      />
      <CandidateCard name={"Liam Nguyen"} email={"liam.nguyen@example.com"} />
    </Flex>
  );
};

export default ListOfCandidates;
