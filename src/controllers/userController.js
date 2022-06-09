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
    urls.rows.forEach((url) => {
      user.rows[0].visitCount += url.visitCount;
    });
    user.rows[0].shortenedUrls = urls.rows;
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getRanking(req, res) {
  try {
    const users = await db.query(
      `SELECT users.id, users.name, SUM(urls.id) AS "linksCount", SUM(urls."visitCount") AS "visitCount" FROM users 
      LEFT JOIN urls ON urls."userId" = users.id 
      GROUP BY users.id 
      ORDER BY "visitCount"
      LIMIT 10`
    );
    users.rows.forEach((user) => {
        if(!user.linksCount) user.linksCount = 0;
        user.linksCount *= 1;
        if(!user.visitCount) user.visitCount = 0;
        user.visitCount *= 1;
    });
    res.json(users.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
