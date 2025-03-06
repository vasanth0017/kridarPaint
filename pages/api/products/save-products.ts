import db from "@/prisma/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { cat_name, name, amount, color, description, images } = req.body;

    if (!cat_name || !name || !amount || !color || !description || !images) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let category = await db.category.findUnique({
      where: { name: cat_name },
    });

    if (!category) {
      category = await db.category.create({
        data: { name: cat_name },
      });
    }

    const product = await db.product.create({
      data: {
        name,
        price: parseFloat(amount),
        images,
        description,
        color,
        categoryId: category.id,
      },
    });

    return res.status(201).json({ category, product });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to create product" });
  }
};

export default handler;
