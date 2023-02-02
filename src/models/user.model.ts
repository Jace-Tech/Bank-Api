import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    default: null
  },
  dob: {
    type: mongoose.SchemaTypes.Date,
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  gender: {
    type: String,
    default: null
  },
  imageUrl: {
    type: String,
    default: null
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"]
  },
}, { timestamps: true })

export default mongoose.model("user", UserSchema)