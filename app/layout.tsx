import Navbar from "@/components/layout/Navbar";
import NavbarMobile from "@/components/layout/NavbarMobile";
import MobileQuickActions from "@/components/layout/MobileQuickActions"; // Import your new component
import Footer from "@/components/layout/Footer";
import "./globals.css";

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
        
        {/* Mobile Floating Contact Drawer */}
        <MobileQuickActions />
        
        {/* Main Content Container - 100% Edge-to-Edge */}
        <main className="flex-grow w-full relative m-0 p-0 overflow-x-hidden">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}