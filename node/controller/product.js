import ProductList from "../model/productList.js"

export const addProduct = async (req, res) => {
    try {
        const product = await ProductList.create(req.body.data)
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getProduct = async (req, res) => {

    try {
        const product = await ProductList.find();
        return res.status(200).json(product)

    } catch (error) {
        return res.status(500).json(error)
    }
}