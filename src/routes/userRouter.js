import { Router } from 'express';
import { signUp, signIn } from '../controllers/userController.js';

import { validateSignIn, validateUser} from '../middlewares/userMiddleware.js';
import { validateSignUp } from '../middlewares/schemasMiddleware.js';

const userRouter = Router();

userRouter.post("/signup", validateSignUp, signUp);
userRouter.post("/signin", validateSignIn, validateUser, signIn);

export default userRouter;