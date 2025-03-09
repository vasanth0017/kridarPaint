import db from "@/prisma/db";

const handler = async (req: any, res: any) => {
  const  {id}  = req.body;
  try {
    const redeem = await db.redeem.deleteMany({
      where: {id:id},
    });
    res.status(201).json(redeem);

  } catch (error) {
    res.status(500).json({ error: "Service details fetch failed" });
  }
  finally {
    await db.$disconnect();
  }
};
export default handler;
