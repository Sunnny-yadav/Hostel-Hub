import Router from "express";
import {
  delete_complaint,
  edit_Complaint,
  edit_Complaint_State,
  get_Complaints_By_Id,
  get_Complaints_By_Id_Type,
  get_Complaints_By_Type,
  register_Complaint,
} from "../controllers/complaint.controller.js";

import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { upload } from "../Middlewares/multer.middleware.js";
import { validateShema } from "../Middlewares/validator.middleware.js";
import { raiseComplaintSchema } from "../Validators/complaint.Validator.js";

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
  .route("/:complaintId/edit-complaint")
  .patch(verifyJWT, upload.single("image"),validateShema(raiseComplaintSchema), edit_Complaint);
  
router
  .route("/:complaintId/edit-complaint-state")
  .patch(verifyJWT, edit_Complaint_State);
  
router
  .route("/:Type/get-complaints-by-id-type")
  .get(verifyJWT, get_Complaints_By_Id_Type);
  
router
  .route("/:Type/get-complaints-by-type")
  .get(verifyJWT, get_Complaints_By_Type);

router
  .route("/get-complaint-by-id")
  .get(verifyJWT, get_Complaints_By_Id);
router
  .route("/:complaintId/delete-complaint")
  .delete(verifyJWT, delete_complaint);

  

export default router;
