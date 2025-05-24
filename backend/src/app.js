import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/router.js";
// import connectDB from "./db/db_config.js";
// import { urlRedirect } from "./controllers/shortURL.js";
dotenv.config();

// connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", router);

// app.get("/:shortCode", urlRedirect);

export default app;
