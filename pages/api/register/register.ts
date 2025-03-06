import db from "@/prisma/db";
import bcrypt from "bcrypt";

const handler = async(req:any, res:any)=> {
  if (req.method !== "POST") return res.status(405).end();
  
  const { email, password, role, name, image } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await db.user.create({
      data: { 
        name, 
        email, 
        password: hashedPassword, 
        role: role || "user", 
        image 
      },
    });
    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ error: "User creation failed" });
  }
}
export default handler;