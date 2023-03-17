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
      rounded={8}
      borderTop={"2px"}
      borderTopColor="primary.400"
      bgColor={"light.400"}
      my={2}
      width="100%"
      padding={2}
    >
      <Flex px={4} py={1} align="center" justify={"space-between"} gap={2}>
        <Flex direction={"column"} w="100%">
          <Text
            fontSize={16}
            fontWeight={"medium"}
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
          color="primary.400"
          onClick={() => {}}
        />
        <Switch
          isChecked={isChecked}
          onChange={handleChange}
          size="sm"
          borderColor={"primary.400"}
        />
        <Text
          fontSize={13}
          fontWeight={"light"}
          color={isChecked ? "primary.400" : "white"}
        >
          {isChecked ? "Remove" : "Shortlist"}
        </Text>
      </Flex>
    </Box>
  );
};

export default CandidateCard;
