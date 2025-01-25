import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.js";
import { User } from "../Models/user.model.js";
import {
  delete_from_Cloudinary,
  upload_On_Cloudinary,
} from "../utils/Cloudinary.js";

const register_User = AsyncHandeller(async (req, res) => {
  let {
    fullName,
    branchName,
    currentYear,
    email,
    password,
    gender,
    phone,
    role,
    hobbies,
    roomNumber,
  } = req.body;

  if (hobbies && typeof hobbies === "string") {
    // hobbies = JSON.parse(hobbies) this is working when we are using postman , but from forntend the data is pure string and not as array of string so, below one is used
    hobbies = hobbies.split(",").map((data) => data.toLowerCase());
  }

  const existedUser = await User.findOne({
    $or: [{ fullName }, { email }, { phone }],
  });

  if (existedUser) {
    let message = "";
    if (existedUser.fullName === fullName)
      message = `${fullName} already exist`;
    if (existedUser.email === email) message = `${email} already exist`;
    if (existedUser.phone === phone) message = `${phone} contact already exist`;

    return res.status(400).json({
      message,
    });
  }

  if (role === "warden") {
    const count = await User.countDocuments({ role: "warden" });
    if (count >= 2) {
      return res.status(400).json({
        message: "warden already exist ! Registration rejected",
      });
    }
  }

  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    return res.status(400).json({
      message: "The avatarLocalPath is not defined",
    });
  }

  const avatar = await upload_On_Cloudinary(avatarLocalPath);

  if (!avatar) {
    return res.status(400).json({
      message: "url not fetched from cloudinary",
    });
  }

  const user = await User.create({
    fullName,
    email,
    password,
    gender,
    phone,
    role,
    avatar,
    branchName,
    roomNumber,
    currentYear,
    hobbies,
  });

  if (!user) {
    return res.status(500).json({
      message: "error occured while creating a user",
    });
  }
  const createdUser = await User.findById(user._id).select("-password");
  const AccessToken = createdUser.generateAccessToken();
  const role_Value = createdUser.role;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { AccessToken, role_Value },
        "Registration succesfull",
      ),
    );
});

const login_User = AsyncHandeller(async (req, res) => {
  //get the user data
  //validate data and check the password
  //find the user in database
  //generate the JWT  token and send it as response

  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "email and password fields are requried for login",
    });
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const password_Status = await user.isPasswordCorrect(password);

  if (!password_Status) {
    return res.status(400).json({
      message: "Login password not matched",
    });
  }
  const role_Value = user.role;
  const AccessToken = await user.generateAccessToken();

  if (!AccessToken) {
    return res.status(400).json({
      message: "Access Token not generated",
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { AccessToken, role_Value },
        "User Login Successfull",
      ),
    );
});

const getLogedInUserData = AsyncHandeller(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.userData, "user data fetched successfully"));
});

const getMatchedProfileStudents = AsyncHandeller(async (req, res) => {
  const { _id } = req.userData;

  const user = await User.findById(_id);

  if (!user?.hobbies?.length === 0) {
    return res.status(404).json({
      message: "User has not entered hobbies",
    });
  }

  const MatchedPairs = await User.find({
    _id: { $ne: _id },
    hobbies: { $in: user.hobbies },
  }).select("fullName roomNumber branchName currentYear avatar");

  if (MatchedPairs.length === 0) {
    return res.status(400).json({
      message:
        "No Match found, try to update or add some other hobbies to get the matched partner",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, MatchedPairs, "Pairs Matching Successful"));
});

const UpdateUserProfile = AsyncHandeller(async (req, res, next) => {
  // Note: to update the image create another API separately, that is a professional approach

  const { _id } = req.userData;
  const dataTobeUpdated = req.body;

  // Validate empty fields
  if (dataTobeUpdated) {
    const emptyFiled = Object.entries(dataTobeUpdated).filter(
      ([key, value]) => {
        if (Array.isArray(value) && value[0]?.length === 0) return true;
        else if (value === "" || value === null || value === undefined)
          return true;
        else return false;
      },
    );

    if (emptyFiled.length > 0) {
      const filedNames = emptyFiled.map(([key, value]) => key);
      return next({
        message: `${filedNames.join(", ")} is empty`,
      });
    }
  }

  const currentData = await User.findById(_id);

  if (!currentData) {
    return next({
      status: 400,
      message: "Unexpected error occurred",
    });
  }

  let updatedFields = {};

  for (const key in dataTobeUpdated) {
    if (Array.isArray(dataTobeUpdated[key])) {
      if (
        JSON.stringify(dataTobeUpdated[key].sort()) ===
        JSON.stringify(currentData[key].sort())
      ) {
        continue;
      }
    }

    if (dataTobeUpdated[key] !== currentData[key]) {
      updatedFields[key] = dataTobeUpdated[key];
    }
  }

  if (Object.keys(updatedFields).length === 0) {
    return next({
      status: 400,
      message: "No profile change detected",
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { $set: updatedFields },
    { new: true, runValidators: true },
  );

  if (Object.keys(updatedUser).length === 0) {
    return next({
      message: "Data updation failed",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Data updation successful"));
});

const updateUserProfileImage = AsyncHandeller(async (req, res, next) => {
  const { _id } = req.userData;
  const avatarPath = req.file?.path;

  const user = await User.findById(_id).select("avatar");

  if (!avatarPath) {
    return next({
      message: "avatarPath not found",
    });
  }

  const avatarUrl = await upload_On_Cloudinary(avatarPath);

  if (!avatarUrl) {
    return next({
      message: "avatarUrl not found",
    });
  }

  await delete_from_Cloudinary(user.avatar);

  const updatedUserImage = await User.findByIdAndUpdate(
    _id,
    { $set: { avatar: avatarUrl } },
    { new: true },
  ).select("avatar");

  if (!updatedUserImage) {
    return next({
      message: "Image Updation failed",
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedUserImage,
        "Profile image updation successful",
      ),
    );
});

export {
  register_User,
  login_User,
  getLogedInUserData,
  getMatchedProfileStudents,
  UpdateUserProfile,
  updateUserProfileImage,
};
