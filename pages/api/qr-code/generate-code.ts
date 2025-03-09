import db from "@/prisma/db";
import { v4 as uuidv4 } from "uuid";

const qrUrl = process.env.NEXT_PUBLIC_URL;

const handler = async (req: any, res: any) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });
  const uniqueId = uuidv4();
  // Store in database
  const qrCode = await db.qRCode.create({
    data: { code: uniqueId, used: false },
  });

  res
    .status(200)
    .json({ qrCode, url: `${qrUrl}/redeem?code=${uniqueId}` });
};
export default handler;
