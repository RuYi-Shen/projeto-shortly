import { Router } from 'express';
import { getUser, getRanking } from '../controllers/userController.js';

const userRouter = Router();

userRouter.get("/ranking", getRanking);
userRouter.get("/:id", getUser);

export default userRouter;