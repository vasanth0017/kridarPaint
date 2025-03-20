import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Toaster } from "sonner";
import { UserProvider } from "@/context/painter-context";

const satoshiFont = localFont({
  src: [
    {
      path: "../public/font/Satoshi-Medium.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/Satoshi-Medium.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Kridar Paints - Eco-Friendly Natural Paints for a Healthier Home",
  description:
    "Discover Kridar Paints, the ultimate choice for eco-friendly, toxin-free, and natural wall paints. Enhance your home with safe, sustainable, and vibrant colors.",
  keywords: [
    "natural paints",
    "eco-friendly paints",
    "toxin-free wall paints",
    "sustainable home decor",
    "organic wall coatings",
    "healthy home painting",
    "zero VOC paints",
    "Kridar Paints",
  ],
  openGraph: {
    title: "Kridar Paints - Eco-Friendly Natural Paints for a Healthier Home",
    description:
      "Upgrade your walls with Kridar Paints, crafted from natural ingredients for a safer and more sustainable home environment.",
    url: "https://kridar-paints.vercel.app/", // Replace with actual URL
    type: "website",
    // images: [
    //   {
    //     url: "https://yourwebsite.com/og-image.jpg", // Replace with actual image URL
    //     width: 1200,
    //     height: 630,
    //     alt: "Kridar Paints - Natural and Eco-Friendly Paints",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kridar Paints - Eco-Friendly Natural Paints",
    description:
      "Breathe fresh with Kridar Paints! Our natural, toxin-free paints bring beauty and health to your home.",
    // images: ["https://yourwebsite.com/twitter-image.jpg"], // Replace with actual image URL
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={satoshiFont.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>{children}</UserProvider>

          <Toaster
            position="top-center"
            swipeDirections={["bottom"]}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
