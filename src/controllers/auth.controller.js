import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { userName, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "Email already existed" });
    }

    const hashPassword = bcrypt.hashSync(password, 12);

    const newUser = UserModel({ userName, email, password: hashPassword });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );

    const userResponse = {
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      avatar: newUser.avatar,
    };

    res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(201).json({
      message: "User created Successfully",
      user: userResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error ` });
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );

    const userResponse = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
    };

    res.setHeader("Authorization", `Bearer ${token}`);

    return res
      .status(200)
      .json({ message: "User Login Successfully", user: userResponse });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error ` });
  }
};
