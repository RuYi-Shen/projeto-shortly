import db from "../db.js";

export async function getUser(req, res) {
  const id = req.params.id;
  try {
    const url = await db.query(
      `SELECT urls.id, urls."shortUrl", urls.url FROM urls WHERE id = $1`,
      [id]
    );
    if (url.rows.length === 0) {
      return res.status(404).send("Url not found");
    }
    res.status(200).json(url.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}