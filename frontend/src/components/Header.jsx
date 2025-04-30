import "../index.css";

export default function Header() {
  return (
    <header className="flex justify-start items-center gap-5 py-4 px-6 md:px-10 lg:px-16 opacity-0 animate-fade-in animation-delay-500">
      <div className="text-3xl font-extrabold">FlashMath</div>
    </header>
  );
}
