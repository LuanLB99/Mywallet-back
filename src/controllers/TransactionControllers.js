import db from "../connection.js";
import dayjs from "dayjs";
import { transactionSchema } from "../schemas/AuthSchema.js";

async function getTransactions(req, res) {
  const user = res.locals.user;

  try {
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
}

async function postTransaction(req, res) {
  const { value, description, type } = req.body;
  const user = res.locals.user;

  const validation = transactionSchema.validate({ value, description, type });

  if (validation.error) {
    return res
      .status(401)
      .send(validation.error.details.map((detail) => detail.message));
  }

  try {
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
}

export { getTransactions, postTransaction };
