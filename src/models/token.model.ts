import mongoose from "mongoose"

const TokenSchema = new mongoose.Schema({
  transaction: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "transaction"
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "user"
  },
  token: {
    type: String,
    required: true,
  },
}, { timestamps: true })

export default mongoose.model("token", TokenSchema)