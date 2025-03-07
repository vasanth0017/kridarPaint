import { Navigation } from "@/components/panel/header";
import { Footer } from "@/components/panel/footer";
import { getServerSession } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation session={session} />
      <main className="flex-grow pt-20 py-8  px-4 md:px-8 lg:px-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
