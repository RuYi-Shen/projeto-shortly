import { signUpSchema, signInSchema } from "../schemas/userSchema.js";
import { urlSchema } from "../schemas/urlSchema.js";
import db from "../db.js";

export async function validateSignUp(req, res, next) {
  const user = req.body;
  try {
    await signUpSchema.validateAsync(user, { abortEarly: false });
    next();
  } catch (error) {
    console.log(error);
    res.status(422).send(error.details.map((e) => e.message));
  }
}

export async function validateSignIn(req, res, next) {
  const user = req.body;
  try {
    await signInSchema.validateAsync(user, { abortEarly: false });
    next();
  } catch (error) {
    console.log(error);
    res.status(422).send(error.details.map((e) => e.message));
  }
}

export async function validateUrl(req, res, next) {
  const url = req.body;
  try {
    await urlSchema.validateAsync(url, { abortEarly: false });
    next();
  } catch (error) {
    console.log(error);
    res.status(422).send(error.details.map((e) => e.message));
  }
}

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  if (!token) return res.status(401).send("Unauthorized");
  try {
    const tokenFromDb = await db.query(`SELECT * FROM tokens WHERE token = $1`, [
      token,
    ]);
    if (tokenFromDb.rows.length === 0) {
      return res.status(401).send("Unauthorized");
    }
    res.locals.token = tokenFromDb.rows[0];
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
