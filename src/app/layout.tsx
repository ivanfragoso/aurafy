import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/context/Provider";
import Header from "@/components/Header";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Aurafy",
  description: "Get your Aura based on your Spotify activity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <Provider>
          <Header></Header>
          <main className="h-screen">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
