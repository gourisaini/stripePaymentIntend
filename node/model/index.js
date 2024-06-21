import mongoose from "mongoose";

mongoose.set('strictQuery', false);

mongoose
    .connect(process.env.MONGODB)
    .then(() => { console.log("connected to mongoDB") })
    .catch((error) => { console.log(error.message) })