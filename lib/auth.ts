import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

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

// Validate user credentials
export async function validateCredentials(email: string, password: string): Promise<User | null> {
  const user = findUserByEmail(email);

  if (!user) {
    return null;
  }

  // Compare password with hashed password
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

// For development: Get plain text passwords for the demo users
// export const DEMO_CREDENTIALS = {
//   "admin@example.com": "secret123",
//   "user@example.com": "password",
//   "test@test.com": "secret",
// } as const;

export const DEMO_CREDENTIALS = {
  "admin@example.com": "Admin123!", // ✅ Strong password
  "user@example.com": "Password1@", // ✅ Strong password
  "test@test.com": "TestUser9#", // ✅ Strong password
} as const;
