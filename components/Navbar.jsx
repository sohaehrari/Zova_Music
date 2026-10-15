import Link from "next/link";

export default function Navbar() {
  const pages = [
    { name: "Search", href: "/search" },
    { name: "Artists", href: "/artists" },
    { name: "Library", href: "/library" },
    { name: "Videos", href: "/videos" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700 shadow-lg shadow-amber-500/20">
            <span className="text-lg font-black text-black">Z</span>
          </div>

          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold tracking-wide text-white">
              ZOVA
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              Music Library
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group relative rounded-full px-4 py-2.5 text-sm font-medium text-zinc-400 transition-all duration-300 hover:bg-white/[0.08] hover:text-white sm:px-5"
            >
              <span className="relative z-10">{page.name}</span>

              {/* Gold hover glow */}
              <span className="absolute inset-x-4 bottom-1 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        

        {/* Mobile menu button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 sm:hidden"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}