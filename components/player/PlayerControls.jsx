
"use client";

export default function PlayerControls() {
  return (
    <div className="flex items-center gap-2">
      {/* Previous */}
      <button
        type="button"
        className="hidden h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-amber-50 hover:text-amber-500 sm:flex"
        aria-label="Previous song"
      >
        ⏮
      </button>

      {/* Play / Pause */}
      <button
        type="button"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg transition hover:bg-amber-600"
        aria-label="Play"
      >
        ▶
      </button>

      {/* Next */}
      <button
        type="button"
        className="hidden h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-amber-50 hover:text-amber-500 sm:flex"
        aria-label="Next song"
      >
        ⏭
      </button>
    </div>
  );
}
























