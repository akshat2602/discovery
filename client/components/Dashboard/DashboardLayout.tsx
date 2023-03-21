import { Box, Grid, GridItem, Flex, Text } from "@chakra-ui/react";

import React, { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { userInterface } from "../../store/userStore";
import { useGetUser, useRefreshAccessToken } from "../../api/userAPI";
import { useBearStore } from "../../store/bearStore";
import NavBar from "../Navbar/NavBar";
import SideBar from "../Navbar/SideBar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const [isblur, setblur] = useState<Boolean>(false);
  const [showScreen, setShowScreen] = useState<Boolean>(false);
  const setUserInfo = useBearStore((state) => state.setUserInfo);
  const result = useGetUser();
  const router = useRouter();
  const accessTokenMutation = useRefreshAccessToken();

  useEffect(() => {
    if (!result.isLoading && result.isSuccess) {
      setShowScreen(true);
      const userResponse: userResponseInterface = result.data.data;
      const userData: userInterface = {
        id: userResponse.pk,
        email: userResponse.email,
        firstName: userResponse.first_name,
        lastName: userResponse.last_name,
        username: userResponse.username,
        role: userResponse.role,
      };
      setUserInfo(userData);
    } else if (
      !result.isLoading &&
      result.isError &&
      !accessTokenMutation.isLoading &&
      !accessTokenMutation.isSuccess &&
      !accessTokenMutation.isError
    ) {
      accessTokenMutation.mutate();
    }
    if (accessTokenMutation.isSuccess) {
      setShowScreen(true);
    } else if (accessTokenMutation.isError) {
      router.push("/login");
    }
  }, [
    router,
    result.isSuccess,
    result.isError,
    result.isLoading,
    setUserInfo,
    result.data?.data,
    accessTokenMutation,
  ]);

  return (
    <>
      {!showScreen && (
        <Flex align="center" justify="center" h="100vh">
          <Text fontSize={24}>Loading...</Text>
        </Flex>
      )}
      {showScreen && (
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
      )}
    </>
  );
};
