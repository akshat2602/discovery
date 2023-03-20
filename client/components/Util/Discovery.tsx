import React from "react";
import { Text } from "@chakra-ui/react";

interface DiscoveryProps {
  fontSize?: number;
}

const Discovery: React.FC<DiscoveryProps> = ({ fontSize }) => {
  return (
    <Text
      fontFamily={"M Plus 2"}
      fontWeight={600}
      color="#FFFFFF"
      fontSize={fontSize ? fontSize : 16}
    >
      Discovery
    </Text>
  );
};

export default React.memo(Discovery);
