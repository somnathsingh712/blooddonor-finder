// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) return res.status(401).json("No token");

//   const decoded = jwt.verify(
//     token,
//     process.env.JWT_SECRET
//   );

//   req.user = decoded;
//   next();
// };


import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res.status(401).json("No token provided");

    // Remove "Bearer "
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded; // contains user id

    next();

  } catch (error) {
    res.status(401).json("Invalid token");
  }
};
