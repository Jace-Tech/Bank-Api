import mongoose from "mongoose"

const TransactionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "user"
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
  description: String,
  receiver: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "user"
  },
  token: {
    type: String,
    required: true,
  },
}, { timestamps: true })

export default mongoose.model("account", TransactionSchema)