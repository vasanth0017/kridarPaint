import { Navigation } from "@/components/panel/header";
import { Footer } from "@/components/panel/footer";
import { getServerSession } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return <>{children}</>;
}
