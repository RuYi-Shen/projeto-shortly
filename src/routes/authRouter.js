import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";

import { validateUser } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validateMiddleware.js";

import { signUpSchema, signInSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signUp);
authRouter.post("/signin", validateSchema(signInSchema), validateUser, signIn);

export default authRouter;
