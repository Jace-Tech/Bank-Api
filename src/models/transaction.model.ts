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
  isCredit: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: null
  },
  receiver: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false
  },
  beneficiaryName: {
    type: String,
    default: null
  },
  date: {
    type: Date,
    default: Date.now()
  }
}, { timestamps: true })

export default mongoose.model("transaction", TransactionSchema)