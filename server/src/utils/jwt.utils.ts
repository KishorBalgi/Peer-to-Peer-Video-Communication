import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret";

// Sign JWT:
export const signJWT = (payload: any) => {
  return jwt.sign(payload, secret, { expiresIn: "30d" });
};

// Verify JWT:
export const verifyJWT = (token: string) => {
  return jwt.verify(token, secret);
};
