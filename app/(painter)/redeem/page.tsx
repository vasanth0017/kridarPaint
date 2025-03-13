import BasicForm from "@/components/reward-form/form";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import db from "@/prisma/db"; 

export default async function Page() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id
  const user = session?.user?.id
    ? await db.user.findUnique({
        where: { id: session?.user?.id },
      })
    : null;
  const number = user?.phoneNumber
  const name = user?.name
  const email = user?.email
  const city = user?.district
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BasicForm number={number} name={name} email={email} id={id} city={city}/>
    </Suspense>
  );
}
