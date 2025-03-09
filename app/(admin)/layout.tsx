import { AppSidebar } from "@/components/panel/appsidebar";
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import { getServerSession } from 'next-auth'
import  {authOptions} from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'
import { getAccountDetails } from "@/services/apicall";
 

export default async function HomePage({ children }: any) {
  const session:any = await getServerSession(authOptions)
  const user = session?.user
  const userId = user?.id
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
    return redirect('/sign-in')
  }
  //   if (userDetails?.role !== "admin") {
  //   return (
  //     <div className="flex items-center justify-center">
  //       <h1 className="flex items-center justify-center text-4xl w-full h-full">
  //         This page access only for Management Team
  //       </h1>
  //     </div>
  //   );
  // }
  return (
    <>
      <SidebarProvider>
        <AppSidebar session={userDetails} />
              {children}
      </SidebarProvider>
    </>
  );
}
