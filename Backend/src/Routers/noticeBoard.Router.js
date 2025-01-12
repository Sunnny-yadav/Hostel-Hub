import Router from "express"
import { getLatestNotice, storeNotice } from "../controllers/noticeBoard.controller.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";


const router = Router();

router.route("/store-notice").post(verifyJWT, storeNotice);
router.route("/get-latest-notice").get(verifyJWT, getLatestNotice)



export default router;