import mongoose from "mongoose"

const TransactionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "account"
  },
  type: {
    type: String,
    required: true,
    enum: ['deposit', 'withdraw', 'transfer']
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "declined"],
    default: "pending"
  },
  description: String,
  receiver: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
}, { timestamps: true })

export default mongoose.model("transaction", TransactionSchema)