import Router from "express";
import {
  edit_Complaint,
  edit_Complaint_State,
  get_Complaints_By_Id_State,
  get_Complaints_By_State,
  insert_comment,
  register_Complaint,
} from "../controllers/complaint.controller.js";

import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { upload } from "../Middlewares/multer.middleware.js";
import { validateShema } from "../Middlewares/validator.middleware.js";
import { raiseComplaintSchema } from "../Validators/complaint.Validator.js";
import { commentSchema } from "../Validators/comment.validator.js";

const router = Router();

router
  .route("/register-complaint")
  .post(
    verifyJWT,
    upload.single("image"),
    validateShema(raiseComplaintSchema),
    register_Complaint,
  );
  
router
  .route("/:complaintId/insert-comment")
  .post(validateShema(commentSchema), verifyJWT, insert_comment);
  
router
  .route("/:complaintId/edit-complaint")
  .patch(verifyJWT, upload.single("image"), edit_Complaint);
  
router
  .route("/:complaintId/edit-complaint-state")
  .patch(verifyJWT, edit_Complaint_State);
  
router
  .route("/:state/get-complaints-by-id-state")
  .get(verifyJWT, get_Complaints_By_Id_State);
  
router
  .route("/:state/get-complaints-by-state")
  .get(verifyJWT, get_Complaints_By_State);
  

export default router;
