import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navigation } from "@/components/panel/header";
import { Footer } from "@/components/panel/footer";
import { getServerSession } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";

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
          <div className="min-h-screen flex flex-col">
            <Navigation session={session} />
            <main className="flex-grow pt-20 py-8  px-4 md:px-8 lg:px-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
