import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["busy","swappable","pending"],required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  swap_state: { type: Boolean, default: false },
}, { timestamps: true });


export const Event = mongoose.model("Event", eventSchema);
