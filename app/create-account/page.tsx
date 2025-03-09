import ProfilePage from "@/components/create-account/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import db from "@/prisma/db";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.id
    ? await db.user.findUnique({
        where: { id: session?.user?.id },
      })
    : null;
  const number = user?.phoneNumber;
  if (number && number.length > 0) {
    return redirect("/");
  }

  return (
    <>
      <ProfilePage session={session} />
    </>
  );
}
