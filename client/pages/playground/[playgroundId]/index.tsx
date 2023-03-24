import { Box } from "@chakra-ui/react";

import dynamic from "next/dynamic";

const ShellComponent = dynamic(
  () =>
    import("../../../components/Editor/ShellComponent").then(
      (mod) => mod.ShellComponent
    ),
  {
    ssr: false,
  }
);

const Playground: React.FC = () => {
  return (
    <Box style={{ display: "flex" }}>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#282a36",
          width: "65%",
        }}
      >
        <ShellComponent />
      </Box>
    </Box>
  );
};

export default Playground;
