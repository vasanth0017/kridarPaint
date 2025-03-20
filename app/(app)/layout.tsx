import { Navigation } from "@/components/panel/header";
import { Footer } from "@/components/panel/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getAccountDetails } from "@/services/apicall";
import { ThemeProvider } from "@/components/theme/theme-provider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
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
  const totalAmount =
    userDetails?.totalredeem?.reduce(
      (sum: any, item: any) => sum + item.amount,
      0
    ) || 0;
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation
        session={session}
        amount={totalAmount}
        role={userDetails?.role}
      />
      <main className="flex-grow pt-16">
          {children}
      </main>
      <Footer />
    </div>
  );
}
