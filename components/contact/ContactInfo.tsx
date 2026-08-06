"use client";

import { motion } from "framer-motion";

export default function ContactInfo() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const cards = [
    {
      title: "Phone & WhatsApp",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
      sub: "Available 9:00 AM – 8:00 PM IST",
    },
    {
      title: "Email Inquiries",
      value: "stay@windoverwaters.com",
      href: "mailto:stay@windoverwaters.com",
      sub: "Responses within a few hours",
    },
    {
      title: "Location",
      value: "Mulshi Lake, Maharashtra",
      href: "https://maps.app.goo.gl/2VgWzuaBRBH4hq8n8",
      sub: "Wind Over Waters — Glamping",
    },
  ];

  return (
    <div className="w-full bg-white select-none py-6">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, idx) => (
            <motion.a
              key={idx}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: smoothEase }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/60 transition-all duration-300 group shadow-2xs hover:-translate-y-0.5"
            >
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-600 transition-colors">
                {card.title}
              </span>
              <div className="my-3">
                <span className="text-xl font-bold tracking-tight text-zinc-900 group-hover:text-black transition-colors">
                  {card.value}
                </span>
                <p className="text-xs text-zinc-400 font-light mt-1">{card.sub}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}