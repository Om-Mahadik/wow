'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useFooterNavigate } from "@/helper/useFooterNavigate";

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
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
  </svg>
);

const WhatsappIcon = () => (
  <svg
    className="w-[22px] h-[22px] fill-current"
    viewBox="0 0 24 24"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export default function Footer() {
  const navigateTo = useFooterNavigate();

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
          <button 
            onClick={() => navigateTo("/book")}
            className="mb-12 px-8 py-3 rounded-full bg-white text-black font-semibold tracking-wide text-sm hover:bg-zinc-200 transition-colors duration-300 shadow-sm cursor-pointer"
          >
            Book Now
          </button>

          {/* Quick Links / Social Icons Panel (Icons Only) */}
          <div className="flex flex-col items-center gap-4 mb-20">
            <span className="text-zinc-600 font-semibold tracking-widest text-xs uppercase">Quick Links</span>
            <div className="flex items-center gap-7 text-zinc-400">
              <a 
                href="https://instagram.com/wind.over.waters" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors p-1" 
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a 
                href="https://wa.me/917387041204" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors p-1" 
                aria-label="WhatsApp"
              >
                <WhatsappIcon />
              </a>
              <a 
                href="mailto:enquiry@windoverwaters.com" 
                className="hover:text-white transition-colors p-1" 
                aria-label="Email Us"
              >
                <Mail className="w-[22px] h-[22px] stroke-[1.5]" />
              </a>
            </div>
          </div>

          {/* Columns Grid System */}
          <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-6 md:gap-4 items-start mb-24">
            
            {/* Left Column: Explore Directory */}
            <div className="md:col-span-1 flex flex-col gap-4 text-left md:pl-8">
              <h3 className="text-zinc-600 font-medium tracking-wide text-xs uppercase">Explore</h3>
              <ul className="flex flex-col gap-2.5 text-zinc-200 font-normal text-sm">
                <li><button onClick={() => navigateTo("/")} className="hover:text-white transition-colors text-left cursor-pointer">Home</button></li>
                <li><button onClick={() => navigateTo("/cabin", "amenities")} className="hover:text-white transition-colors text-left cursor-pointer">Amenities</button></li>
                <li><button onClick={() => navigateTo("/gallery")} className="hover:text-white transition-colors text-left cursor-pointer">Gallery</button></li>
                <li><button onClick={() => navigateTo("/cabin", "reviews")} className="hover:text-white transition-colors text-left cursor-pointer">Reviews</button></li>
                <li><button onClick={() => navigateTo("/cabin", "location")} className="hover:text-white transition-colors text-left cursor-pointer">Location</button></li>
              </ul>
            </div>

            {/* Middle-Left Column: Guest Support Directory */}
            <div className="md:col-span-1 flex flex-col gap-4 text-left">
              <h3 className="text-zinc-600 font-medium tracking-wide text-xs uppercase">Guest Support</h3>
              <ul className="flex flex-col gap-2.5 text-zinc-200 font-normal text-sm">
                <li><button onClick={() => navigateTo("/cabin")} className="hover:text-white transition-colors text-left cursor-pointer">Book a Stay</button></li>
                <li><button onClick={() => navigateTo("/faqs")} className="hover:text-white transition-colors text-left cursor-pointer">FAQs</button></li>
                <li><button onClick={() => navigateTo("/cancellation")} className="hover:text-white transition-colors text-left cursor-pointer">Cancellation</button></li>
                <li><button onClick={() => navigateTo("/cabin", "rules")} className="hover:text-white transition-colors text-left cursor-pointer">Rules & Regulations</button></li>
                <li><button onClick={() => navigateTo("/contact")} className="hover:text-white transition-colors text-left cursor-pointer">Contact Us</button></li>
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
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-transparent flex items-center justify-center text-zinc-900 hover:opacity-60 transition-opacity cursor-pointer"
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
              <button onClick={() => navigateTo("/legal/privacy")} className="hover:text-zinc-400 transition-colors cursor-pointer">Privacy Policy</button>
              <button onClick={() => navigateTo("/legal/terms")} className="hover:text-zinc-400 transition-colors cursor-pointer">Terms of Service</button>
            </div>
            {/* Spec-Defined Corporate Architectural Credit Line */}
            <div className="tracking-wide text-zinc-500">
              cabins by <a href="https://www.thecoon.co/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-300 underline underline-offset-4 transition-colors">The Coon Co.</a>
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