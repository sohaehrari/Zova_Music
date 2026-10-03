
"use client";

export default function PlayerControls({
  isPlaying,
  onPlayPause,
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="hidden h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-amber-50 hover:text-amber-500 sm:flex"
      >
        ⏮
      </button>

      <button
        type="button"
        onClick={onPlayPause}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg transition hover:bg-amber-600"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? "⏸" : "▶"}
      </button>

      <button
        type="button"
        className="hidden h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-amber-50 hover:text-amber-500 sm:flex"
      >
        ⏭
      </button>
    </div>
  );
}


