import jwt from "jsonwebtoken";

const SECRET = "Dilshod_X";

export default {
  sign: (payload) => jwt.sign(payload, SECRET),
  verify: (token) => jwt.verify(token, SECRET),
};
