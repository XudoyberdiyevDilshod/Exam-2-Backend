import { read, write } from "../utils/model.js";

const LOGIN = (req, res, next) => {
  try {
    const admin = read("admin");
    const { username, password } = req.body;
    const user = admin.find(
      (admin) => admin.username == username && admin.password == password
    );

    if (!user) {
      return next(new BadRequestError(400, "wrong username or password"));
    }
    delete user.password;
    res.status(200).json({
      status: 200,
      message: "success",
      data: user,
    });
  } catch (error) {
    return next(new InternalServerError(500, "InternalServerError"));
  }
};

export default { LOGIN };
