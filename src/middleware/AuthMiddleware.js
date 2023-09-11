import db from "../connection.js";

async function authUser(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Token de autorização não enviado!");
  }

  try {
    const session = await db.collection("sessions").findOne({ token });

    if (!session) {
      return res.sendStatus(401);
    }

    const user = await db.collection("users").findOne({ _id: session.userId });
    if (!user) {
      return res.sendStatus(401);
    }
    res.locals.user = user;
  } catch (error) {
    res.sendStatus(401).send("Erro de autenticação");
  }
  next();
}

export { authUser };
