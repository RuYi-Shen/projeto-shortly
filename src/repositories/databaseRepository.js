import db from "../db.js";

async function getUser(id) {
  return db.query(
    `SELECT users.id, users.name FROM users WHERE users.id = $1`,
    [id]
  );
}

async function getToken(token) {
  return db.query(`SELECT * FROM tokens WHERE token = $1`, [token]);
}

async function getUserbyEmail(email) {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function getUrls(userId) {
  return db.query(
    `SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount" FROM urls WHERE urls."userId" = $1`,
    [userId]
  );
}

async function getRanking() {
  return db.query(
    `SELECT users.id, users.name, COUNT(urls) AS "linksCount", SUM(urls."visitCount") AS "visitCount" FROM users 
        LEFT JOIN urls ON urls."userId" = users.id 
        GROUP BY users.id 
        ORDER BY "visitCount"
        LIMIT 10`
  );
}

async function insertUrl(shortUrl, url, userId) {
  return db.query(
    `INSERT INTO urls ("shortUrl", url, "userId") VALUES ($1, $2, $3)`,
    [shortUrl, url, userId]
  );
}

async function getUrlbyId(id) {
  return db.query(
    `SELECT urls.id, urls."shortUrl", urls.url, urls."userId" FROM urls WHERE urls.id = $1`,
    [id]
  );
}

async function getUrlbyShortUrl(shortUrl) {
  return db.query(`SELECT urls.url FROM urls WHERE "shortUrl" = $1`, [
    shortUrl,
  ]);
}

async function incrementVisitCount(shortUrl) {
  return db.query(
    `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1`,
    [shortUrl]
  );
}

async function deleteUrl(id) {
  return db.query(`DELETE FROM urls WHERE id = $1`, [id]);
}

const databaseRepository = {
  getUser,
  getToken,
  getUserbyEmail,
  getUrls,
  getRanking,
  insertUrl,
  getUrlbyId,
  getUrlbyShortUrl,
  incrementVisitCount,
  deleteUrl,
};

export default databaseRepository;
