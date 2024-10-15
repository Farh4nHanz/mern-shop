import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  ButtonGroup,
  Button,
  Input,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

// components
import Card from "@components/card";
import Form from "@components/form";
import Modal from "@components/modal";
import AlertDialog from "@components/alert";

// redux
import {
  deleteProductById,
  updateProductById,
} from "@redux/slices/productSlice";

const ProductItem = React.memo(({ products }) => {
  const dispatch = useDispatch();
  const cancelRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setSelectedProduct((s) => ({ ...s, [name]: value }));
  }, []);

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const openEditModal = (product) => {
    setSelectedProduct(product);
    onModalOpen();
  };

  const updateProduct = (e) => {
    e.preventDefault();

    if (selectedProduct) {
      dispatch(
        updateProductById({
          id: selectedProduct.id,
          updatedProduct: selectedProduct,
        })
      );
      onModalClose();
    }
  };

  const deleteProduct = (id) => {
    if (selectedProduct) {
      dispatch(deleteProductById(id));
      onAlertClose();
    }
  };

  return products.map((product) => (
    <Card key={product.id}>
      <Card.Body
        imageSrc={product.image}
        title={product.name}
        subtitle={`$${product.formattedPrice}`}
        text={`${product.description.substring(0, 100)}...`}
      />
      <Card.Footer>
        <ButtonGroup w={"full"}>
          <Link to={`/products/detail/${product.id}`} className="me-auto">
            <Button variant={"solid"} colorScheme="cyan">
              Detail
            </Button>
          </Link>
          <Button
            variant={"outline"}
            colorScheme="yellow"
            onClick={() => openEditModal(product)}
          >
            Edit
          </Button>
          <Button variant={"outline"} colorScheme="red" onClick={onAlertOpen}>
            Delete
          </Button>
        </ButtonGroup>
      </Card.Footer>

      {/* alert for delete product */}
      <AlertDialog
        ref={cancelRef}
        header="Delete this product?"
        text="Are you sure wan't to delete this product? It will deleted permanently."
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onClick={() => deleteProduct(product.id)}
      />

      {/* modal for update product */}
      <Modal
        header="Update Product"
        isOpen={isModalOpen}
        onClose={onModalClose}
      >
        <Form onSubmit={updateProduct}>
          <VStack spacing={4}>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={selectedProduct.name}
              onChange={handleInputChange}
              autoComplete="off"
              required
            ></Input>
            <Input
              type="number"
              step="0.01"
              name="price"
              placeholder="Price"
              value={selectedProduct.price}
              onChange={handleInputChange}
              autoComplete="off"
              required
            ></Input>
            <Textarea
              name="description"
              placeholder="Description"
              value={selectedProduct.description}
              onChange={handleInputChange}
              maxLength={"1000"}
              autoComplete="off"
              required
            ></Textarea>
            <Input
              type="text"
              name="image"
              placeholder="Image URL"
              value={selectedProduct.image}
              onChange={handleInputChange}
              autoComplete="off"
              required
            ></Input>

            <ButtonGroup ms={"auto"} mb={3}>
              <Button colorScheme="red" onClick={onModalClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="blue">
                Update
              </Button>
            </ButtonGroup>
          </VStack>
        </Form>
      </Modal>
    </Card>
  ));
});

ProductItem.propTypes = {
  products: PropTypes.array,
};

ProductItem.displayName = "Product Item";

export default ProductItem;
