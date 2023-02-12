import mongoose from "mongoose"

const LoanSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "user"
  },
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "account"
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "active", "due", "complete"],
    default: "pending",
  },
  interest: {
    type: Number,
  },
  endDate: {
    type: mongoose.SchemaTypes.Date
  }
}, { timestamps: true })

export default mongoose.model("loan", LoanSchema)