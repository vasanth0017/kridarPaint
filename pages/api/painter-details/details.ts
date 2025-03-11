import db from "@/prisma/db";

const handler = async (req: any, res: any) => {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const user = await db.user.findMany({
      include: {
        redeem: true,
        totalredeem: true,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Account details fetch failed" });
  }
};

export default handler;
