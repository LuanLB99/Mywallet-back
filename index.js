import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./src/routers/AuthRoutes.js";

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

server.use(AuthRoutes);

server.listen(
  process.env.PORT,
  console.log(`The magic happens on port ${process.env.PORT}`)
);
