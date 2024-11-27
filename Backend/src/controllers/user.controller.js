import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.js";
import { User } from "../Models/user.model.js";
import { upload_On_Cloudinary } from "../utils/Cloudinary.js";

const register_User = AsyncHandeller(async (req, res) => {
  //data fetching form frontend
  //validate the data
  //check whether user already exist
  //check for images in local server
  //get the url formtt the cloudinary
  //create a final object
  //create and send the final response to user

  const { fullName, branchName, currentYear, email, password } = req.body;

  if (
    [fullName, branchName, currentYear, email, password].some(
      (value) => value === "",
    )
  ) {
    return res.status(400).json({
      msg: "validation error ! all fileds are required",
    });
  }

  const existedUser = await User.findOne({
    $or: [{ fullName }, { email }],
  });

  if (existedUser) {
    return res.status(400).json({
      Error: "The user already exist",
    });
  }

  const avatarLocalPath = req.file?.path;
  console.log(avatarLocalPath);
  if (!avatarLocalPath) {
    return res.status(400).json({
      Error: "The avatarLocalPath is not defined",
    });
  }

  const avatar = await upload_On_Cloudinary(avatarLocalPath);

  if (!avatar) {
    return res.status(400).json({
      Error: "url not fetched from cloudinary",
    });
  }

  const user = await User.create({
    fullName,
    branchName,
    currentYear,
    password,
    avatar,
    email,
  });

  const createdUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "Registration succesfull"));
});

const login_User = AsyncHandeller(async (req, res) => {
  //get the user data
  //validate data and check the password
  //find the user in database
  //generate the JWT  token and send it as response

  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      Error: "email and password fields are requried for login",
    });
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      Error: "User not found",
    });
  }

  const password_Status = await user.isPasswordCorrect(password);

  if (!password_Status) {
    return res.status(400).json({
      Error: "Login password not matched",
    });
  }

  const token = await user.generateAccessToken();

  if (!token) {
    return res.status(400).json({
      Error: "Access Token not generated",
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { AccessToken: token }, "User Login Successfull"),
    );
});

export { register_User, login_User };
