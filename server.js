import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import authRoute from "./server/routes/auth.route.js";
import userRoute from "./server/routes/user.route.js";
const app = express();

// DB connection
mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.listen(3000, () => {
  console.log(`sever is running @ port 3000`);
});
