import Router from 'express'
import { edit_Complaint, insert_comment, register_Complaint } from '../controllers/complaint.controller.js';
import { verifyJWT } from '../Middlewares/auth.middleware.js';
import { upload } from '../Middlewares/multer.middleware.js';

const router = Router();

router.route('/register-complaint').post(verifyJWT,upload.single("image"),register_Complaint);
router.route('/:complaintId/insert-comment').post(verifyJWT,insert_comment);
router.route('/:complaintId/edit-Complaint').patch(verifyJWT,upload.single("image"),edit_Complaint);

export default router