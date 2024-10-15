import { Link } from "react-router-dom";
import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";

// icons
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";
import { IoIosMoon } from "react-icons/io";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-l, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>MERN Shop</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/products/add"}>
            <Button>
              <FaRegSquarePlus size={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? (
              <IoIosMoon size={20} />
            ) : (
              <IoSunny size={20} />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar;
