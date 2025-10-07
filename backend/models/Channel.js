// models/Channel.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const channelSchema = new Schema({
  userId: { type: String, required: true },   // link to the user who owns it
  createdAt: { type: Date, default: Date.now },
  lastUsed: { type: Date, default: Date.now },
});

export default mongoose.model("Channel", channelSchema);