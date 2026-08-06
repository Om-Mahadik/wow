import { Metadata } from "next";
import ContactView from "@/components/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact Us | Wind Over Waters",
  description: "Get in touch with us for bookings, inquiries, or directions to our off-the-grid sanctuary on the shores of Panshet Lake.",
};

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-white pt-0 pb-24">
      <ContactView />
    </main>
  );
}