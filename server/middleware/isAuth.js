import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ message: "token is not verified" });
    }
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status({ message: "user doesnt have valid token" });
    }
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuth;
