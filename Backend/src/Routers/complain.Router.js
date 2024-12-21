import Router from 'express'
import { edit_Complaint, edit_Complaint_State, get_Complaints_By_Id_State, insert_comment, register_Complaint } from '../controllers/complaint.controller.js';
import { verifyJWT } from '../Middlewares/auth.middleware.js';
import { upload } from '../Middlewares/multer.middleware.js';

const router = Router();

router.route('/register-complaint').post(verifyJWT,upload.single("image"),register_Complaint);
router.route('/:complaintId/insert-comment').post(verifyJWT,insert_comment);
router.route('/:complaintId/edit-Complaint').patch(verifyJWT,upload.single("image"),edit_Complaint);
router.route('/:complaintId/edit-complaint-state').patch(verifyJWT,edit_Complaint_State);
router.route('/:state/get-Complaints').get(verifyJWT,get_Complaints_By_Id_State);

export default router;