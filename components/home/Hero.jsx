export default function Hero() {
    return (
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#080808]">
        {/* Background Glow */}
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-[#F5E6B3]/[0.06] blur-[140px]" />
  
        {/* Main Content */}
        <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-20">
          <div className="grid w-full items-center gap-16 lg:grid-cols-2">
  
            {/* Left Content */}
            <div className="max-w-2xl">
              {/* Small Label */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-white/[0.04] px-4 py-2 backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
  
                <span className="text-sm text-[#D6D0C4]">
                  Afghan Music & Videos
                </span>
              </div>
  
              {/* Heading */}
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                The Sound
                <span className="block bg-gradient-to-r from-[#F8F1DC] via-[#D4AF37] to-[#A67C00] bg-clip-text text-transparent">
                  of Afghanistan.
                </span>
              </h1>
  
              {/* Description */}
              <p className="mt-7 max-w-xl text-base leading-7 text-[#918D84] sm:text-lg">
                Discover Afghan artists, listen to your favorite songs,
                and watch music videos — all in one beautiful place.
              </p>
  
              {/* Buttons */}
              <div className="mt-9 flex flex-wrap gap-4">
                <button className="group flex items-center gap-3 rounded-full bg-[#F5F1E8] px-7 py-3.5 font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_0_35px_rgba(212,175,55,0.18)]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#151515] text-xs text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-0.5">
                    ▶
                  </span>
  
                  Explore Music
                </button>
  
                <button className="rounded-full border border-[#D4AF37]/30 bg-white/[0.03] px-7 py-3.5 font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/[0.08] hover:text-[#F5D77A]">
                  Watch Videos
                </button>
              </div>
  
              {/* Stats */}
              <div className="mt-12 flex gap-10 border-t border-white/10 pt-7">
                <div>
                  <p className="text-2xl font-semibold text-white">100+</p>
                  <p className="mt-1 text-sm text-[#706D66]">Songs</p>
                </div>
  
                <div>
                  <p className="text-2xl font-semibold text-white">50+</p>
                  <p className="mt-1 text-sm text-[#706D66]">Artists</p>
                </div>
  
                <div>
                  <p className="text-2xl font-semibold text-white">HD</p>
                  <p className="mt-1 text-sm text-[#706D66]">Music Videos</p>
                </div>
              </div>
            </div>
  
            {/* Right Visual */}
            <div className="relative mx-auto flex h-[500px] w-full max-w-[520px] items-center justify-center">
  
              {/* Glow behind visual */}
              <div className="absolute h-72 w-72 rounded-full bg-[#D4AF37]/15 blur-[100px]" />
  
              {/* Decorative Circle */}
              <div className="absolute h-[390px] w-[390px] rounded-full border border-[#D4AF37]/15 bg-white/[0.015] backdrop-blur-3xl" />
  
              <div className="absolute h-[330px] w-[330px] rounded-full border border-white/10" />
  
              {/* Album Visual */}
              <div className="relative z-10 h-[290px] w-[290px] overflow-hidden rounded-[36px] border border-[#D4AF37]/40 bg-gradient-to-br from-[#F8E7A8] via-[#D4AF37] to-[#8C6815] p-[1px] shadow-2xl shadow-[#D4AF37]/20">
  
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[35px] bg-gradient-to-br from-[#211D15] via-[#15130F] to-[#080808]">
  
                  {/* Luxury Artwork Glows */}
                  <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#D4AF37]/20 blur-3xl" />
  
                  <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-[#F5E6B3]/10 blur-3xl" />
  
                  {/* Vinyl */}
                  <div className="relative flex h-52 w-52 items-center justify-center rounded-full bg-[#050505] shadow-2xl">
  
                    <div className="absolute inset-4 rounded-full border border-[#D4AF37]/10" />
  
                    <div className="absolute inset-10 rounded-full border border-white/10" />
  
                    <div className="absolute inset-16 rounded-full border border-[#D4AF37]/10" />
  
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#F8E7A8] via-[#D4AF37] to-[#8C6815] shadow-[0_0_30px_rgba(212,175,55,0.45)]" />
  
                    <div className="absolute h-2 w-2 rounded-full bg-white" />
                  </div>
  
                  {/* Play Button */}
                  <button className="absolute flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-white/10 text-xl text-[#F5D77A] shadow-xl backdrop-blur-xl transition hover:scale-110 hover:bg-[#D4AF37]/20">
                    ▶
                  </button>
                </div>
              </div>
  
              {/* Floating Artist Card */}
              <div className="absolute left-0 top-20 z-20 rounded-2xl border border-[#D4AF37]/15 bg-black/50 p-4 shadow-xl backdrop-blur-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#F8E7A8] to-[#A67C00] text-lg text-black">
                    ♪
                  </div>
  
                  <div>
                    <p className="text-xs text-[#77736A]">
                      Featured Artist
                    </p>
  
                    <p className="mt-1 text-sm font-medium text-white">
                      Afghan Artist
                    </p>
                  </div>
                </div>
              </div>
  
              {/* Floating Now Playing Card */}
              <div className="absolute bottom-10 right-0 z-20 w-64 rounded-2xl border border-[#D4AF37]/15 bg-black/60 p-4 shadow-2xl backdrop-blur-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F8E7A8] to-[#A67C00] text-xl text-black">
                    ♪
                  </div>
  
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-wider text-[#77736A]">
                      Now Playing
                    </p>
  
                    <p className="mt-1 truncate text-sm font-medium text-white">
                      Afghan Melody
                    </p>
  
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-[#F8E7A8] via-[#D4AF37] to-[#A67C00]" />
                    </div>
                  </div>
  
                  <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5F1E8] text-xs text-black transition hover:scale-105 hover:bg-white">
                    ▶
                  </button>
                </div>
              </div>
  
            </div>
          </div>
        </div>
      </section>
    );
  }
  