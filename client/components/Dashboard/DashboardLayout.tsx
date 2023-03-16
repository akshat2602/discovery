import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { useState } from "react";

import NavBar from "../Navbar/NavBar";
import SideBar from "../Navbar/SideBar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const [isblur, setblur] = useState<Boolean>(false);

  return (
    <Box>
      <Grid templateColumns={"repeat(24,1fr)"}>
        <GridItem colSpan={1}>
          <Box
            onMouseEnter={() => setblur(true)}
            onMouseLeave={() => setblur(false)}
          >
            <SideBar />
          </Box>
        </GridItem>
        <GridItem colSpan={23} mr="2%" ml="1%">
          <Box style={isblur ? { opacity: 0.3 } : { opacity: 1 }}>
            <NavBar />
            {children}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};
