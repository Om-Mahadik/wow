"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartY = useRef<number | null>(null);

  const [visible, setVisible] = useState(true);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);

  // --------------------------------------------------
  // CLOSE INTRO
  // --------------------------------------------------

  const closeIntro = () => {
    setVisible(false);

    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // --------------------------------------------------
  // MUTE / UNMUTE
  // --------------------------------------------------

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;

    setMuted(videoRef.current.muted);
  };

  // --------------------------------------------------
  // AUTOPLAY
  // --------------------------------------------------

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const startVideo = async () => {
      try {
        video.muted = true;

        await video.play();

        setStarted(true);
      } catch (error) {
        console.log("Autoplay prevented:", error);
      }
    };

    startVideo();
  }, []);

  // --------------------------------------------------
  // DESKTOP SCROLL TO SKIP
  // --------------------------------------------------

  useEffect(() => {
    if (!visible) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 10) {
        closeIntro();
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: true,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [visible]);

  // --------------------------------------------------
  // MOBILE TOUCH START
  // --------------------------------------------------

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartY.current = event.touches[0].clientY;
  };

  // --------------------------------------------------
  // MOBILE SWIPE UP
  // --------------------------------------------------

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartY.current === null) return;

    const touchEndY = event.changedTouches[0].clientY;

    const swipeDistance = touchStartY.current - touchEndY;

    // Swipe upward more than 60px
    if (swipeDistance > 60) {
      closeIntro();
    }

    touchStartY.current = null;
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: {
              duration: 0.7,
              ease: "easeInOut",
            },
          }}
          className="
            fixed
            inset-0
            z-[99999]
            bg-black
            overflow-hidden
            select-none
          "
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* ==================================================
              VIDEO
          ================================================== */}

          <video
            ref={videoRef}
            src="/videos/reels/intro.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            controls={false}
            onEnded={closeIntro}
            className="
              absolute
              inset-0
              m-auto
              h-full
              w-auto
              max-w-full
              object-contain
            "
          />

          {/* ==================================================
              VERY SUBTLE CINEMATIC OVERLAY
          ================================================== */}

          <div
            className="
              absolute
              inset-0
              bg-black/5
              pointer-events-none
            "
          />

          {/* ==================================================
              BOTTOM GRADIENT
          ================================================== */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-64
              bg-gradient-to-t
              from-black/70
              via-black/20
              to-transparent
              pointer-events-none
            "
          />

          {/* ==================================================
              DESKTOP - TOP RIGHT SKIP BUTTON
          ================================================== */}

          <div
            className="
              absolute
              top-6
              right-6
              hidden
              md:block
              z-20
            "
          >
            <button
              onClick={closeIntro}
              className="
                group
                flex
                items-center
                gap-3
                rounded-full
                border
                border-white/25
                bg-black/20
                px-5
                py-2.5
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:bg-white
                hover:text-black
                hover:border-white
              "
            >
              <span
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.2em]
                  font-medium
                "
              >
                Skip intro
              </span>

              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h13" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </button>
          </div>

          {/* ==================================================
              MUTE / UNMUTE
          ================================================== */}

          <AnimatePresence>
            {started && (
              <motion.button
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                onClick={toggleMute}
                className="
                  absolute
                  bottom-8
                  right-6
                  md:right-8
                  z-20

                  flex
                  items-center
                  justify-center

                  w-11
                  h-11

                  rounded-full

                  border
                  border-white/25

                  bg-black/20

                  text-white

                  backdrop-blur-md

                  transition-all
                  duration-300

                  hover:bg-white
                  hover:text-black
                "
                aria-label={muted ? "Unmute video" : "Mute video"}
              >
                {muted ? (
                  /* -----------------------------
                     MUTED ICON
                  ----------------------------- */

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                    <path d="m19 9-6 6" />
                    <path d="m13 9 6 6" />
                  </svg>
                ) : (
                  /* -----------------------------
                     UNMUTED ICON
                  ----------------------------- */

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                    <path d="M19 9a5 5 0 0 1 0 6" />
                    <path d="M16 11a2 2 0 0 1 0 2" />
                  </svg>
                )}
              </motion.button>
            )}
          </AnimatePresence>

          {/* ==================================================
              BOTTOM SKIP TEXT
          ================================================== */}

          <motion.button
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: started ? 1 : 0,
              y: started ? 0 : 15,
            }}
            transition={{
              duration: 0.5,
            }}
            onClick={closeIntro}
            className="
              absolute
              bottom-7
              left-1/2
              -translate-x-1/2

              flex
              flex-col
              items-center

              text-white

              group

              z-20

              md:bottom-8

              whitespace-nowrap
            "
          >
            <span
              className="
                text-[10px]
                md:text-[11px]

                uppercase

                tracking-[0.28em]

                font-medium

                opacity-80

                group-hover:opacity-100

                transition-opacity
              "
            >
              {/* MOBILE */}
              <span className="md:hidden">Tap here to skip intro</span>

              {/* DESKTOP */}
              <span className="hidden md:inline">Click here to skip intro</span>
            </span>
          </motion.button>

          {/* ==================================================
              AUTOPLAY FALLBACK
          ================================================== */}

          {!started && (
            <button
              onClick={async () => {
                if (!videoRef.current) return;

                try {
                  await videoRef.current.play();

                  setStarted(true);
                } catch (error) {
                  console.log("Unable to start video:", error);
                }
              }}
              className="
                absolute
                inset-0
                z-30

                flex
                items-center
                justify-center

                text-white

                text-[11px]

                uppercase

                tracking-[0.3em]
              "
            >
              Tap to enter
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
