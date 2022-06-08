import express, { json } from "express";
import cors from "cors";

import router from "./routes/router.js";

const app = express();
app.use(cors());
app.use(json());

app.use(router);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
