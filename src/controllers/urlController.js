import { nanoid } from "nanoid";
import db from "../db.js";

export async function generateShortUrl(req, res) {
  const { token } = res.locals;
  const { url } = req.body;
  const shortUrl = nanoid(8);

  try {
    await db.query(
      `INSERT INTO urls ("shortUrl", url, "userId") VALUES ($1, $2, $3)`,
      [shortUrl, url, token.userId]
    );
    res.status(201).json({ shortUrl });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
