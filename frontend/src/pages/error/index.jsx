import {
  useColorModeValue,
  Heading,
  Text,
  Flex,
  Button,
  Box,
} from "@chakra-ui/react";
import { Link as RouterLink, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <Box
      h={"100vh"}
      w={"full"}
      display={"flex"}
      justifyContent={"center"}
      color={useColorModeValue("whiteAlpha.500", "gray.800")}
    >
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading
          as={"h1"}
          size={"xl"}
          mt={4}
          color={useColorModeValue("gray.900", "whiteAlpha.900")}
        >
          Oops!
        </Heading>
        <Heading
          as={"h3"}
          size={"md"}
          mt={4}
          color={useColorModeValue("gray.900", "whiteAlpha.900")}
        >
          Sorry, an unexpected error has occured.
        </Heading>
        <Flex mt={6} justify={"center"} align={"center"} gap={3}>
          <Text fontSize={"sm"} fontWeight={"semibold"} color={"blue.600"}>
            {error.status}
          </Text>
          <Text
            fontSize={"sm"}
            fontStyle={"italic"}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            {error.statusText}
          </Text>
        </Flex>
        <Flex mt={10} justify={"center"} align={"center"} gap={6}>
          <Button
            as={RouterLink}
            to="/"
            variant={"solid"}
            colorScheme={"blue"}
            size={"sm"}
            py={5}
          >
            Go back home
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default ErrorPage;
