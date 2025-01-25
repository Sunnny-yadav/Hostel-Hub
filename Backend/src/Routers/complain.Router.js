import Router from "express";
import {
  delete_complaint,
  edit_Complaint,
  edit_Complaint_State,
  get_All_Users,
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

// Note: routers for student
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
  .patch(verifyJWT, edit_Complaint);

router
  .route("/get-complaint-by-id")
  .get(verifyJWT, get_Complaints_By_Id);

router
  .route("/:complaintId/delete-complaint")
  .delete(verifyJWT, delete_complaint);


// Note: routers for the warden
router
  .route("/:complaintId/edit-complaint-state")
  .patch(verifyJWT, edit_Complaint_State);

router
  .route("/:Type/get-complaints-by-type")
  .get(verifyJWT, get_Complaints_By_Type);

router
  .route("/get-users")
  .get(verifyJWT, get_All_Users)


// Note: routers common for both 
router
  .route("/:Type/:_id?/get-complaints-by-id-type")
  .get(verifyJWT, get_Complaints_By_Id_Type);


export default router;
