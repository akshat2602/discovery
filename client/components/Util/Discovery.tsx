import { Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface DiscoveryProps {
  fontSize?: number;
}

const Discovery: React.FC<DiscoveryProps> = ({ fontSize }) => {
  const color = useColorModeValue("black", "white");
  return (
    <Text
      fontFamily={"M Plus 2"}
      fontWeight={600}
      color={color}
      fontSize={fontSize ? fontSize : 16}
    >
      Discovery
    </Text>
  );
};

export default React.memo(Discovery);
