import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
  channelId: { type: Schema.Types.ObjectId, ref: "Channel", required: true },
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  model: { type: String }, // optional: which AI model generated this
  createdAt: { type: Date, default: Date.now },
  promptIndex: { type: Number, required: true },
});

export default mongoose.model("Message", messageSchema);
