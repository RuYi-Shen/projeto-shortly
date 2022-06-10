import bcrypt from "bcrypt";
import databaseRepository from "../repositories/databaseRepository.js";

export async function validateUser(req, res, next) {
  const user = req.body;
  try {
    const userFromDb = await databaseRepository.getUserbyEmail(user.email);
    if (userFromDb.rows.length === 0) {
      return res.status(401).send("User not found");
    }
    const isValid = await bcrypt.compare(
      user.password,
      userFromDb.rows[0].password
    );
    if (!isValid) {
      return res.status(401).send("Invalid password");
    }
    res.locals.user = userFromDb.rows[0];
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function verifyInfo(req, res, next) {
  const user = res.locals.user;
  if (user.name !== req.body.username) {
    return res.status(409).send("Unauthorized");
  }
  next();
}
