import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
// Define types for the hiring stages and candidates data
type Candidate = {
  name: string;
  rating: number;
  daysAgo: number;
};

type HiringStage = {
  stage: string;
  candidates: Candidate[];
};
const hiringStages: HiringStage[] = [
  {
    stage: "APPLIED",
    candidates: [
      { name: "Deandre Barry", rating: 0, daysAgo: 10 },
      { name: "Hubert Frederick", rating: 0, daysAgo: 12 },
      { name: "Anton Green", rating: 0, daysAgo: 16 },
      { name: "Jewell Spence", rating: 0, daysAgo: 15 },
      { name: "Erin Gould", rating: 0, daysAgo: 13 },
      { name: "Giovanni Wang", rating: 0, daysAgo: 18 },
      { name: "Brock Heath", rating: 0, daysAgo: 19 },
    ],
  },
  {
    stage: "SCREENING",
    candidates: [
      { name: "Candidate 3", rating: 5, daysAgo: 3 },
      { name: "Candidate 4", rating: 3, daysAgo: 5 },
    ],
  },
  {
    stage: "CODING TEST",
    candidates: [
      { name: "Candidate 5", rating: 4, daysAgo: 4 },
      { name: "Candidate 6", rating: 5, daysAgo: 7 },
    ],
  },
  {
    stage: "INTERVIEW",
    candidates: [
      { name: "Candidate 1", rating: 3, daysAgo: 2 },
      { name: "Candidate 2", rating: 4, daysAgo: 1 },
    ],
  },
  {
    stage: "HR INTERVIEW",
    candidates: [
      { name: "Candidate 1", rating: 3, daysAgo: 2 },
      { name: "Candidate 2", rating: 4, daysAgo: 1 },
    ],
  },
  {
    stage: "HIRED",
    candidates: [
      { name: "Candidate 1", rating: 3, daysAgo: 2 },
      { name: "Candidate 2", rating: 4, daysAgo: 1 },
    ],
  },
];
type CandidateCardProps = {
  name: string;
  rating: number;
  daysAgo: number;
};
const CandidateCard: React.FC<CandidateCardProps> = ({
  name,
  rating,
  daysAgo,
}) => {
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
      borderWidth="1px"
      borderRadius="md"
      p={4}
      shadow="md"
      width="200px"
      textAlign="center"
    >
      <Text fontSize="16" fontWeight="semibold" mb={2}>
        {name}
      </Text>
      <Divider mb={2} />
      <Flex justify="space-between" align="center">
        <Flex align="center">
          {renderStars(rating)}
          <Text ml={1} fontSize="10" fontWeight="regular">
            {rating.toFixed(1)}
          </Text>
        </Flex>
        <Text
          color="gray.500"
          fontSize="10"
          fontWeight="regular"
        >{`${daysAgo} days ago`}</Text>
      </Flex>
    </Box>
  );
};
const HiringStagesList: React.FC = () => (
  <HStack overflowX="auto" spacing={4} align="start">
    {hiringStages.map(({ stage, candidates }) => (
      <VStack key={stage} alignContent="start">
        <Text fontWeight="bold">{stage}</Text>
        {candidates.map(({ name, rating, daysAgo }) => (
          <CandidateCard
            key={name}
            name={name}
            rating={rating}
            daysAgo={daysAgo}
          />
        ))}
      </VStack>
    ))}
  </HStack>
);
const CandidatePipeline: React.FC = () => {
  return <HiringStagesList />;
};

export default CandidatePipeline;
