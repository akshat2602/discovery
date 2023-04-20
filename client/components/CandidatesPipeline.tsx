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
  name: {
    title: string;
    first: string;
    last: string;
  };
  // rating: number;
  id: string;
  dob: Date;
};
const CandidateCard: React.FC<CandidateCardProps> = ({ name, id, dob }) => {
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
        // router.push(`dashboard/job//candidate/${id}`);
        console.log("here");
      }}
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
          {/* {dob} */}DOB goes here
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
              key={id}
              id={id}
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
