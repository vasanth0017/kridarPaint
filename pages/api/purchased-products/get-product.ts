import db from "@/prisma/db";

const handler = async (req: any, res: any) => {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const prod = await db.purchasedProduct.findMany({}); // Fetch all services
    res.status(200).json(prod);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Service details fetch failed" });
  }
};

export default handler;
