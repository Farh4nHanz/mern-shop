import e from "express";
import { productController } from "../controllers/productController.js";

const router = e.Router();

router
  .get("/", productController.getAllProducts)
  .get("/:slug", productController.getProductBySlug);

router.post("/", productController.addNewProduct);

router.put("/:id", productController.updateProductById);

router
  .delete("/", productController.deleteAllProducts)
  .delete("/:id", productController.deleteProductById);

export default router;
