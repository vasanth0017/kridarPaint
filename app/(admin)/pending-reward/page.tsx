import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import db from "@/prisma/db";
import PendingRedeems from "@/components/pending-redeem/page";
import { getAllredeem } from "@/services/apicall";

export default async function PendingRedeem() {
  const session = await getServerSession(authOptions);
  let userDetails = null;
  try {
    userDetails = await getAllredeem();
  } catch (error) {
    console.error("Error during fetching contract details:", error);
  }
  return <PendingRedeems userDetails={userDetails}/>;
}
