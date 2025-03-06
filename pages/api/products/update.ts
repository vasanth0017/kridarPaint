// pages/api/freelauncer-services/update-service.ts
import db from "@/prisma/db";

const handler = async (req: any, res: any) => {
  if (req.method !== "PUT") return res.status(405).end();

  const {
    cat_name,
    name,
    amount,
    color,
    description,
    images,
    cat_id,
    prod_id,
  } = req.body;

  // Validate serviceId
  if (!cat_id && !prod_id) {
    return res.status(400).json({ error: "Service ID is required for update" });
  }

  try {
    const updatedService = await db.category.update({
      where: { id: cat_id },
      data: {
        name: cat_name,
      },
    });
    const prod_update = await db.product.update({
      where: { id: prod_id },
      data: {
        name,
        price: parseFloat(amount),
        images,
        description,
        color,
        categoryId: cat_id,
      },
    });

    res.status(200).json(updatedService, prod_update);
  } catch (error) {
    console.error("Service update error:", error);
    res.status(500).json({
      error: "Service update failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export default handler;
