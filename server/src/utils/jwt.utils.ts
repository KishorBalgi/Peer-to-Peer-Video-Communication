import jwt, { JwtPayload } from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret";

// Sign JWT:
export const signJWT = (payload: any) => {
  return jwt.sign(payload, secret, { expiresIn: "30d" });
};

// Verify JWT:
export const verifyJWT = (token: string): string | JwtPayload => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};
