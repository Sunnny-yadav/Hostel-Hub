import mongoose from "mongoose";

const raise_complaintSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  Title: {
    type: String,
    trim: true,
    required: true,
  },

  Description: {
    type: String,
    trim: true,
    required: true,
  },

  image: {
    type: String, //going to come from cloudinary
  },

  Type: {
    type: String,
    enum: {
      values: ["personal", "public"],
      message:
        "{VALUE} is not valid type! choose either 'personal' or 'public' ",
    },
    required: true,
  },

  state: {
    type: String,
    enum: {
      values: ["Pending","Inprogress", "Resolved"],
      message:
        "{VALUE} is not valid status. it should be among 'Inprogress' and 'Resolved'",
    },
    default:"Pending"
  },

  
  // the comments field store all the conversation comment ids between user who had raised the complaint and between warden
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],

},{
  timestamps:true
});

export const RaiseComplaint = mongoose.model(
  "RaiseComplaint",
  raise_complaintSchema,
);
