import { Router } from 'express';
import { signUp, signIn } from '../controllers/userController.js';

import { validateUser } from '../middlewares/userMiddleware.js';
import { validateSignUp, validateSignIn } from '../middlewares/schemasMiddleware.js';

const userRouter = Router();

userRouter.post("/signup", validateSignUp, signUp);
userRouter.post("/signin", validateSignIn, validateUser, signIn);

export default userRouter;