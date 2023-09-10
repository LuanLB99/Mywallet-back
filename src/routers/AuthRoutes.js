import express from "express";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import {
  signSchema,
  loginSchema,
  transactionSchema,
} from "../schemas/AuthSchema.js";
import db from "../connection.js";
import { signIn, singUp } from "../controllers/AuthControllers.js";

const routes = express.Router();

routes.post("/sign", signIn);

routes.post("/sign-up", singUp);

routes.get("/", async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Token de autorização não enviado!");
  }

  try {
    const session = await db.collection("sessions").findOne({ token });

    if (!session) {
      return res.sendStatus(401);
    }

    const user = await db.collection("users").findOne({ _id: session.userId });
    const transactions = await db.collection("transactions").find().toArray();
    const filtertransactions = transactions.filter(
      (transaction) => transaction.name === user.name
    );

    if (!user) {
      return res.sendStatus(401);
    }
    const myuser = {
      name: user.name,
      email: user.email,
      transactions: filtertransactions,
    };

    return res.send(myuser);
  } catch {
    return res.send(error);
  }
});

routes.post("/transactions", async (req, res) => {
  const { authorization } = req.headers;
  const { value, description, type } = req.body;

  const validation = transactionSchema.validate({ value, description, type });

  if (validation.error) {
    return res
      .status(401)
      .send(validation.error.details.map((detail) => detail.message));
  }

  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401);
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

    await db.collection("transactions").insertOne({
      name: user.name,
      userId: user._id,
      value,
      description,
      type,
      date: dayjs().format("DD/MM"),
    });
  } catch {
    return res.sendStatus(404);
  }

  res.sendStatus(200);
});

export default routes;
