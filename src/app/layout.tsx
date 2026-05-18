import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GiClothes } from "react-icons/gi";
import Navbar from "./_component/Navbar";
import { LoadingProvider } from "@src/Context/Loading";
import Useprovider from "@src/Useprovider";
import { Toaster } from "sonner";
import { CountProvider } from "@src/Context/Count";
import { CartCountProvider } from "@src/Context/CountCart";
import { OrderContextProvider } from "@src/Context/Order";
import { AddAdress, AddAdressProvider } from "@src/Context/AddAddress";
import { LogoutContextProvider } from "@src/Context/LogoutContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Benshty",
  icons: {
    icon: [
      { url: "/shopping-bag_218635.png", type: "image/png" }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <LoadingProvider>
        <AddAdressProvider>
          <LogoutContextProvider>

        <Useprovider>
        <CountProvider>
        <CartCountProvider>
        <OrderContextProvider>

        <Navbar/>        
        <div className="pt-2">
          {children}
        </div>
        </OrderContextProvider>
        <Toaster/>
        </CartCountProvider>
        </CountProvider>
        </Useprovider>
          </LogoutContextProvider>

        </AddAdressProvider>
      </LoadingProvider>
        </body>
    </html>
  );
}
