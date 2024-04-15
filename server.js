const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./server/models");


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routers
const authRouter = require("./server/routes/auth.route");
app.use("/auth", authRouter);


db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log(`server is running @ port 3000`);
  });
});
