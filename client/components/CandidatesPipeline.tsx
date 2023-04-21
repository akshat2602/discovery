import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import { useRouter } from "next/router";

interface CandidatesPipelineProps {
  job: jobInterface;
}
// Define types for the hiring stages and candidates data

const colorList: string[] = [
  "#7ED376",
  "#7D9BD3",
  "#CACC72",
  "#69B7E3",
  "#C0A1C2",
  "#00ADB5",
];

type CandidateCardProps = {
  name: {
    title: string;
    first: string;
    last: string;
  };
  jobId: string;
  id: string;
  dob: {
    date: string;
    age: number;
  };
};

const CandidateCard: React.FC<CandidateCardProps> = ({
  name,
  id,
  dob,
  jobId,
}) => {
  console.log(dob);
  const fg = useColorModeValue("light.200", "dark.200");
  const rating = Math.random() * 5;
  const router = useRouter();
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return (
      <>
        {Array(fullStars)
          .fill(null)
          .map((_, index) => (
            <StarIcon
              key={`full-star-${index}`}
              color="yellow.400"
              boxSize={3}
            />
          ))}
        {halfStar === 1 && (
          <StarIcon key="half-star" color="yellow.400" boxSize={3} />
        )}
        {Array(emptyStars)
          .fill(null)
          .map((_, index) => (
            <StarIcon
              key={`empty-star-${index}`}
              color="gray.400"
              boxSize={3}
            />
          ))}
      </>
    );
  };

  return (
    <Box
      borderRadius="md"
      p={4}
      shadow="md"
      width="200px"
      textAlign="center"
      bgColor={fg}
      onClick={() => {
        router.push(`/dashboard/job/${jobId}/candidate/${id}`);
      }}
      cursor="pointer"
    >
      <Text fontSize="16" fontWeight="semibold" mb={2}>
        {name.title} {name.first} {name.last}
      </Text>
      <Divider mb={2} />
      <Flex justify="space-between" align="center">
        <Flex align="center">
          {renderStars(rating)}
          <Text ml={1} fontSize="10" fontWeight="regular">
            {rating.toFixed(1)}
          </Text>
        </Flex>
        <Text color="gray.500" fontSize="10" fontWeight="regular">
          {new Date(dob.date).toDateString()}
        </Text>
      </Flex>
    </Box>
  );
};

const HiringStagesList: React.FC<CandidatesPipelineProps> = (jobObject) => {
  const fg = useColorModeValue("light.200", "dark.200");
  return (
    <HStack overflowX="auto" spacing={4} align="start">
      {jobObject.job.rounds.map(({ round, roundName, candidates }, index) => (
        <VStack key={round} alignContent="start">
          <Box
            borderRadius={"md"}
            p={4}
            shadow={"md"}
            minW={"200px"}
            textAlign={"center"}
            bgColor={fg}
            borderTopWidth={"2px"}
            // h={"80px"}
            borderTopColor={colorList[index]}
          >
            <Text fontWeight="bold">{roundName}</Text>
          </Box>

          {candidates?.map(({ id, name, dob }) => (
            <CandidateCard
              jobId={jobObject.job.id}
              key={id.value}
              id={id.value}
              name={name}
              // rating={rating}
              dob={dob}
            />
          ))}
        </VStack>
      ))}
    </HStack>
  );
};

const CandidatePipeline: React.FC<CandidatesPipelineProps> = (jobObject) => {
  return <HiringStagesList job={jobObject.job} />;
};

export default CandidatePipeline;
