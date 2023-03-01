import React from "react";
import { Text } from "@chakra-ui/react";
import Link from "next/link";

interface DiscoveryProps {
  isOpen?: boolean;
  fontSize?: number;
}

const Discovery: React.FC<DiscoveryProps> = ({ isOpen, fontSize }) => {
  return (
    <Link href="/">
      <Text
        fontFamily={"M Plus 2"}
        fontWeight={600}
        color="#FFFFFF"
        style={isOpen ? { display: "flex" } : { display: "none" }}
        fontSize={fontSize ? fontSize : 16}
      >
        Discovery
      </Text>
    </Link>
  );
};

export default React.memo(Discovery);
