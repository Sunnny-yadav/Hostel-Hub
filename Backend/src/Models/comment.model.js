import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    commenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    complaintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RaiseComplaint",
    },

    text: {
      type: String,
      trim: true,
      required: true
    },
  },
  { timestamps: true },
);

export const Comment = mongoose.model("Comment",commentSchema);