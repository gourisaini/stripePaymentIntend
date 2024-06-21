import mongoose from "mongoose"

const productList = new mongoose.Schema({
    title: String,
    description: String,
    price: Number
})

const ProductList = mongoose.model("product", productList);
export default ProductList