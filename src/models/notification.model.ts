import mongoose from "mongoose"

const NotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: String,
  isRead: {
    type: Boolean,
    default: true
  },
  from: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  }
}, { timestamps: true })

export default mongoose.model("notification", NotificationSchema)