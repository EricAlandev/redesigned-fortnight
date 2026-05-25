import './global.css'
import type { Metadata } from "next";
import { GlobalProvider } from "@/lib/GlobalContext";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "CrPet",
  description: "website for pet services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}