import mongoose from "mongoose";
import { Comment } from "../Models/comment.model.js";
import { RaiseComplaint } from "../Models/complaint.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.js";

const insert_comment = AsyncHandeller(async (req, res) => {
  //fetch the comment msg from request body
  //get the user(commenter) who had commented on msg
  //get the id of complaint for which thsi comment is given
  //store it in comment database
  //get this comment and store its id in complaint comments array

  const { text } = req.body;
  const { _id } = req.userData;
  const { complaintId } = req.params;

  const created_Comment = await Comment.create({
    commenter: _id,
    complaintId,
    text,
  });

  if (!created_Comment) {
    return res.status(200).json({
      message: "Something went wrong while creating comment",
    });
  }

  const commentAddedInComplaintDoc = await RaiseComplaint.findOneAndUpdate(
    { _id: complaintId },
    { $push: { comments: created_Comment._id } },
    { new: true },
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        created_Comment,
        "comment added successfully",
      ),
    );
});

const get_comments = AsyncHandeller(async (req, res) => {
  const { complaintId } = req.params;
 
  const Comments = await Comment.aggregate([
    {
      $match: {
        complaintId: new mongoose.Types.ObjectId(complaintId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "commenter",
        foreignField: "_id",
        as: "commenter",
        pipeline: [
          {
            $project: {
              role: 1,
            },
          },
        ],
      },
    },

    {
      $addFields: {
        commenter: {
          $first: "$commenter",
        },
      },
    },

    {
      $sort:{
        createdAt:1
      }
    }
  ]);

  if (Comments.length === 0) {
    return res.status(400).json({
      message: "No comments Available",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, Comments, "comments Fetched Successfully"));
});

export { insert_comment, get_comments };
