import mongoose from "mongoose";
import { RaiseComplaint } from "../Models/complaint.model.js";
import { User } from "../Models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.js";
import {
  delete_from_Cloudinary,
  upload_On_Cloudinary,
} from "../utils/Cloudinary.js";

// NOTE: Below functions are designed for Student
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

// child-note: this complaint are shown on student dashboard
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

// Todo: remove the complaints from user Comment Array along with delete operaion
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

// NOTE: Below functions are designed for warden:
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

const get_All_Users = AsyncHandeller(async (req, res) => {

  const {gender} = req.userData

  const AllFetchedUsers = await User.find(
    { gender: `${gender}`, role: "student" },
    { complaints: 0, password: 0, gender: 0, role: 0, hobbies: 0 },
  );

  if (!AllFetchedUsers) {
    return res.status(400).json({
      message: "Users not available",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, AllFetchedUsers, "Fetch user Succesfull"));
});

// child-note: to see  complaints of all students depending on type
const get_Complaints_By_Type = AsyncHandeller(async (req, res) => {
  const { Type } = req.params;

  if (!["personal", "public"].includes(Type)) {
    return res.status(400).json({
      message: "Invalid Type value",
    });
  }

  const complaints_by_Type = await RaiseComplaint.aggregate([
    {
      $match:{
        Type
      }
    },
    {
      $lookup:{
        from: "users",
        localField: "studentId",
        foreignField:"_id",
        as:"studentData",
        pipeline:[
          {
            $project:{
              fullName:1,
              roomNumber:1,
              phone:1
            }
          }
        ]
      }
    },
    {
      $addFields:{
        studentData:{
          $first:"$studentData"
        }
      }
    },
    {
      $project:{
        comments:0
      }
    },
    {
      $sort:{
        createdAt:-1
      }
    }
  ]);

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
        complaints_by_Type,
        "complaints fetched successfully",
      ),
    );
});

// NOTE: common for both:
const get_Complaints_By_Id_Type = AsyncHandeller(async (req, res) => {
  //get the state of complaint that need is been accessed
  //get id of student whose complaint need to be fetched
  //give the response

  const { role } = req.userData;
  let studentId;

  if (role === "student") {
    studentId = req.userData._id;
  } else {
    studentId = req.params._id;
    console.log(studentId);
  }

  const { Type } = req.params;

  if (!["personal", "public"].includes(Type)) {
    return res.status(400).json({
      message: "Invalid Type value",
    });
  }

  const requested_Complaints = await RaiseComplaint.aggregate([
    {
      $match: {
        studentId: new mongoose.Types.ObjectId(studentId),
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

export {
  register_Complaint,
  edit_Complaint,
  edit_Complaint_State,
  get_Complaints_By_Id_Type,
  get_Complaints_By_Type,
  get_Complaints_By_Id,
  delete_complaint,
  get_All_Users,
};
