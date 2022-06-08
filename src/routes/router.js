import { Router } from 'express';
import authRouter from "./authRouter.js";
import urlRouter from "./urlRouter.js";

const router = new Router();

router.use(authRouter);
router.use("/urls", urlRouter);

export default router;