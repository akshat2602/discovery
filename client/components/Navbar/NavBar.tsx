import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const NavBar: React.FC = () => {
  const router = useRouter();

  const renderBreadCrumb = () => {
    let temp: Array<JSX.Element> = [];
    router.pathname.split("/").map((el) => {
      if (el === "dashboard" && router.pathname === "/dashboard") {
        temp.push(
          <BreadcrumbItem key="dashboard" isCurrentPage>
            {" "}
            <BreadcrumbLink href={`/dashboard`}>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        );
      } else if (el !== "dashboard" && el !== "[id]" && el !== "") {
        temp.push(
          <BreadcrumbItem key={el}>
            <BreadcrumbLink>{el.toUpperCase()[0] + el.slice(1)}</BreadcrumbLink>
          </BreadcrumbItem>
        );
      } else if (el === "[id]") {
        temp.push(
          <BreadcrumbItem key={el}>
            <BreadcrumbLink>{router.query.id}</BreadcrumbLink>
          </BreadcrumbItem>
        );
      }
    });
    return (
      <Breadcrumb
        zIndex={10}
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        {temp}
      </Breadcrumb>
    );
  };

  return (
    <Box mt="2%" marginX={12} zIndex={10} px="0.5%">
      <HStack>
        {renderBreadCrumb()}
        <Spacer />
      </HStack>
    </Box>
  );
};

export default NavBar;
