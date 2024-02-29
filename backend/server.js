import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import blogsRoute from "./routes/blogsRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import { authRoute } from "./routes/authRoute.js";
import { languageRoute } from "./routes/languageRoute.js";
import cookieParser from "cookie-parser";
import { isAdmin } from "./middlewares/adminMiddleware.js";
import { adminRoute } from "./routes/adminRoute.js";
import { checkAuth, isLoggedIn } from "./middlewares/authMiddleware.js";
import { logoutRoute } from "./routes/logoutRoute.js";
import { homeRoute } from "./routes/homeRoute.js";
import { pageNotFoundRoute } from "./routes/pageNotFound.js";
import { verificationRoute } from "./routes/verificationRoute.js";
import { profileRoute } from "./routes/profileRoute.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "frontend", "assets")));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET_KEY || "!IWANNABEHAPPY"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "frontend", "views", "pages"));

mongoose
  .connect(process.env.MONGODB_URL + process.env.DATABASE)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.use("/blogs", checkAuth, blogsRoute);
app.use("/auth", isLoggedIn, authRoute);
app.use("/language", languageRoute);
app.use("/admin", checkAuth, isAdmin, adminRoute);
app.use("/logout", checkAuth, logoutRoute);
app.use("/profile", checkAuth, profileRoute);
app.use("/", homeRoute, verificationRoute, pageNotFoundRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("server listening on port " + process.env.PORT || 3000);
});

process.on("SIGINT", () => {
  mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  process.exit(0);
});
