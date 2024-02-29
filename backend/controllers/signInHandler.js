import { User } from "../models/user.js";
import bcrypt from "bcryptjs";

export let user;

export async function signInPostHandler(req, res) {
  try {
    const { username, password } = req.body;
    user = await User.findOne({ username });
    if (!user) {
      return res.status(401).render("sign_in", {
        wrong: true,
        message: "User not found",
        isLoggedIn: false,
        isAdmin: false,
        language: req.signedCookies.language,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).render("sign_in", {
        wrong: true,
        message: "Wrong password",
        isLoggedIn: false,
        isAdmin: false,
        language: req.signedCookies.language,
      });
    }
    res.cookie("isLoggedIn", true, { httpOnly: true, signed: true });
    res.cookie("isAdmin", user.isAdmin, { httpOnly: true, signed: true });
    res.cookie("isVerified", user.isVerified, { httpOnly: true, signed: true });
    res.cookie("username", user.username, { httpOnly: true, signed: true });

    res.redirect("/blogs");
  } catch (error) {
    return res.status(500).render("sign_in", {
      wrong: true,
      message: "Server error",
      isLoggedIn: false,
      isAdmin: false,
      language: req.signedCookies.language,
    });
  }
}

export function signInGetHandler(req, res) {
  res.render("sign_in", {
    wrong: false,
    isVerified: req.signedCookies.isVerified,
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    language: req.signedCookies.language,
  });
}
