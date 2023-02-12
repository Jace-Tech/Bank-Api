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
    enum: ['deposit', 'withdraw', 'transfer', 'wire']
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
  bank: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  receiver: {
    type: String,
    required: true,
  },
  beneficiaryName: {
    type: String,
    default: null
  },
}, { timestamps: true })

export default mongoose.model("transaction", TransactionSchema)