"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [visible, setVisible] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const touchStartY = useRef<number | null>(null);

  const closeIntro = () => {
    setVisible(false);

    // Stop the video when skipped
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const playVideo = async () => {
      try {
        await video.play();
        setHasStarted(true);
      } catch (error) {
        console.log("Autoplay prevented:", error);
      }
    };

    playVideo();
  }, []);

  // Desktop: mouse wheel / trackpad
  useEffect(() => {
    if (!visible) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 10) {
        closeIntro();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [visible]);

  // Mobile: swipe up
  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartY.current === null) return;

    const touchEndY = event.changedTouches[0].clientY;
    const distance = touchStartY.current - touchEndY;

    // Swipe up at least 60px
    if (distance > 60) {
      closeIntro();
    }

    touchStartY.current = null;
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.7,
              ease: "easeInOut",
            },
          }}
          className="fixed inset-0 z-[9999] bg-black"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Video */}
          <video
            ref={videoRef}
            src="/videos/reels/intro.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            controls={false}
            onEnded={closeIntro}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Dark gradient at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Swipe indicator */}
          <AnimatePresence>
            {hasStarted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: {
                    duration: 0.5,
                  },
                  y: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white pointer-events-none"
              >
                {/* Arrow */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-2"
                >
                  <path d="M12 19V5" />
                  <path d="M5 12l7-7 7 7" />
                </svg>

                <span className="text-[11px] uppercase tracking-[0.25em] font-medium">
                  Swipe up to skip
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fallback if autoplay doesn't start */}
          {!hasStarted && (
            <button
              onClick={() => {
                videoRef.current?.play();
                setHasStarted(true);
              }}
              className="absolute inset-0 flex items-center justify-center text-white text-xs uppercase tracking-[0.25em]"
            >
              Tap to enter
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
