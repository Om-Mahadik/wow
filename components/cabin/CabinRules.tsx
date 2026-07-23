"use client";

import { motion } from "framer-motion";

export default function CabinRules() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const rules = [
    {
      num: "1",
      text: "Keep noise to a minimum between 10:00 PM and 7:00 AM.",
    },
    {
      num: "2",
      text: "Turn off the AC, lights, and geyser when leaving your cabin.",
    },
    {
      num: "3",
      text: "Only registered guests are allowed overnight and please treat the space with care.",
    },
  ];

  const containerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: smoothEase } },
  };

  return (
    <div className="w-full flex justify-center bg-white select-none pt-12 pb-24">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full md:max-w-[80vw] px-4 md:px-0"
      >
        {/* Split Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT SIDE PANEL - Title Only */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <div className="overflow-hidden py-0.5">
              <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight text-zinc-900">
                Rules & Ethics
              </motion.h2>
            </div>
          </div>

          {/* RIGHT SIDE PANEL - Clean List */}
          <div className="lg:col-span-7 flex flex-col space-y-8 w-full pt-4 lg:pt-2">
            {rules.map((rule, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-center gap-6 group"
              >
                {/* Large Soft Numeric Circle Badge */}
                <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 font-medium text-lg shrink-0 transition-colors duration-300 group-hover:bg-zinc-900 group-hover:text-white">
                  {rule.num}
                </div>
                
                {/* Rule Description Text */}
                <p className="text-base md:text-lg text-zinc-600 font-normal leading-relaxed tracking-wide group-hover:text-zinc-950 transition-colors duration-300 max-w-xl">
                  {rule.text}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </div>
  );
}