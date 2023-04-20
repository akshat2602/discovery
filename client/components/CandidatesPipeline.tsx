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
const colorList: string[] = [
  "#7ED376",
  "#7D9BD3",
  "#CACC72",
  "#69B7E3",
  "#C0A1C2",
  "#00ADB5",
];
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
      { name: "Bernardo Carney", rating: 3, daysAgo: 7 },
      { name: "Zack Beier", rating: 4, daysAgo: 6 },
      { name: "Gregorio Senger", rating: 5, daysAgo: 8 },
      { name: "Sandrine Ruecker", rating: 1, daysAgo: 9 },
      { name: "Shawn Moss", rating: 4, daysAgo: 4 },
      { name: "Zander Mante", rating: 3, daysAgo: 3 },
      { name: "Aniya Huel", rating: 2, daysAgo: 7 },
    ],
  },
  {
    stage: "CODING TEST",
    candidates: [
      { name: "Deandre Barry", rating: 4, daysAgo: 10 },
      { name: "Fidel Gutkowski", rating: 3, daysAgo: 6 },
      { name: "Garett", rating: 4, daysAgo: 5 },
      { name: "Richie Lubowitz", rating: 0, daysAgo: 7 },
      { name: "Jocelyn Okon", rating: 1, daysAgo: 6 },
    ],
  },
  {
    stage: "INTERVIEW",
    candidates: [
      { name: "Olga Streich", rating: 4, daysAgo: 7 },
      { name: "Demarcus Dooley", rating: 3, daysAgo: 8 },
      { name: "Scott Lang", rating: 5, daysAgo: 9 },
    ],
  },
  {
    stage: "HR INTERVIEW",
    candidates: [
      { name: "Marielle James", rating: 2, daysAgo: 9 },
      { name: "Kristina Effert", rating: 4, daysAgo: 2 },
    ],
  },
  {
    stage: "HIRED",
    candidates: [{ name: "Easton Whener", rating: 4, daysAgo: 1 }],
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
      borderRadius="md"
      p={4}
      shadow="md"
      width="200px"
      textAlign="center"
      bgColor={"dark.200"}
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
    {hiringStages.map(({ stage, candidates }, index) => (
      <VStack key={stage} alignContent="start">
        <Box
          borderRadius="md"
          p={4}
          shadow="md"
          width="200px"
          textAlign="center"
          bgColor={"dark.200"}
          borderTopWidth={"2px"}
          borderTopColor={colorList[index]}
        >
          <Text fontWeight="bold">{stage}</Text>
        </Box>

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
