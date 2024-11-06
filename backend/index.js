import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoute from "./routes/auth.route.js";
import { connectToMongo } from "./mongo/connectToDatabase.js";

dotenv.config();

const port = 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoute);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
  connectToMongo();
});
