import { signUpSchema, signInSchema } from "../schemas/userSchema.js";

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
