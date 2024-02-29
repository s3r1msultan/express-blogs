import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { generateVerificationToken } from "./verifyingHandler.js";
import { sendVerificationEmail } from "./verifyingHandler.js";

export async function signUpPostHandler(req, res) {
  try {
    const { username, password, email, first_name, last_name } = req.body;
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).render("sign_up", {
        successful: false,
        message: "User already exists",
        wrong: true,
        isLoggedIn: req.signedCookies.isLoggedIn,
        isAdmin: req.signedCookies.isAdmin,
        language: req.signedCookies.language,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verification_token = generateVerificationToken();
    const user = new User({
      username,
      password: hashedPassword,
      email,
      first_name,
      last_name,
      isAdmin: false,
      verified: false,
      verification_token,
    });
    await user.save();

    await sendVerificationEmail(user, verification_token, req);

    res.status(201).render("sign_up", {
      successful: true,
      wrong: false,
      isLoggedIn: req.signedCookies.isLoggedIn,
      isAdmin: req.signedCookies.isAdmin,
      language: req.signedCookies.language,
    });
  } catch (error) {
    console.log(error);
    res.status(500).render("sign_up", {
      message: "Server error",
      wrong: true,
      isLoggedIn: req.signedCookies.isLoggedIn,
      isAdmin: req.signedCookies.isAdmin,
      language: req.signedCookies.language,
    });
  }
}

export function singUpGetHandler(req, res) {
  res.render("sign_up", {
    wrong: false,
    successful: false,
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    language: req.signedCookies.language,
  });
}
