import { db } from "../lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
      include: {
        personal: true,
      },
    });
    return user;
  } catch {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch {
    return null;
  }
};
export const getUserFromDb = async (email: string, password: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email, password },
    });
    return user;
  } catch {
    return null;
  }
};
