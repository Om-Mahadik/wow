"use client";

import { motion } from "framer-motion";

export default function ContactFAQ() {
  const faqs = [
    { q: "What are the check-in and check-out times?", a: "Check-in begins at 2:00 PM IST, and check-out is by 11:00 AM IST." },
    { q: "Is network connectivity available on site?", a: "Mobile networks generally work well, though speeds can fluctuate depending on weather conditions given our lakeside glamping environment." },
    { q: "How do I reach the property from Pune or Mumbai?", a: "We are roughly 62 km from Pune (~1.5 hrs) and 155 km from Mumbai (~3.5 hrs). Detailed route cards and map navigation links are provided above." },
  ];

  return (
    <div className="w-full bg-white select-none py-10">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 lg:px-16 flex flex-col space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/60 flex flex-col space-y-2"
            >
              <h3 className="text-sm font-semibold text-zinc-900">{faq.q}</h3>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}