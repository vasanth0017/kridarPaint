import db from "@/prisma/db";



const handler = async(req:any, res:any) => {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  const { code } = req.query;


  try {
    const messages = await db.qRCode.findMany({
      where: { code: code },
      orderBy: { createdAt: "asc" },
    });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching messages" });
  }
}
export default handler;