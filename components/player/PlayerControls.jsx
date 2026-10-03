
export default function PlayerControls({
  isPlaying,
  onPlayPause,
  onClose,
}) {
  return (
    <div className="flex items-center gap-2">
      {/* Previous */}
      <button
        type="button"
        className="hidden h-10 w-10 items-center justify-center rounded-full text-gray-400 transition hover:bg-amber-50 hover:text-amber-500 sm:flex"
        aria-label="Previous song"
      >
        ⏮
      </button>

      {/* Play / Pause */}
      <button
        type="button"
        onClick={onPlayPause}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg transition hover:bg-amber-600"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? "⏸" : "▶"}
      </button>

      {/* Next */}
      <button
        type="button"
        className="hidden h-10 w-10 items-center justify-center rounded-full text-gray-400 transition hover:bg-amber-50 hover:text-amber-500 sm:flex"
        aria-label="Next song"
      >
        ⏭
      </button>

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="ml-2 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
        aria-label="Close player"
      >
        ✕
      </button>
    </div>
  );
}

