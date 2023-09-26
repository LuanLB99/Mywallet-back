import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db;
const mongoClient = new MongoClient(
  "mongodb+srv://user:user123@mywallet.rkxayzw.mongodb.net/?retryWrites=true&w=majority"
);
await mongoClient.connect().then(() => {
  db = mongoClient.db("MyWallet");
});

export default db;
