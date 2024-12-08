import Router from 'express'
import {upload} from '../Middlewares/multer.middleware.js'
import { login_User, register_User } from '../controllers/user.controller.js';

const router = Router();

router.route("/register").post(upload.single("avatar"), register_User)
router.route("/login").post(login_User);

export default router