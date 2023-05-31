import express from "express";
import fileUpload from "express-fileupload";
import { resolve } from "path";
import cors from "cors";
import error from "./middleware/errorHandler.js";

const PORT = process.env.PORT || 7000;

const app = express();

app.use(cors);
app.use(express.static(resolve("uploads")));
app.use(express.json());
app.use(fileUpload());


app.use(error);

app.listen(PORT, () => console.log("server running port: " + PORT));
