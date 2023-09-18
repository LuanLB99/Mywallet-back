import express from "express";
import {
  signIn,
  signInWithGoogle,
  signUpWithGoogle,
  singUp,
} from "../controllers/AuthControllers.js";
import {
  getTransactions,
  postTransaction,
} from "../controllers/TransactionControllers.js";
import { authUser } from "../middleware/AuthMiddleware.js";

const routes = express.Router();

routes.get("/status", async (req, res) => res.send("OK"));

routes.post("/sign", signIn);

routes.post("/sign-in-google", signInWithGoogle);

routes.post("/sign-up", singUp);

routes.post("/sign-up-google", signUpWithGoogle);

routes.get("/", authUser, getTransactions);

routes.post("/transactions", authUser, postTransaction);

export default routes;
