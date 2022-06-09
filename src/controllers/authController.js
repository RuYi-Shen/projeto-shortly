import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db.js";

export async function signUp(req, res) {
  const user = req.body;

  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    await db.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      [user.name, user.email, user.password]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function signIn(req, res) {
  const user = res.locals.user;

  try {
    const token = uuid();
    await db.query(`INSERT INTO tokens (token, "userId") VALUES ($1, $2)`, [
      token,
      user.id,
    ]);
    res.status(200).send(token);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
