import { Router } from "express";
import { signInGetHandler, signInPostHandler } from "../controllers/signInHandler.js";
import { signUpPostHandler, singUpGetHandler } from "../controllers/signUpHandler.js";

const authRoute = Router();

authRoute.get("/sign_in", signInGetHandler);
authRoute.post("/sign_in", signInPostHandler);
authRoute.get("/sign_up", singUpGetHandler);
authRoute.post("/sign_up", signUpPostHandler);

export { authRoute };
