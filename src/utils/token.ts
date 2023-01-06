import { sign, verify } from "jsonwebtoken"

interface TokenResponse {
  userId: string | number;
  role: string;
}

export const generateToken = (data: TokenResponse, expiresIn: string | number = "7d") => {
  if(typeof data === "object") {
    return sign({ ...data }, process.env.JWT_SECRET as string, { expiresIn })
  }
  return sign({ data }, process.env.JWT_SECRET as string, { expiresIn })
}

export const verifyToken = (token: string) => verify(token, process.env.JWT_SECRET as string) as TokenResponse