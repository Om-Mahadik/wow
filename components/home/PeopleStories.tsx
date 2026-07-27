'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

const STORIES = [
  {
    id: 1,
    imageSrc: '/images/stories/story-1.png',
    cardOverlayText: "Real connections, unique stories.",
    quote: "Heavy bags, big smiles, and zero regrets. There's a distinct feeling of excitement when you leave the main road behind and walk up the trail toward your cabin. It's the exact moment you realize you're finally off the grid.",
    author: 'sahil_escapes',
    likes: '1,242'
  },
  {
    id: 2,
    imageSrc: '/images/stories/story-2.png',
    cardOverlayText: "Finding peace, tucked away.",
    quote: "Rain tapping gently on the roof, a cozy blanket, hot chai in your hands, and endless greenery outside the window. Sometimes the best adventure is staying in.",
    author: 'avani.travels',
    likes: '984'
  },
  {
    id: 3,
    imageSrc: '/images/stories/story-3.png',
    cardOverlayText: "Above clouds, waking up.",
    quote: "Waking up above the cloud line is something I'll never forget. The panoramic views from the open deck make your morning coffee feel like an absolute ritual. Pure bliss.",
    author: 'rohini_canopy',
    likes: '2,105'
  }
];

export default function PeopleStories() {
  return (
    <section className="w-full py-28 bg-[#F9FAFB] select-none overflow-visible border-t border-zinc-100">
      <div className="w-full lg:max-w-[80%] mx-auto flex flex-col items-center gap-24 px-4">
        
        {/* Brand Header Identity Block */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center max-w-2xl"
        >
          <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm border border-zinc-200/60 bg-white p-0.5 mb-5 flex items-center justify-center">
            <img 
              src="/brand/colour-logo.jpeg" 
              alt="Wind over Waters Logo" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-950 tracking-tight leading-none">
            People’s Stories
          </h2>
          
          <p className="text-zinc-500 text-base md:text-lg font-normal tracking-wide mt-4 max-w-lg leading-relaxed">
            Real snapshots and notes shared by guests tuning into the nature of <span className="text-zinc-900 font-medium">@wind.over.waters</span>
          </p>
        </motion.div>

        {/* Dynamic Alternator Layout */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="w-full flex flex-col gap-32"
        >
          {STORIES.map((story, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={story.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 15 } }
                }}
                className={`w-full flex flex-col items-center justify-between gap-12 lg:gap-16 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* 1. THE IMAGE CARD FRAME (Premium Clean UI Mimic) */}
                <div className="w-full max-w-[400px] bg-white border border-zinc-200/50 rounded-[32px] p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex-shrink-0">
                  {/* Card Header */}
                  <div className="w-full flex items-center justify-between pb-3 px-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-zinc-200/60 bg-white flex items-center justify-center">
                        <img 
                          src="/brand/colour-logo.jpeg" 
                          alt="Wind over Waters Logo mini" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <span className="text-sm font-semibold text-zinc-900 tracking-tight">
                        {story.author}
                      </span>
                    </div>
                    <MoreHorizontal className="w-5 h-5 text-zinc-400 hover:text-zinc-950 transition-colors cursor-pointer" />
                  </div>

                  {/* Image Canvas Viewport with Bold Overlay Text */}
                  <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-zinc-50 shadow-inner group cursor-pointer">
                    <img
                      src={story.imageSrc}
                      alt={story.author}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                      loading="lazy"
                    />
                    {/* Balanced dark vignette overlay for typography legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                    
                    <h3 className="absolute bottom-6 left-6 right-6 text-white text-2xl sm:text-3xl font-bold leading-[1.2] tracking-tight pointer-events-none">
                      {story.cardOverlayText}
                    </h3>
                  </div>

                  {/* Card Footer Interaction Bar */}
                  <div className="w-full pt-4 pb-1 px-1 flex items-center justify-between text-zinc-400">
                    <div className="flex items-center gap-4">
                      <Heart className="w-[22px] h-[22px] hover:text-red-500 hover:fill-red-500 transition-colors cursor-pointer" />
                      <MessageCircle className="w-[22px] h-[22px] hover:text-zinc-900 transition-colors cursor-pointer" />
                      <Send className="w-[22px] h-[22px] rotate-[15deg] hover:text-zinc-900 transition-colors cursor-pointer" />
                    </div>
                    <Bookmark className="w-[22px] h-[22px] hover:text-zinc-900 transition-colors cursor-pointer" />
                  </div>
                </div>

                {/* 2. THE ACTUAL STORY NARRATIVE BLOCK */}
                <div className="w-full flex flex-col justify-center items-start lg:px-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                    <span className="text-xs font-semibold text-zinc-400 font-mono tracking-widest uppercase">
                      Guest Chronicle
                    </span>
                  </div>
                  
                  {/* Clean Sans Serif Typography Layer */}
                  <p className="text-zinc-800 text-lg md:text-xl lg:text-[22px] font-normal leading-relaxed text-left tracking-wide">
                    {story.quote}
                  </p>
                  
                  {/* Divider and meta details */}
                  <div className="mt-8 pt-4 border-t border-zinc-200/60 w-full flex items-center gap-4">
                    <div>
                      <span className="block text-zinc-950 font-bold text-base tracking-tight">
                        ~ @{story.author}
                      </span>
                      <span className="text-xs text-zinc-400 mt-1 block font-normal tracking-wide">
                        Liked by {story.likes} others on <span className="font-mono lowercase">wind.over.waters</span>
                      </span>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}