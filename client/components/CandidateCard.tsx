import { Box, Text, Switch, Flex, IconButton } from "@chakra-ui/react";
import { BsLink } from "react-icons/bs";
import { useState } from "react";

interface candidateCardProps {
  name: String;
  email: String;
}

const CandidateCard: React.FC<candidateCardProps> = ({ name, email }) => {
  const [isChecked, setIsChecked] = useState(false);

  function handleChange() {
    setIsChecked(!isChecked);
  }
  return (
    <Box
      rounded={12}
      borderTop={"2px"}
      borderTopColor="primary.50"
      bgColor={"light.50"}
      my={2}
      width="100%"
      padding={2}
    >
      <Flex px={4} py={1} align="center" justify={"space-between"} gap={2}>
        <Flex direction={"column"} w="100%">
          <Text
            fontSize={16}
            fontWeight={"medium"}
            color={"white"}
            noOfLines={2}
            textOverflow={"ellipsis"}
            mb={1}
          >
            {name}
          </Text>
          <Text
            mb={1}
            fontSize={12}
            fontWeight={"light"}
            color={"white"}
            noOfLines={1}
            textOverflow={"ellipsis"}
          >
            {email}
          </Text>
        </Flex>
        <IconButton
          aria-label="icon-button"
          background="none"
          _hover={{ background: "whiteAlpha.100" }}
          icon={<BsLink size={28} />}
          color="primary.50"
          onClick={() => {}}
        />
        <Switch
          isChecked={isChecked}
          onChange={handleChange}
          size="sm"
          borderColor={"primary.50"}
        />
        <Text
          fontSize={13}
          fontWeight={"light"}
          color={isChecked ? "primary.50" : "white"}
        >
          {isChecked ? "Remove" : "Shortlist"}
        </Text>
      </Flex>
    </Box>
  );
};

export default CandidateCard;
