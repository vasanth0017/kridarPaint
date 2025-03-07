import { AppSidebar } from "@/components/panel/appsidebar";
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import { getServerSession } from 'next-auth'
import  authOptions from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'


export default async function HomePage({ children }: any) {
  const session:any = await getServerSession(authOptions)
  const user = session?.user
  console.log("sessionsession",user.email)
  if (!session) {
    return redirect('/sign-in')
  }
    if (user?.email !== "eswarvasanth17@gmail.com") {
    return (
      <div className="flex items-center justify-center">
        <h1 className="flex items-center justify-center text-4xl w-full h-full">
          This page access only for Management Team
        </h1>
      </div>
    );
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
