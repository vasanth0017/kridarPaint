import Admin from "@/components/dashboard/admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getAccountDetails } from "@/services/apicall";
import PainterDash from "@/components/painter-dashboard/page";
import PlaceholderContent from "@/components/demo/placeholder-content";

export default async function page() {
  const session: any = await getServerSession(authOptions);
  const user = session?.user;
  const userId = user?.id;
  let userDetails: any = null;
  try {
    if (userId) {
      const response = await getAccountDetails(userId);
      userDetails = response?.[0] || null;
    }
  } catch (error) {
    console.error("Error during fetching contract details:", error);
  }
  return (
    <>
      {userDetails?.role === "Painter" ? (
        <PainterDash userDetails={userDetails} />
      ) : userDetails?.role === "admin" ? (
        <Admin />
      ) : (
        <PlaceholderContent />
      )}
    </>
  );
}
