import db from "@/prisma/db";
import { use } from "react";

const handler = async (req: any, res: any) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });
  const { userId, name, phoneNumber, amount } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId is missing" });
  }
  try {
    // Store in database
    const redeem = await db.redeem.create({
      data: {
        name: name,
        phonenumber: phoneNumber,
        userId: userId,
        amount: Number(amount),
      },
    });

    const total_redeem = await db.totalreedem.create({
      data: {
        amount: Number(amount),
        name: name,
        userId: userId,
      },
    });
    res.status(200).json({ redeem, total_redeem });
  } catch (error) {
    console.error(error);
  }
};
export default handler;
