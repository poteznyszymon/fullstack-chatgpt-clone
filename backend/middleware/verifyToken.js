import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized - no token provided" });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken)
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized - invalid token" });

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};
