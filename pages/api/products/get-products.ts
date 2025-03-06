import db from "@/prisma/db";

const handler = async (req: any, res: any) => {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const user = await db.category.findMany({
      include: { products: true },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Service details fetch failed" });
  }
};
export default handler;
