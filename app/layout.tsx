import Navbar from "@/components/layout/Navbar";
import NavbarMobile from "@/components/layout/NavbarMobile";
import MobileQuickActions from "@/components/layout/MobileQuickActions";
import Footer from "@/components/layout/Footer";
import "./globals.css";

import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="m-0 p-0 overflow-x-hidden">
      <body className="antialiased min-h-screen bg-white text-zinc-950 flex flex-col m-0 p-0 w-full overflow-x-hidden">
        {/* Floating Navbars */}
        <Navbar />
        <NavbarMobile />

        {/* Providers wraps the main page content */}
        <Providers>
          <main className="flex-grow w-full relative m-0 p-0 overflow-x-hidden">
            {children}
          </main>
        </Providers>

        {/* Mobile Floating Contact Drawer */}
        <MobileQuickActions />

        <Footer />
      </body>
    </html>
  );
}