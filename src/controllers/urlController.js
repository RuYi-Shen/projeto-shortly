import { nanoid } from "nanoid";
import databaseRepository from "../repositories/databaseRepository.js";


export async function generateShortUrl(req, res) {
  const { token } = res.locals;
  const { url } = req.body;
  const shortUrl = nanoid(8);

  try {
    await databaseRepository.insertUrl(shortUrl, url, token.userId);
    res.status(201).json({ shortUrl });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getUrl(req, res) {
  const id = req.params.id;
  try {
    const url = await databaseRepository.getUrlbyId(id);
    if (url.rows.length === 0) {
      return res.status(404).send("Url not found");
    }
    res.status(200).json(url.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function redirectToUrl(req, res) {
  const shortUrl = req.params.shortUrl;
  try {
    const url = await databaseRepository.getUrlbyShortUrl(shortUrl);
    if (url.rows.length === 0) {
      return res.status(404).send("Url not found");
    }
    await databaseRepository.incrementVisitCount(shortUrl);
    res.redirect(url.rows[0].url);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function deleteUrl(req, res) {
  const id = req.params.id;
  const { token } = res.locals;
  try {
    const url = await databaseRepository.getUrlbyId(id);
    if (url.rows.length === 0) {
      return res.status(404).send("Url not found");
    }
    if (url.rows[0].userId !== token.userId) {
      return res.status(401).send("Unauthorized");
    }
    await databaseRepository.deleteUrl(id);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
