import express from "express";
import cors from "cors";
import path from "path";
import { errors } from "celebrate";

import routes from "./routes";

import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(
  "/items",
  express.static(path.join(__dirname, "..", "public", "items"))
);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errors());

app.get("/health", (_, res) => res.status(200).send());

const port = process.env.SERVER_PORT || 3333;
app.listen(port, () => console.log(`Server is running on port ${port}`));
