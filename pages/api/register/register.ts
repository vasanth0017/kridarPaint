import db from "@/prisma/db";
import bcrypt from "bcrypt";

const handler = async (req: any, res: any) => {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password, role, name, image } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.password) {
        return res.status(400).json({ error: "User already exists with a password" });
      }

      // If the user exists but has no password, update their account
      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedUser = await db.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      return res.status(200).json(updatedUser);
    }

    // If the user doesn't exist, create a new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: { 
        name, 
        email, 
        password: hashedPassword, 
        role: role || "user", 
        image 
      },
    });

    return res.status(201).json(newUser);

  } catch (error) {
    console.error("User registration error:", error);
    return res.status(500).json({ error: "User creation failed" });
  }
};

export default handler;
