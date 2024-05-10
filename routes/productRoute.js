import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePayementController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getAllProductController,
  getPhotoController,
  getProductController,
  getProductTotalCountController,
  getRelatedProductController,
  getfilterProductController,
  
  productCategoryController,
  productListController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();
//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//update product
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
router.get("/get-products", getAllProductController);
router.get("/get-product/:slug", getProductController);
router.get("/get-photo/:id", getPhotoController);

//delete product
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);
// router.get("/get-product", getProductController);
//filter product
router.post("/product-filters", getfilterProductController);
router.get("/total-count", getProductTotalCountController);

router.get("/product-list/:page", productListController);
router.get("/product-search/:keyword", searchProductController);

router.get("/related-product/:pid/:cid", getRelatedProductController);

router.get("/categorywise-product/:slug", productCategoryController);

router.get("/braintree/token", braintreeTokenController);
router.post("/braintree/payment", requireSignIn, braintreePayementController);

// router.post("/payment", requireSignIn, placeOrder);

export default router;
