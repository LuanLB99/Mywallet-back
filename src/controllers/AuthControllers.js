import db from "../connection.js";
import { loginSchema, signSchema } from "../schemas/AuthSchema.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

async function signIn(req, res) {
  const { name, email, password, repeat_password } = req.body;

  const sign = signSchema.validate({ name, email, password, repeat_password });
  if (sign.error) {
    return res
      .status(401)
      .send(sign.error.details.map((detail) => detail.message));
  }

  try {
    const user = await db.collection("users").findOne({ name });
    if (user) {
      return res.status(401).send("Usuário ja existe");
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    db.collection("users").insertOne({
      name,
      email,
      password: passwordHash,
      transactions: [],
    });
  } catch (error) {
    res.send(error.message);
  }

  res.send("Usuário inserido com sucesso!");
}

async function singUp(req, res) {
  const { email, password } = req.body;

  const login = loginSchema.validate({ email, password });
  if (login.error) {
    return res
      .status(401)
      .send(login.error.details.map((detail) => detail.message));
  }

  try {
    const user = await db.collection("users").findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();

      await db.collection("sessions").insertOne({
        userId: user._id,
        token,
      });
      return res.status(201).send(token);
    } else {
      return res.status(401).send("usuário e/ou senha incorretos!");
    }
  } catch (error) {
    return res.status(401).send("usuário e/ou senha incorretos!");
  }
}

export { signIn, singUp };
