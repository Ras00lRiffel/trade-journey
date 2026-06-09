import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import pool from "../config/db";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const passwordHash = await bcrypt.hash(password, 10);

  const uuid = uuidv4();

  const [result] = await pool.execute(
    `
    INSERT INTO users (
      uuid,
      name,
      email,
      password_hash
    )
    VALUES (?, ?, ?, ?)
    `,
    [
      uuid,
      name,
      email,
      passwordHash
    ]
  );

  return {
    uuid,
    result
  };
};

export const findUserByEmail = async (
  email: string
) => {
  const [rows] = await pool.execute(
    `
    SELECT *
    FROM users
    WHERE email = ?
    LIMIT 1
    `,
    [email]
  );

  return (rows as any[])[0];
};

export const loginUser = async (
  email: string
) => {
  const [rows] = await pool.execute(
    `
    SELECT *
    FROM users
    WHERE email = ?
    LIMIT 1
    `,
    [email]
  );

  return (rows as any[])[0];
};

export const findUserById = async (
  id: number
) => {
  const [rows] = await pool.execute(
    `
    SELECT id, uuid, name, email
    FROM users
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  return (rows as any[])[0];
};

export const saveRefreshToken = async (
  userId: number,
  token: string
) => {
  await pool.execute(
    `
    INSERT INTO refresh_tokens (
      user_id,
      token,
      expires_at
    )
    VALUES (
      ?,
      ?,
      DATE_ADD(NOW(), INTERVAL 30 DAY)
    )
    `,
    [userId, token]
  );
};

export const findRefreshToken = async (
  token: string
) => {
  const [rows] = await pool.execute(
    `
    SELECT *
    FROM refresh_tokens
    WHERE token = ?
    LIMIT 1
    `,
    [token]
  );

  return (rows as any[])[0];
};

export const deleteRefreshToken = async (
  token: string
) => {
  await pool.execute(
    `
    DELETE FROM refresh_tokens
    WHERE token = ?
    `,
    [token]
  );
}; 