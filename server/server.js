import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import path from "path";

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();
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
// app.use(cors());
let corsOptions = {
  origin: ["*"],
};
app.use(cors(corsOptions));
// routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`sever is running @ port 3000`);
});

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

