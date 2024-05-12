// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import mongoose from "mongoose";
// import path from "path";

// import authRoute from "./server/routes/auth.route.js";
// import userRoute from "./server/routes/user.route.js";
// const app = express();
// const port = process.env.PORT || 3000;
// const __dirname = path.resolve();
// // DB connection
// mongoose
// .connect(process.env.MONGO_CONNECTION)
// .then(() => {
//   console.log("Connected to DB");
// })
// .catch((error) => {
//   console.log(error);
// });


// // middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // app.use(cors());
// let corsOptions = {
//   origin: ["*"],
// };
// app.use(cors(corsOptions));
// // routes
// app.use("/api/auth", authRoute);
// app.use("/api/user", userRoute);

// app.listen(port, () => {
//   console.log(`sever is running @ port 3000`);
// });

// app.use(express.static(path.join(__dirname, "client/dist")));
// console.log(path.join(__dirname, "client", "dist", "index.html"))
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });

// // app.use(express.static(path.join(__dirname, "client", "dist")));

// // // Route for serving the index.html file
// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// // });

import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import path from "path";

import authRoute from "./server/routes/auth.route.js";
import userRoute from "./server/routes/user.route.js";

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

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: ["*"],
}));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, "client", "dist")));

// Route for serving the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running @ port ${port}`);
});
