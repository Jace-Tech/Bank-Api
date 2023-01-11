import mongoose from "mongoose"

const AccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "user"
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0.00
  },
  routingNumber: {
    type: Number,
  },
  accountName: {
    type: String,
  },
  accountType: {
    type: String,
    default: "savings",
    enum: ['savings', 'current']
  },
  pin: {
    type: String,
    default: null
  },
}, { timestamps: true })

export default mongoose.model("account", AccountSchema)