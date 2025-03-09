import { AppSidebar } from "@/components/panel/appsidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { getAccountDetails } from "@/services/apicall";

export default async function HomePage({ children }: any) {
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
  if (!session) {
    return redirect("/sign-in");
  }
  if (session && userDetails?.role !== "Painter") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            Sorry, this page is only accessible to <b>painters</b>. If you
            believe this is a mistake, please contact support.
          </p>
        </div>
      </div>
    );
  }

  if (!userDetails?.phoneNumber?.length) {
    return redirect("/create-account");
  }
  return (
    <>
      <SidebarProvider>
        <AppSidebar session={session} />
        {children}
      </SidebarProvider>
    </>
  );
}
