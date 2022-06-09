import db from "../db.js";

export async function getUser(req, res) {
  const id = req.params.id;
  try {
    const user = await db.query(
      `SELECT users.id, users.name FROM users WHERE users.id = $1`,
      [id]
    );
    if (user.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    const urls = await db.query(
        `SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount" FROM urls WHERE urls."userId" = $1`,
        [id]
    );
    user.rows[0].visitCount = 0;
    urls.rows.forEach(url => {
        user.rows[0].visitCount += url.visitCount;
    });
    user.rows[0].shortenedUrls = urls.rows;
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
