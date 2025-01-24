import Router from 'express'
import {upload} from '../Middlewares/multer.middleware.js'
import { getLogedInUserData, getMatchedProfileStudents, login_User, register_User, UpdateUserProfile } from '../controllers/user.controller.js';
import { verifyJWT } from '../Middlewares/auth.middleware.js';
import { validateShema } from '../Middlewares/validator.middleware.js';
import { loginSchema, RegistrationSchema } from '../Validators/auth.validator.js';

const router = Router();

router
    .route("/register").post(upload.single("avatar"),validateShema(RegistrationSchema), register_User);
router
    .route("/login").post(validateShema(loginSchema),login_User);
router
    .route("/getUserData").get(verifyJWT, getLogedInUserData);
router
    .route("/get-matched-profiles").get(verifyJWT, getMatchedProfileStudents);
router
    .route("/update-profile").patch(verifyJWT, UpdateUserProfile);

export default router;