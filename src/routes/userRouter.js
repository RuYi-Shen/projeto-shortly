import { Router } from "express";
import { getUser, getRanking } from "../controllers/userController.js";
import { validateToken } from "../middlewares/validateMiddleware.js";

const userRouter = Router();

userRouter.get("/ranking", getRanking);
userRouter.get("/users/:id", validateToken, getUser);

export default userRouter;
