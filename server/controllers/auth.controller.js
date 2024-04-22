import User from "../models/users.js";

const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (userName && email && password) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(404).json({ success: false, message: "user already exist" });
      } else {
        const newUser = await new User({
          userName,
          email,
          password,
        }).save();

        res
          .status(201)
          .json({ success: true, message: "user created succesfully" });
      }
    } else res.status(404).json({ success: false });
  } catch (error) {
    console.log(error.message);
  }
};

const signIn = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email, password });
      console.log(user);
      if (user) {
        res.status(201).json({ success: true, user: user });
      }
    } else res.status(404).json({ success: false });
  } catch (error) {
    console.log(error.message);
  }
};

export { signUp, signIn };
