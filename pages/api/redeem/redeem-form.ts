import db from "@/prisma/db";

const handler = async (req: any, res: any) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { userId, name, phoneNumber, amount, prod_code, date, city, count } = req.body;

  if (!userId || !phoneNumber) {
    return res.status(400).json({ message: "userId or phoneNumber is missing" });
  }

  try {
    // Check if the number is already
    const existingRedeem = await db.redeem.findFirst({
      where: { phonenumber: phoneNumber },
    });

    let redeem;
    if (existingRedeem) {
      redeem = await db.redeem.update({
        where: { id: existingRedeem.id },
        data: {
          amount: existingRedeem.amount + Number(amount),
        },
      });
    } else {
      redeem = await db.redeem.create({
        data: {
          name: name,
          phonenumber: phoneNumber,
          userId: userId,
          amount: Number(amount),
        },
      });
    }

    // Handle total_redeem 
    const totalRedeem = await db.totalreedem.findFirst({
      where: { userId: userId },
    });

    let updatedTotalRedeem;
    if (totalRedeem) {
      updatedTotalRedeem = await db.totalreedem.update({
        where: { id: totalRedeem.id },
        data: {
          amount: totalRedeem.amount + Number(amount),
        },
      });
    } else {
      updatedTotalRedeem = await db.totalreedem.create({
        data: {
          amount: Number(amount),
          name: name,
          userId: userId,
        },
      });
    }
    //store purchased item
    const existingData = await db.purchasedProduct.findFirst({
      where: { 
        name: prod_code,
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
          name: prod_code,
          date: date,
          city: city,
          count: Number(count),
        },
      });
    }
    res.status(200).json({ redeem, updatedTotalRedeem });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
