import express from "express"
import { addUser, getUserById, removeCart, updateUser } from "../controller/user.js"

var router = express.Router()

router.get("/get-by-id/:id", getUserById)
router.post("/add", addUser)
router.put("/update/:id", updateUser)
router.post("/deleteCart/:id",removeCart)

export default router