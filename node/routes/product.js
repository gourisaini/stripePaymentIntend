import express from "express"
import { addProduct, getProduct } from "../controller/product.js";

var ProductRoute = express.Router();

ProductRoute.get("/get", getProduct);
ProductRoute.post("/add", addProduct)

export default ProductRoute