import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    userId: String,
    email: String,
    picture: String,
    cart: []
})

const User = mongoose.model("user", userSchema)
export default User