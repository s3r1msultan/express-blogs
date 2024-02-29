import { Router } from "express";
import {
  getAllUsers,
  createUserForm,
  createUser,
  editUserForm,
  updateUser,
  deleteUser,
} from "../controllers/adminHandler.js";

const adminRoute = Router();

adminRoute.get("/users", getAllUsers);

adminRoute.get("/users/new", createUserForm);
adminRoute.post("/users", createUser);

adminRoute.get("/users/edit/:id", editUserForm); // Display form to edit a user
adminRoute.post("/users/:id", updateUser); // Submit the form to update the user
adminRoute.post("/users/delete/:id", deleteUser);

export { adminRoute };
