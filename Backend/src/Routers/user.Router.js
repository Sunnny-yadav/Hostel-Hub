import Router from 'express'
import { register_User } from '../controllers/user.controller.js';

const router = Router();

router.route("/register").post(register_User)


export default router