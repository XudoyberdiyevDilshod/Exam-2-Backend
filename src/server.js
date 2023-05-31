import express from "express";
import fileUpload from "express-fileupload";
import { resolve } from "path";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import adminRouter from "./router/admin.route.js";
import postRouter from "./router/post.route.js";

const PORT = process.env.PORT || 7070;

const app = express();

app.use(cors());
app.use(express.static(resolve("uploads")));
app.use(express.json());
app.use(fileUpload());

app.use(adminRouter);
app.use(postRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log("server running port: " + PORT));
