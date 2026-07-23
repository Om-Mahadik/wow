import type { Metadata } from "next";
import GalleryView from "@/components/gallery/GalleryView";

export const metadata: Metadata = {
  title: "Gallery | Wind Over Waters",
  description: "Explore our premium off-the-grid spaces, cabins, decks, and natural wild landscape views.",
};

export default function GalleryPage() {
  return (
    <main className="w-full min-h-screen bg-white pt-12 pb-24">
      <GalleryView />
    </main>
  );
}