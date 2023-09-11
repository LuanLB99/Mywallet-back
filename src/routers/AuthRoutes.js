import express from "express";
import { signIn, singUp } from "../controllers/AuthControllers.js";
import {
  getTransactions,
  postTransaction,
} from "../controllers/TransactionControllers.js";
import { authUser } from "../middleware/AuthMiddleware.js";

const routes = express.Router();

routes.post("/sign", signIn);

routes.post("/sign-up", singUp);

routes.get("/", authUser, getTransactions);

routes.post("/transactions", authUser, postTransaction);

export default routes;
