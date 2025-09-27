import bcrypt from "bcryptjs";
import fs from "fs";
import { cookies } from "next/headers";
import path from "path";
import { decryptSession } from "./session";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

interface UsersData {
  users: User[];
}

// Get users from JSON file
function getUsers(): User[] {
  try {
    const usersPath = path.join(process.cwd(), "data", "users.json");
    const usersData = fs.readFileSync(usersPath, "utf8");
    const { users }: UsersData = JSON.parse(usersData);
    return users;
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
}

// Find user by email
export function findUserByEmail(email: string): User | null {
  const users = getUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null;
}

// Find user by ID
export function findUserById(id: string): User | null {
  const users = getUsers();
  return users.find((user) => user.id === id) || null;
}

// Validate user credentials
export async function validateCredentials(email: string, password: string): Promise<User | null> {
  const user = findUserByEmail(email);

  if (!user) {
    return null;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return null;
  }

  // Return user without password for security
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
}

// Hash password (utility for creating new users)
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// Get current authenticated user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;

    if (!cookie) {
      return null;
    }

    const session = await decryptSession(cookie);

    if (!session?.userId) {
      return null;
    }

    // Find the full user object using the userId from session
    const user = findUserById(session.userId as string);

    if (!user) {
      return null;
    }

    // Return user without password for security
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return null;
  }
}

// For development: Strong passwords that meet the new requirements
export const DEMO_CREDENTIALS = {
  "admin@example.com": "Admin123!", // ✅ Strong password
  "user@example.com": "Password1@", // ✅ Strong password
  "test@test.com": "TestUser9#", // ✅ Strong password
} as const;
