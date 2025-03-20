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
  title: "Kridar Paints",
  description: "Natural paints for your home",
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
          defaultTheme="system"
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
