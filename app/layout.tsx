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
      <body className="antialiased flex flex-col min-h-screen bg-white">
        {/* Shows up on desktops/tablets */}
        <Navbar />
        
        {/* Shows up on mobile screens */}
        <NavbarMobile />
        
        <main className="flex-grow relative">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}