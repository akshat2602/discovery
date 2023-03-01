import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import NavBar from "../Navbar/NavBar";
import SideBar from "../Navbar/SideBar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  return (
    <Box>
      <Grid templateColumns={"repeat(24,1fr)"}>
        <GridItem colSpan={3}>
          <SideBar />
        </GridItem>
        <GridItem colSpan={21} mr="2%" ml="1%">
          <NavBar />
          {children}
        </GridItem>
      </Grid>
    </Box>
  );
};
