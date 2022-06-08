import { Router } from 'express';
import authRouter from "./authRouter";

const router = new Router();

router.use(authRouter);

export default router;