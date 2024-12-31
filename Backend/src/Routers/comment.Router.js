import Router from 'express'
import { get_comments, insert_comment } from '../controllers/comments.controller.js';
import { validateShema } from '../Middlewares/validator.middleware.js';
import { commentSchema } from '../Validators/comment.validator.js';
import { verifyJWT } from '../Middlewares/auth.middleware.js';

const router = Router();

router
    .route("/:complaintId/get-comments")
    .get(verifyJWT,get_comments);

router
    .route("/:complaintId/insert-comment")
    .post(validateShema(commentSchema), verifyJWT, insert_comment);

export default router;