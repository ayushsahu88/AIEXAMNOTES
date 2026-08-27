import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import connectDb from "./utils/connectDb.js";
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import notesRouter from "./routes/generateRoute.js";
import pdfRouter from "./routes/pdfRoute.js";
import creditRouter from "./routes/creditsRoute.js";
import { stripeWebhook } from "./controllers/creditsController.js";

const app = express();

app.post(
  "/api/credits/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

app.use(
  cors({
    origin: process.env.CLIENT_URL ? [process.env.CLIENT_URL, "http://localhost:5173"] : "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/credit", creditRouter);

app.listen(PORT, () => {
  console.log(`Server connected successfully ${PORT}`);
  connectDb();
});
