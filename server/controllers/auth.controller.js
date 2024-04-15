const { Users } = require("../models/users");
const signup = async (req, res) => {
  const { password, email, userName } = req.body;
  await Users.create({
    userName: userName,
    email: email,
    password: password,
  });
};

module.exports = {
  signup,
};
