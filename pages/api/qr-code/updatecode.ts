import db from "@/prisma/db";

const handler = async (req: any, res: any) => {
  if (req.method !== "PUT")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    if (!req.body || !req.body.code) {
      return res
        .status(400)
        .json({ message: "Invalid request: QR Code is required" });
    }

    const { code } = req.body;
    console.log("Received QR Code:", code);

    const qrCode = await db.qRCode.update({
      where: { code },
      data: { used: true },
    });

    return res
      .status(200)
      .json({ qrCode, url: `http://localhost:3000/testform?code={}` });
  } catch (error) {
    console.error("Error updating QR Code:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default handler;
