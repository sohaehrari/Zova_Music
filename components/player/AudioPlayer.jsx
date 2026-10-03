


"use client";

import PlayerControls from "./PlayerControls";

export default function AudioPlayer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-amber-100 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-md">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          {/* Cover */}
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-2xl text-amber-500 sm:flex">
            ♪
          </div>

          {/* Song Info */}
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-gray-900">
              No song selected
            </h3>

            <p className="truncate text-sm text-gray-500">
              Choose a song to start listening
            </p>
          </div>

          {/* Controls */}
          <PlayerControls />
        </div>

        {/* Progress */}
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-0 rounded-full bg-amber-500" />
        </div>
      </div>
    </div>
  );
}




