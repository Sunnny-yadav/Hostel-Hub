import { MealPoll } from "../Models/meal.model.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../Models/user.model.js";

const addMeal = AsyncHandeller(async (req, res) => {
  const { _id } = req.userData;
  const { meals, pollDeadline } = req.body;

  if (!meals || !Array.isArray(meals) || meals.length === 0) {
    return res.status(400).json({
      message: "Missing or invalid array",
    });
  }

  if (!pollDeadline) {
    return res.status(400).json({ message: "Poll deadline is required" });
  }

  const mealArrayWithObject = meals
    .filter((meal) => meal !== "")
    .map((meal) => ({ menu: meal }));

  if (mealArrayWithObject.length === 0) {
    return res.status(400).json({
      message: "mealArray conversion into mealArrayObject Fails",
    });
  }

  const deadLine = new Date(pollDeadline).toISOString();

  if (!deadLine) {
    return res.status(400).json({
      message: "pollDeadline converison fails to UTC",
    });
  }

  const mealPoll = await MealPoll.create({
    meals: mealArrayWithObject,
    pollDeadline: deadLine,
    wardenId: _id,
  });

  if (Object.keys(mealPoll).length === 0) {
    return res.status(400).json({
      message: "Poll creation unsuccessfull",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, mealPoll, "Poll creation Successfull"));
});

const updateState = AsyncHandeller(async (req, res) => {
  const { pollId } = req.params;
  const { stateValue } = req.body;

  if (!["active", "inactive"].includes(stateValue)) {
    return res.status(400).json({
      message: `${stateValue} is not valide`,
    });
  }

  const updatedPoll = await MealPoll.findByIdAndUpdate(
    { _id: pollId },
    {
      pollStatus: stateValue,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedPoll) {
    return res.status(404).json({
      message: "Poll not found, state update unsuccessful",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedPoll, "state update succesfull"));
});

const voteForMenu = AsyncHandeller(async (req, res) => {
  const { pollId, menuId } = req.params;
  const { _id } = req.userData;

  const userAlreadyVoted = await User.findById(_id);

  if(userAlreadyVoted.mealPollIds.includes(pollId)){
    return res.status(400).json({
      message: "Vote Already Submitted"
    })
  };


  const updatedPoll = await MealPoll.findOneAndUpdate(
    { _id: pollId, "meals._id": menuId },
    { $inc: { "meals.$.count": 1 } },
    { new: true },
  );

  if (!updatedPoll) {
    return res.status(400).json({
      message: "vote not added",
    });
  }

  await User.findByIdAndUpdate(
    _id,
    {
      $push: {
        mealPollIds: updatedPoll._id,
      },
    },
    {
      new: true,
    },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedPoll, "vote added successful"));
});

const getMealPollById = AsyncHandeller(async (req, res) => {
  const { pollId } = req.params;

  const mealPollData = await MealPoll.findById({ _id: pollId });

  if (!mealPollData) {
    return res.status(400).json({
      message: "The Poll Not found",
    });
  }

  return res
      .status(200)
      .json(
        new ApiResponse(200, mealPollData, "meal poll fetched successfull"),
      );
});

const getLatestMealPoll = AsyncHandeller(async (req, res)=>{
  const today = new Date();
    today.setHours(0, 0, 0, 0);

     const recentMealPoll = await MealPoll.find({createdAt:{$gte:today}}).sort({createdAt:-1}).limit(1)
    console.log(recentMealPoll)
     if (recentMealPoll.length === 0) {
      return res.status(404).json({ message: 'No  meal poll added Today ' });
    }

    return res.status(200).json(new ApiResponse(200, recentMealPoll[0],"Latest poll fetch successful"))
});

export { addMeal, updateState, voteForMenu, getMealPollById, getLatestMealPoll };
