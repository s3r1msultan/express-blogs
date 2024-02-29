import { Router } from "express";
import { User } from "../models/user.js";

const verificationRoute = Router();

verificationRoute.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).redirect("/auth/sign_in");
    }
    const user = await User.findOne({ verification_token: token });
    if (!user) {
      return res.status(404).redirect("/auth/sign_in");
    }
    user.isVerified = true;
    user.verification_token = undefined;
    user.modifiedAt = Date.now();
    await user.save();

    res.status(401).redirect("/blogs");
  } catch (error) {
    res.status(500).send("Server error during the verification process.").redirect("/auth/sign_in");
  }
});

export { verificationRoute };
