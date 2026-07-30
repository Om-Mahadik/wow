import Navbar from "@/components/layout/Navbar";
import NavbarMobile from "@/components/layout/NavbarMobile";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-white text-zinc-950 flex flex-col">
        {/* Navbars float cleanly on top of the content layers */}
        <Navbar />
        <NavbarMobile />
        
        {/* Main content takes full screen and lets hero flow underneath navbars */}
        <main className="flex-grow w-full relative">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}