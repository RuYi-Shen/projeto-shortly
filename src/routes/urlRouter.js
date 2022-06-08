import { Router } from 'express';
import { generateShortUrl } from '../controllers/urlController.js';

//import { validateToken } from '../middlewares/urlMiddleware.js';
import { validateToken, validateUrl } from '../middlewares/schemasMiddleware.js';

const urlRouter = Router();

urlRouter.post("/shorten", validateToken, validateUrl, generateShortUrl);
/* urlRouter.get("/open/:shortUrl", validateSignIn, validateUser, signIn);
urlRouter.get("/:id", validateSignIn, validateUser, signIn);
urlRouter.delete("/:id", validateSignIn, validateUser, signIn); */

export default urlRouter;