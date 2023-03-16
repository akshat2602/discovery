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
import Link from "next/link";

const NavBar: React.FC = () => {
  const router = useRouter();

  const renderBreadCrumb = () => {
    let temp: Array<JSX.Element> = [];
    let route: Array<String> = [];
    router.pathname.split("/").map((el) => {
      if (el === "dashboard" && router.pathname === "/dashboard") {
        route.push(el);
        temp.push(
          <BreadcrumbItem key="dashboard" isCurrentPage>
            {" "}
            <BreadcrumbLink href={`/dashboard`}>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        );
      } else if (el !== "dashboard" && el !== "[id]" && el !== "") {
        route.push(el);
        temp.push(
          <BreadcrumbItem key={el}>
            <BreadcrumbLink as={Link} href={route.join("/")}>
              {el.toUpperCase()[0] + el.slice(1)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      } else if (el === "[id]") {
        route.push(router.query.id as string);
        temp.push(
          <BreadcrumbItem key={el}>
            <BreadcrumbLink as={Link} href={route.join("/")}>
              {router.query.id}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      } else {
        route.push(el);
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
    <Box mt="2%" marginX={5} zIndex={10}>
      <HStack>
        {renderBreadCrumb()}
        <Spacer />
      </HStack>
    </Box>
  );
};

export default NavBar;
