import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import {
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  Container,
} from "@chakra-ui/react";

// icons
import { FaArrowLeft } from "react-icons/fa";

function DetailProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");

  const API_URL =
    import.meta.env.VITE_NODE_ENV === "development"
      ? import.meta.env.VITE_API_URL_DEV
      : import.meta.env.VITE_API_URL_PROD;

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchProductBySlug = async () => {
      try {
        const res = await axios.get(`${API_URL}/products/${slug}`, {
          cancelToken: source.token,
        });
        setProduct(res.data.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Fetch cancelled", err.message);
        } else {
          setError(err.response?.data?.message || err.message);
        }
      }
    };

    fetchProductBySlug();

    return () => {
      source.cancel("Operation cancelled by the user");
    };
  }, [API_URL, slug]);

  return (
    <Container maxW={"container.xl"} mt={10}>
      <Link to={"/"}>
        <Button
          variant={"outline"}
          colorScheme="blue"
          leftIcon={<FaArrowLeft />}
          mb={10}
        >
          Back
        </Button>
      </Link>

      {error && (
        <Text textAlign={"center"} fontSize={"md"} color={"red.500"}>
          {error}
        </Text>
      )}

      {!error && product && (
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          maxW={"container.md"}
          m={"auto"}
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
          <Stack>
            <CardBody>
              <Heading size="md">{product.name}</Heading>
              <Text py="2">{product.description}</Text>
            </CardBody>
          </Stack>
        </Card>
      )}
    </Container>
  );
}

export default DetailProductPage;
