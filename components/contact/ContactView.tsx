import ContactHero from "./ContactHero";
import ContactForm from "./ContactForm";

export default function ContactView() {
  return (
    <div className="w-full flex flex-col p-0 m-0 overflow-x-hidden pt-20 md:pt-28">
      <section className="w-full">
        <ContactForm />
      </section>

      <section className="w-full">
        <ContactHero />
      </section>
    </div>
  );
}