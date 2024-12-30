import { Comment } from "../Models/comment.model.js";
import { RaiseComplaint } from "../Models/complaint.model.js";
import { User } from "../Models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.js";
import {
  delete_from_Cloudinary,
  upload_On_Cloudinary,
} from "../utils/Cloudinary.js";

const register_Complaint = AsyncHandeller(async (req, res) => {
  //get all the data from frontend
  //get user id from the req.userdata , inserted by verify jwt middlware
  //validation of to check whether fileds are filled or not will be checked in zod
  //validate that the user is not raising same complaints multiple time i.e avoid redundency

  const { Title, Description, Type } = req.body;
  const { _id } = req.userData;
  const imgPath = req.file?.path;
  let imgUrl = "";

  if (imgPath) {
    imgUrl = await upload_On_Cloudinary(imgPath);
  } else {
    imgUrl = undefined;
  }

  const redundentComplaint = await RaiseComplaint.findOne({
    Title,
    studentId: _id,
  });

  if (redundentComplaint) {
    return res.status(200).json({
      message: "You have already raised this complaint.",
    });
  }

  const createdComplain = await RaiseComplaint.create({
    studentId: _id,
    image: imgUrl,
    Title,
    Description,
    Type,
  });

  if (!createdComplain) {
    return res.status(200).json({
      message: "Something went Wrong While creating Complaint",
    });
  }

  const updatedUserDocument = await User.findByIdAndUpdate(
    _id,
    { $push: { complaints: createdComplain._id } },
    { new: true },
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        createdComplain,
        "Complain Registration Successfull",
      ),
    );
  // return res
  //   .status(200)
  //   .json(
  //     new ApiResponse(
  //       200,
  //       { createdComplain, updatedUserDocument },
  //       "Complain Registration Successfull",
  //     ),
  //   );
});

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
        { created_Comment, commentAddedInComplaintDoc },
        "comment added successfully",
      ),
    );
});

const edit_Complaint = AsyncHandeller(async (req, res) => {
  //fetched the data that to be updated
  //fetch complaint id whose data need to be updated
  //validate the values with the req update values i.e if data is same give error i.e already upto the date
  //if values are different , then update data
  //return the updated data

  const updatedData = req.body;
  const { complaintId } = req.params;
  const imgPath = req.file?.path;
  let imgUrl;

  const complaintData = await RaiseComplaint.findById(complaintId);

  if (!complaintData) {
    return res.status(400).json({
      message: "complaint to be updated not found",
    });
  }

  let fieldsToBeUpdated = {};

  for (let key in updatedData) {
    if (updatedData[key] !== complaintData[key]) {
      fieldsToBeUpdated[key] = updatedData[key];
    }
  }

  if (imgPath) {
    imgUrl = await upload_On_Cloudinary(imgPath);
    fieldsToBeUpdated["image"] = imgUrl;
    await delete_from_Cloudinary(complaintData.image); // delete the old image if there's a new one
  } else {
    imgUrl = complaintData.image;
  }

  if (Object.keys(fieldsToBeUpdated).length === 0) {
    return res.status(400).json({
      message: "No changes detected. Complaint is already up-to-date.",
    });
  }

  try {
    const updatedComplaintDocument = await RaiseComplaint.findByIdAndUpdate(
      complaintId,
      { $set: fieldsToBeUpdated },
      { new: true, runValidators: true },
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedComplaintDocument,
          "Complaint updated Successfully",
        ),
      );
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    } else {
      return res.status(400).json({
        message: "An unexpected error occured",
      });
    }
  }
});

const edit_Complaint_State = AsyncHandeller(async (req, res) => {
  // fetched the complaint id whose status is to be updated
  // fetched the updated value of state from body
  // find the complaint
  // update

  const { state } = req.body;
  const { complaintId } = req.params;

  try {
    const updatedComplaintStateDocument =
      await RaiseComplaint.findByIdAndUpdate(
        complaintId,
        { $set: { state } },
        { new: true, runValidators: true },
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedComplaintStateDocument,
          "state updated Successfully",
        ),
      );
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    } else {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
});

// used by student as well as warden to see the complaints for the specific user
const get_Complaints_By_Id_Type = AsyncHandeller(async (req, res) => {
  //get the state of complaint that need is been accessed
  //get id of student whose complaint need to be fetched
  //give the response

  const { _id } = req.userData;
  const { Type } = req.params;

  if (!["personal", "public"].includes(Type)) {
    return res.status(400).json({
      message: "Invalid Type value",
    });
  }

  const requested_Complaints = await RaiseComplaint.aggregate([
    {
      $match: {
        studentId: _id,
        Type,
      },
    },
    {
      $project: {
        comments: 0,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  if (requested_Complaints.length === 0) {
    return res.status(400).json({
      message: `No ${Type} complaints`,
    });
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        complaints: requested_Complaints,
        count: requested_Complaints.length,
      },
      `${Type} complaint fetched successfully`,
    ),
  );
});

// only used by warden to see all complaints depending on type
const get_Complaints_By_Type = AsyncHandeller(async (req, res) => {
  const { Type } = req.params;

  if (!["personal", "public"].includes(Type)) {
    return res.status(400).json({
      message: "Invalid Type value",
    });
  }

  const complaints_by_Type = await RaiseComplaint.find({
    Type,
  }).select("-comments");

  if (complaints_by_Type.length === 0) {
    return res.status(400).json({
      message: `No ${Type} complaints`,
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { complaints: complaints_by_Type, count: complaints_by_Type.length },
        "complaints fetched successfully",
      ),
    );
});

// this is used to fetch complaint on student dashboard
const get_Complaints_By_Id = AsyncHandeller(async (req, res) => {
  const { _id } = req.userData;

  const AllComplaints = await RaiseComplaint.find(
    { studentId: _id },
    { studentId: 0, updatedAt: 0, Type: 0, comments: 0 },
  ).sort({ createdAt: -1 });

  if (!AllComplaints || AllComplaints.length === 0) {
    return res.status(400).json({
      message: "Fetching complaint Failed",
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, AllComplaints, "Fetching Complaint Successfull"),
    );
});

const delete_complaint = AsyncHandeller(async (req, res) => {
  const { complaintId } = req.params;

  const deletedComplaint = await RaiseComplaint.findByIdAndDelete({
    _id: complaintId,
  });

  if (!deletedComplaint) {
    return res.status(400).json({
      message: "complaint do not exist",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedComplaint, "Delete Successfull"));
});

export {
  register_Complaint,
  insert_comment,
  edit_Complaint,
  edit_Complaint_State,
  get_Complaints_By_Id_Type,
  get_Complaints_By_Type,
  get_Complaints_By_Id,
  delete_complaint,
};
