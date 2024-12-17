import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.js";
import { User } from "../Models/user.model.js";
import { upload_On_Cloudinary } from "../utils/Cloudinary.js";

const register_User = AsyncHandeller(async (req, res) => {

  let { fullName, branchName, currentYear, email, password, gender, phone, role, hobbies,roomNumber } = req.body;
  
  if (typeof hobbies === 'string') {
    hobbies = hobbies.split(",")
  }
  
  const existedUser = await User.findOne({
    $or: [{ fullName }, { email }, { phone }],
  });

  if (existedUser) {
    return res.status(400).json({
      Error: "The user already exist ! choose another name, email or phone",
    });
  }

  if (role === "warden") {
    const count = await User.countDocuments({ role: "warden" });
    if (count >= 2) {
      return res.status(400).json({
        Error: "warden already exist ! no other can be registered"
      })
    }
  }



  const avatarLocalPath = req.file?.path;

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
    email,
    password,
    gender,
    phone,
    role,
    avatar,
    branchName,
    roomNumber,
    currentYear,
    hobbies
  });


  if (!user) {
    return res.status(500).json({
      Error: "error occured while creating a user",
    });
  } 
  const createdUser = await User.findById(user._id).select("-password");
  const AccessToken = createdUser.generateAccessToken()

  return res
    .status(200)
    .json(new ApiResponse(200, {AccessToken}, "Registration succesfull"));
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

const getLogedInUserData = AsyncHandeller(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.userData, "user data fetched successfully"));
});

export { register_User, login_User, getLogedInUserData };
