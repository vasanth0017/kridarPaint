import db from "@/prisma/db";

const handler = async (req: any, res: any) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { name, date, city, count } = req.body;

  if (!name || !city) {
    return res.status(400).json({ message: "name or city is missing" });
  }

  try {
    // Check if the number is already
    const existingData = await db.purchasedProduct.findFirst({
      where: { 
        name: name,
        city:city,
        date:date
       },
    });

    let data;
    if (existingData) {
      data = await db.purchasedProduct.update({
        where: { id: existingData.id },
        data: {
          count: existingData.count + Number(count),
        },
      });
    } else {
      data = await db.purchasedProduct.create({
        data: {
          name: name,
          date: date,
          city: city,
          count: Number(count),
        },
      });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
