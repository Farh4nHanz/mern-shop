import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Container,
  VStack,
  Box,
  Heading,
  Input,
  Button,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";

// components
import Form from "@components/form";

// slices
import { addProduct } from "@redux/slices/productSlice";

// custom hooks
import useShowAlert from "@hooks/useShowAlert";

function AddProductPage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const nameRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((n) => ({
      ...n,
      [name]: value,
    }));
  };

  useShowAlert(); // to show an alert

  const dispatch = useDispatch();

  const addNewProduct = (e) => {
    e.preventDefault();

    dispatch(addProduct(newProduct)); // add product using redux

    // clear form data after submit
    setNewProduct({ name: "", price: "", description: "", image: "" });
    nameRef.current = nameRef.current.focus();
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Add Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("whiteAlpha.100", "gray.700")}
          p={8}
          rounded={"lg"}
          shadow={"md"}
        >
          <Form onSubmit={addNewProduct}>
            <VStack spacing={4}>
              <Input
                ref={nameRef}
                type="text"
                name="name"
                placeholder="Name"
                value={newProduct.name}
                onChange={handleInputChange}
                autoFocus
                autoComplete="off"
                required
              ></Input>
              <Input
                type="number"
                step="0.01"
                name="price"
                placeholder="Price"
                value={newProduct.price}
                onChange={handleInputChange}
                autoComplete="off"
                required
              ></Input>
              <Textarea
                name="description"
                placeholder="Description"
                value={newProduct.description}
                onChange={handleInputChange}
                maxLength={"1000"}
                autoComplete="off"
                required
              ></Textarea>
              <Input
                type="text"
                name="image"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={handleInputChange}
                autoComplete="off"
                required
              ></Input>

              <Button colorScheme="blue" w={"full"} type="submit">
                Add Product
              </Button>
            </VStack>
          </Form>
        </Box>
      </VStack>
    </Container>
  );
}

export default AddProductPage;
