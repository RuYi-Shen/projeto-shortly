import { Router } from "express";
import {
  generateShortUrl,
  getUrl,
  redirectToUrl,
  deleteUrl,
} from "../controllers/urlController.js";
import {
  validateToken,
  validateSchema,
} from "../middlewares/validateMiddleware.js";

import { urlSchema } from "../schemas/urlSchema.js";

const urlRouter = Router();

urlRouter.post(
  "/shorten",
  validateToken,
  validateSchema(urlSchema),
  generateShortUrl
);
urlRouter.get("/open/:shortUrl", redirectToUrl);
urlRouter.get("/:id", getUrl);
urlRouter.delete("/:id", validateToken, deleteUrl);

export default urlRouter;
