import Admin from "@/components/dashboard/admin";
import { getServerSession } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";

export default async function page() {
  const session = await getServerSession(authOptions);
  //   if (session !== "admin") {
  //     return (
  //       <div className="flex items-center justify-center">
  //         <h1 className="flex items-center justify-center text-4xl w-full h-full">
  //           This page access only for Management Team
  //         </h1>
  //       </div>
  //     );
  //   }
  return <Admin />;
}
