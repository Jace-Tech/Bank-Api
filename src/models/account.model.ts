import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
    IBAN: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0.0,
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    routingNumber: {
      type: Number,
    },
    accountName: {
      type: String,
    },
    accountType: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("account", AccountSchema);
