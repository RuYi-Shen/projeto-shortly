import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js';

import { validateUser } from '../middlewares/authMiddleware.js';
import { validateSignUp, validateSignIn } from '../middlewares/schemasMiddleware.js';

const authRouter = Router();

authRouter.post("/signup", validateSignUp, signUp);
authRouter.post("/signin", validateSignIn, validateUser, signIn);

export default authRouter;