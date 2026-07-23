import { Metadata } from "next";
import CabinView from "@/components/cabin/CabinView";

export const metadata: Metadata = {
  title: "Cabins | Wind Over Waters",
  description: "Browse our hand-crafted, sustainable, off-the-grid cabins and architectural spaces designed for deep nature immersion.",
};

export default function CabinPage() {
  return (
    <main className="w-full min-h-screen bg-white pt-12 pb-24">
      <CabinView />
    </main>
  );
}