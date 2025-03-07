import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";

export default async function Page({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  console.log("session",session)
  return <>{children}</>;
}
