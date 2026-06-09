import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: number;
  uuid: string;
}

export const generateAccessToken = (
  userId: number,
  uuid: string
): string => {
  return jwt.sign(
    { userId, uuid },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (
  userId: number,
  uuid: string
): string => {
  return jwt.sign(
    { userId, uuid },
    process.env.JWT_SECRET as string,
    { expiresIn: "30d" }
  );
};

export const verifyToken = (
  token: string
): JwtPayload => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtPayload;
};