'use client';

import { useRouter } from "next/navigation";

export function useFooterNavigate() {
  const router = useRouter();

  const navigateTo = (path: string, hash?: string) => {
    // 1. Instantly reset scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // 2. Navigate using Next.js router
    if (!hash) {
      router.push(path);
    } else {
      router.push(`${path}#${hash}`);

      // 3. Wait for Next.js route transition, then scroll down to the target section ID
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  };

  return navigateTo;
}