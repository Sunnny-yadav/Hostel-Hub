import {Router} from 'express'
import { addMeal, getLatestMealPoll, getMealPollById, updateState, voteForMenu } from '../controllers/meals.controller.js';
import {verifyJWT} from '../Middlewares/auth.middleware.js'


const router = Router()

router.route("/add-meal").post(verifyJWT, addMeal);
router.route("/:pollId/update-state").patch(verifyJWT, updateState);
router.route("/:pollId/:menuId/vote-menu").patch(verifyJWT, voteForMenu);
router.route("/:pollId/get-mealPoll-by-id").get(verifyJWT, getMealPollById);
router.route("/get-recent-MealPoll").get(getLatestMealPoll)

export default router;