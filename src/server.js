import express from "express";
import fileUpload from "express-fileupload";
import fs from "fs";
import { resolve, join } from "path";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "./middleware/errorHandler.js";
import adminRouter from "./router/admin.route.js";
import postRouter from "./router/post.route.js";
import swaggerRouter from "./swagger.js";
import { PORT } from "./config.js";

const app = express();

app.use(cors());
app.use(express.static(resolve("uploads")));
app.use(express.json());
app.use(fileUpload());

app.use(
  morgan("combined", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
    stream: fs.createWriteStream(join(process.cwd(), "access.log"), {
      flags: "a",
    }),
  })
);

app.use("/api-docs", swaggerRouter);
app.use(adminRouter);
app.use(postRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log("server running port: " + PORT));
