import { Router } from 'express';
import { getUser } from '../controllers/userController.js';
//import { validateToken, validateUrl } from '../middlewares/schemasMiddleware.js';

const userRouter = Router();

//userRouter.get("/ranking", redirectToUrl);
userRouter.get("/:id", getUser);

export default userRouter;