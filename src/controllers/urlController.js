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

export async function getUrl(req, res) {
  const id = req.params.id;
  try {
    const url = await db.query(`SELECT urls.id, urls."shortUrl", urls.url FROM urls WHERE id = $1`, [id]);
    if (url.rows.length === 0) {
      return res.status(404).send("Url not found");
    }
    res.status(200).json(url.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
