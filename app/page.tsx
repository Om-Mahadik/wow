import HomeAmenities from "@/components/home/HomeAmenities";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center max-w-2xl mx-auto gap-6 select-none">
      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        To get started, edit the page.tsx file.
      </h1>
      
      {/* Subtitle */}
      <p className="text-base text-zinc-500 max-w-md leading-relaxed">
        Looking for a starting point or more instructions? Head over to the
        Templates or Learning center.
      </p>
      
      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
        <button className="h-11 px-6 rounded-full font-medium transition-colors bg-zinc-900 text-zinc-50 hover:bg-zinc-800">
          Deploy Now
        </button>
        <button className="h-11 px-6 rounded-full font-medium transition-colors border border-zinc-200 text-zinc-900 hover:bg-zinc-50">
          Documentation
        </button>
      </div>

      <HomeAmenities />
    </main>
  );
}