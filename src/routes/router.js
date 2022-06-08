import { Router } from 'express';
import userRouter from "./userRouter.js";
import urlRouter from "./urlRouter.js";

const router = new Router();

router.use(userRouter);
router.use("/urls", urlRouter);

export default router;