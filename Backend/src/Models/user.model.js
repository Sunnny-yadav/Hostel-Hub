import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
    },

    gender: {
      type: String,
      enum: {
        values: ["M", "F", "O"],
        message: "{VALUE} is not supported. Please choose 'M' or 'F' or 'O'.",
      },
      trim: true,
      required: [true, "user.model:: gender not selected"],
    },

    phone: {
      type: String,
      match: [
        /^[1-9][0-9]{9}$/,
        "Phone number must be 10 digits and cannot start with 0.",
      ],
      required: true,
    },

    role: {
      type: String,
      lowercase: true,
      enum: ["student", "warden"],
      trim: true,
      required: true,
    },

    avatar: {
      type: String, //url from cloudinary
      required: true,
    },
    complaints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RaiseComplaint",
      },
    ],

    mealPollIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MealPoll",
      },
    ],

    // on the basis of role below attributes will be in use

    branchName: {
      type: String,
      lowercase: true,
      trim: true,
      required: function () {
        return this.role === "student";
      },
    },

    currentYear: {
      type: String,
      trim: true,
      required: function () {
        return this.role === "student";
      },
    },

    roomNumber: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    hobbies: {
      type: [String],
    },
  },
  { timestamps: true },
);

userSchema.pre("save", function (next) {
  const fieldsToCheck = ["branchName", "currentYear", "roomNumber", "hobbies"];

  fieldsToCheck.forEach((field) => {
    if (this[field] === "" || this[field] === null || this[field][0] === "") {
      this[field] = undefined;
    }
  });

  next();
});

//Note: Middleware to convert hobbies to lowercase before saving
userSchema.pre('save', function(next) {
  if (this.hobbies && this.hobbies.length > 0) {
    this.hobbies = this.hobbies.map(hobby => hobby.toLowerCase());
  }
  next();
}); 

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  const value = await bcrypt.compare(password, this.password);
  return value;
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    },
  );
};

export const User = mongoose.model("User", userSchema);
