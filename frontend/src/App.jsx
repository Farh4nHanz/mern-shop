import { Outlet } from "react-router-dom";

import { Box, useColorModeValue } from "@chakra-ui/react";

// components
import Navbar from "@components/navbar";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("whiteAlpha.900", "gray.900")}>
      <Navbar />
      <Outlet />
    </Box>
  );
}

export default App;
