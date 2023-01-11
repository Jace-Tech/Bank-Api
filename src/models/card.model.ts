import mongoose from "mongoose"

const CardSchema = new mongoose.Schema({
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "account"
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "user"
  },
  cardType: {
    type: String,
    enum: ['credit', 'debit'],
    default: 'debit',
  },
  cvv: {
    type: Number,
    required: [true, "cvv is required"],
  },
  routingNumber: {
    type: Number,
  },
  expiryDate: {
    type: mongoose.SchemaTypes.Date,
    required: [true, "expiry date is required"],
  }
}, { timestamps: true })

export default mongoose.model("card", CardSchema)