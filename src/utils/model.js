import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { createHash } from "crypto";

const read = (filename) => {
  const data = readFileSync(resolve("database", filename + `.json`), "utf-8");
  return JSON.parse(data);
};

const write = (filename, data) => {
  writeFileSync(
    resolve("database", filename + `.json`),
    JSON.stringify(data, null, 4)
  );
  return true;
};

const hashPassword = (password) =>
  createHash("sha256").update(password).digest("hex");

export { read, write, hashPassword };
