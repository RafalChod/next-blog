import type { Metadata } from "next";
import "./globals.css";
import { TopNavigation } from "@/components/navigation";
import { pixelify } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pixelify.variable}`}>
      <body
        className={`antialiased`}
      ><TopNavigation />
        {children}
        <div className="bg-gray-100 h-[10vh] text-center text-[40px]">footer</div>
      </body>
    </html>
  );
}
