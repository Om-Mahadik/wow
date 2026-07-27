import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" y2="6.5" />
  </svg>
);

const WhatsappIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9 10 15" />
  </svg>
);

const PinterestIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 22c.4-2.8.8-5.4 1.2-8.2-.5-.8-.7-1.9-.7-3 0-2.8 1.6-4.9 3.6-4.9 1 0 1.9.4 2.5 1.1.7.7.9 1.7.8 2.7-.3 2.5-1.1 6.1-1.1 7.2 0 1 .7 1.8 1.7 1.8 3.1 0 5.2-3.9 5.2-8.5 0-4-2.7-7-7.6-7C8.6 1.2 5.5 5 5.5 9.4c0 1.5.4 2.6 1.2 3.5-.2.4-.4.5-.6.1-.7-1.1-1.1-2.6-1.1-4.7 0-5.8 4.9-10.3 11.2-10.3 5.9 0 9.8 4.2 9.8 9.3 0 6-3.3 10.9-8.2 10.9-1.6 0-3.1-.9-3.6-1.9-.6 2.4-1.3 5-1.9 7.6-.2.8-.7 1.8-1.1 2.4z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative w-full bg-black mt-28 rounded-t-[40px] md:rounded-t-[60px]">
      <div className="w-full pt-24 pb-12 px-6 md:px-16 flex flex-col items-center">
        
        {/* Seamless Circular Brand Logo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden bg-black">
          <Image
            src="/brand/colour-logo.jpeg"
            alt="Wind Over Waters Logo"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Constraints */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Main Hook Description */}
          <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed text-center max-w-lg mb-6 tracking-wide">
            Ready to disconnect? Wind Over Waters is waiting.
          </p>

          {/* Premium Action Button */}
          <Link 
            href="/book" 
            className="mb-12 px-8 py-3 rounded-full bg-white text-black font-semibold tracking-wide text-sm hover:bg-zinc-200 transition-colors duration-300 shadow-sm"
          >
            Book Now
          </Link>

          {/* Quick Links / Social Links Panel */}
          <div className="flex flex-col items-center gap-3 mb-20">
            <span className="text-zinc-600 font-semibold tracking-widest text-xs uppercase">Quick Links</span>
            <div className="flex items-center gap-6 text-zinc-500">
              <Link href="#" className="hover:text-zinc-200 transition-colors flex items-center gap-2" aria-label="Instagram">
                <InstagramIcon />
                <span className="text-xs tracking-wider hidden sm:inline">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-zinc-200 transition-colors flex items-center gap-2" aria-label="Contact via WhatsApp">
                <WhatsappIcon />
                <span className="text-xs tracking-wider hidden sm:inline">Contact WhatsApp</span>
              </Link>
              <Link href="#" className="hover:text-zinc-200 transition-colors" aria-label="YouTube">
                <YoutubeIcon />
              </Link>
              <Link href="#" className="hover:text-zinc-200 transition-colors" aria-label="Pinterest">
                <PinterestIcon />
              </Link>
            </div>
          </div>

          {/* Columns Grid System */}
          <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-6 md:gap-4 items-start mb-24">
            
            {/* Left Column: Explore Directory */}
            <div className="md:col-span-1 flex flex-col gap-4 text-left md:pl-8">
              <h3 className="text-zinc-600 font-medium tracking-wide text-xs uppercase">Explore</h3>
              <ul className="flex flex-col gap-2.5 text-zinc-200 font-normal text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/amenities" className="hover:text-white transition-colors">Amenities</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                <li><Link href="/experience" className="hover:text-white transition-colors">Experience</Link></li>
                <li><Link href="/location" className="hover:text-white transition-colors">Location</Link></li>
              </ul>
            </div>

            {/* Middle-Left Column: Guest Support Directory */}
            <div className="md:col-span-1 flex flex-col gap-4 text-left">
              <h3 className="text-zinc-600 font-medium tracking-wide text-xs uppercase">Guest Support</h3>
              <ul className="flex flex-col gap-2.5 text-zinc-200 font-normal text-sm">
                <li><Link href="/book" className="hover:text-white transition-colors">Book a Stay</Link></li>
                <li><Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
                <li><Link href="/cancellation" className="hover:text-white transition-colors">Cancellation</Link></li>
                <li><Link href="/rules" className="hover:text-white transition-colors">Rules & Regulations</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Structural Column Divider Line */}
            <div className="hidden md:flex md:col-span-1 justify-center items-center h-full py-2">
              <div className="w-[1px] h-32 bg-zinc-800/60" />
            </div>

            {/* Right Side Columns: Newsletter Dynamic Module */}
            <div className="col-span-2 md:col-span-2 flex flex-col items-center md:items-start gap-4 md:pr-8 mt-4 md:mt-0">
              <h3 className="text-zinc-200 font-medium tracking-wide text-sm text-center md:text-left w-full">
                Get Off the Grid
              </h3>
              <div className="relative w-full max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full h-11 pl-5 pr-12 rounded-full bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none text-xs font-normal tracking-wide"
                />
                <button 
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-transparent flex items-center justify-center text-zinc-900 hover:opacity-60 transition-opacity"
                  aria-label="Submit newsletter"
                >
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>

          {/* Legal Policies & Product Credit Anchor Links */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-zinc-900 pt-8 mb-8 text-zinc-600 text-xs font-normal px-2">
            <div className="flex gap-8">
              <Link href="/legal/privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
              <Link href="/legal/terms" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
            </div>
            {/* Spec-Defined Corporate Architectural Credit Line */}
            <div className="tracking-wide text-zinc-500">
              cabins by <a href="https://thecoonco.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-300 underline underline-offset-4 transition-colors">The Coon Co.</a>
            </div>
          </div>

          {/* Bottom Copyright Standard Mark */}
          <div className="text-zinc-600 text-[10px] tracking-widest text-center font-normal uppercase">
            © 2026 Winds Over Waters, All Rights Reserved
          </div>

        </div>
      </div>
    </footer>
  );
}