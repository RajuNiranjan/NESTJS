import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn = async (req, res, next) => {
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
    return res
      .status(500)
      .json({ message: `Internal server error --> ${error} ` });
  }
};
