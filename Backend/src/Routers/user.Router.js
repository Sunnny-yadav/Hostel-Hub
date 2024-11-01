import Router from 'express'
import {upload} from '../Middlewares/multer.js'
import { register_User } from '../controllers/user.controller.js';

const router = Router();

router.route("/register").post(upload.single("avatar"), register_User)


export default router