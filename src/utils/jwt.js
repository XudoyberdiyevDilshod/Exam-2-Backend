import jwt from "jsonwebtoken";

const SECRET = "Dilshod_X";

export default {
  sign: (payload) => jwt.sign(payload, SECRET),
  verify: (token) => jwt.verify(token, SECRET),
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4NTU0ODYzNH0.mnlMh9GyXsezR58zcLQ11wJAMiiIhxTEVlESjmoyLYM