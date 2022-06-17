import databaseRepository from "../repositories/databaseRepository.js";

export function validateSchema(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      console.log(error);
      res.status(422).send(error.details.map((e) => e.message));
    }
  };
}

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  if (!token) return res.status(401).send("Unauthorized");
  try {
    const tokenFromDb = await databaseRepository.getToken(token);
    if (tokenFromDb.rows.length === 0) {
      return res.status(401).send("Unauthorized");
    }
    console.log(tokenFromDb.rows[0]);
    res.locals.token = tokenFromDb.rows[0];
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
