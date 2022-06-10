import databaseRepository from "../repositories/databaseRepository.js";

export async function getUser(req, res) {
  const id = req.params.id;
  if (id != res.locals.token.userId) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const user = await databaseRepository.getUser(id);
    if (user.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    const urls = await databaseRepository.getUrls(id);
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
    const users = await databaseRepository.getRanking();
    users.rows.forEach((user) => {
      if (!user.linksCount) user.linksCount = 0;
      user.linksCount *= 1;
      if (!user.visitCount) user.visitCount = 0;
      user.visitCount *= 1;
    });
    res.json(users.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
