

import { UserProvider } from "@/context/UserContext";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Meal App",
  description: "Food app using context & dynamic routing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800" >
        <UserProvider>
          <Navbar />
         <main className="p-6">{children}</main>
       <Footer/>
        </UserProvider>
      </body>
    </html>
  );
}



