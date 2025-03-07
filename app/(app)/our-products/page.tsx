import ProductCatalog from "@/components/our-products/page";
import { getServerSession } from 'next-auth'
import  authOptions from '@/pages/api/auth/[...nextauth]'

export default async function OurProducts() {
  const session = await getServerSession(authOptions)
  console.log("session",session)
  return <ProductCatalog />;
}
