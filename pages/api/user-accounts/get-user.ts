import db from "@/prisma/db";

const handler = async (req: any, res: any) => {
  if (req.method !== "GET") return res.status(405).end();
  const id = req.query.id as string;
  if (!id) {
    return res.status(404).json({ message: "id not found" });
  }

  try {
    const user = await db.user.findMany({
      where: { id: id },
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
