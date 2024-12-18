import Router from 'express'
import {upload} from '../Middlewares/multer.middleware.js'
import { getLogedInUserData, login_User, register_User } from '../controllers/user.controller.js';
import { verifyJWT } from '../Middlewares/auth.middleware.js';
import { validateShema } from '../Middlewares/validator.middleware.js';
import { RegistrationSchema } from '../Validators/auth.validator.js';

const router = Router();

router.route("/register").post(upload.single("avatar"),validateShema(RegistrationSchema), register_User)
router.route("/login").post(login_User);
router.route("/getUserData").get(verifyJWT, getLogedInUserData);

export default router