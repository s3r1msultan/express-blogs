import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render("admin", {
      users,
      isLoggedIn: req.signedCookies.isLoggedIn,
      isAdmin: req.signedCookies.isAdmin,
      language: req.signedCookies.language,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createUserForm = (req, res) => {
  res.render("admin", {
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    language: req.signedCookies.language,
  });
};

// Handle creating a new user
export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect("/admin/users");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const editUserForm = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("admin", {
      user,
      isLoggedIn: req.signedCookies.isLoggedIn,
      isAdmin: req.signedCookies.isAdmin,
      language: req.signedCookies.language,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    res.redirect("/admin/users");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    res.redirect("/admin/users");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
