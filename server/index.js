import express from "express";
import { connectDB } from "./db/database.js";
import userRouter from "./routes/user.route.js";
import eventRouter from "./routes/event.route.js";
import { protectRoute } from "./middleware/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

const client = process.env.CLIENT_URL;

connectDB();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(express.json());
app.use(
  cors({
    origin: client,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/events", protectRoute, eventRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
