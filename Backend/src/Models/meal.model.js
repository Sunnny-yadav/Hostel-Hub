import mongoose from 'mongoose';

const mealPollSchema = new mongoose.Schema(
  {
    meals: [
      {
        menu: {
          type: String,
          lowercase: true,
        },
        count: {
          type: Number,
          default: 0,
        },
      }
    ],

    wardenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pollDeadline: {
      type: String,
      required: true,
    },

    pollStatus: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message: "{VALUE} is not a valid state",
      },
      default: "active",
    },
  },
  { timestamps: true }
);

export const MealPoll = mongoose.model("MealPoll", mealPollSchema);
