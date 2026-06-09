import { Request, Response } from "express";
import { registerUser, findUserByEmail, saveRefreshToken, findUserById, findRefreshToken, deleteRefreshToken } from "../services/auth.service";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwt";
import { AuthRequest } from "../middleware/auth.middleware";


export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      email,
      password
    } = req.body;
    
    if (
      !name ||
      !email ||
      !password
    ) {
      res.status(400).json({
        success: false,
        message: "Missing required fields"
      });

      return;
    }
    const existingUser = await findUserByEmail(
      email
    );

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "Email already exists"
      });

      return;
    }
    const user = await registerUser(
      name,
      email,
      password
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to register user"
    });
  }
};


export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password required",
      });

      return;
    }

    const user = await findUserByEmail(email);

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

      return;
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

      return;
    }

    const accessToken = generateAccessToken(
      user.id,
      user.uuid
    );

    const refreshToken = generateRefreshToken(
        user.id,
        user.uuid
    );

    await saveRefreshToken(
        user.id,
        refreshToken
    );

    res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

export const logout = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { refreshToken } = req.body;

    await deleteRefreshToken(
      refreshToken
    );

    res.status(200).json({
      success: true,
      message: "Logged out"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Logout failed"
    });

  }

};

export const me = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {

    const user = await findUserById(
      req.user!.userId
    );

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to get user"
    });

  }
};

export const refresh = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({
        success: false,
        message: "Refresh token required"
      });
      return;
    }

    const storedToken =
      await findRefreshToken(
        refreshToken
      );

    if (!storedToken) {
      res.status(401).json({
        success: false,
        message: "Invalid refresh token"
      });
      return;
    }

    const payload =
      verifyToken(refreshToken);

    const accessToken =
      generateAccessToken(
        payload.userId,
        payload.uuid
      );

    res.status(200).json({
      success: true,
      accessToken
    });

  } catch (error) {

    res.status(401).json({
      success: false,
      message: "Invalid refresh token"
    });

  }

};