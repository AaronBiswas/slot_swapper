import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      required: true,
    },
  },
  { timestamps: true }
);

export const SwapSlot = mongoose.model("SwapSlot", slotSchema);