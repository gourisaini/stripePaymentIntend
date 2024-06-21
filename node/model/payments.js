import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
    amount: Number,
    email: String,
    user: String
});


const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction