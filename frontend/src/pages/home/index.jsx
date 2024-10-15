import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  SimpleGrid,
  Container,
  Spinner,
  Text,
  Center,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";

// components
import ProductItem from "@components/products/item";
import AlertDialog from "@components/alert";

// redux
import { fetchProducts, deleteAllProducts } from "@redux/slices/productSlice";

// custom hooks
import useShowAlert from "@hooks/useShowAlert";

function HomePage() {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  const memoizedProducts = useMemo(() => {
    return products.map((product) => ({
      ...product,
      formattedPrice: product.price.toLocaleString("us-EN", {
        styles: "currency",
        currency: "USD",
      }),
    }));
  }, [products]);

  useShowAlert(); // to show an alert

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const cancelRef = useRef(null);
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const deleteAll = () => {
    dispatch(deleteAllProducts());
    onAlertClose();
  };

  return (
    <Container maxW={"container.xl"} mt={5}>
      {status === "loading" && (
        <Center>
          <Spinner color="blue.300" size={"xl"} />
        </Center>
      )}

      {status !== "loading" && products.length < 1 && (
        <Text textAlign={"center"} fontSize={"md"} color={"gray.400"}>
          No products available.{" "}
          <Link to={"/products/add"}>
            <span className="text-blue-500">Add one</span>
          </Link>
        </Text>
      )}

      {products.length > 0 && (
        <Flex w={"full"} justifyContent={"end"} alignItems={"center"} mb={5}>
          <Button variant={"outline"} colorScheme="red" onClick={onAlertOpen}>
            Delete All Products
          </Button>

          <AlertDialog
            ref={cancelRef}
            header="Delete all products?"
            text="Are you sure wan't to delete all products? It will deleted permanently."
            isOpen={isAlertOpen}
            onClose={onAlertClose}
            onClick={deleteAll}
          />
        </Flex>
      )}

      {memoizedProducts.length > 0 && (
        <SimpleGrid
          spacing={5}
          templateColumns={"repeat(auto-fill, minmax(250px, 1fr))"}
          p={5}
        >
          <ProductItem products={memoizedProducts} />
        </SimpleGrid>
      )}
    </Container>
  );
}

export default HomePage;
