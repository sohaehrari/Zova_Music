


"use client";

import { useState } from "react";
import PlayerControls from "./PlayerControls";

export default function AudioPlayer({ song }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!song) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-amber-100 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-md">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          
          {/* Cover */}
          <img
            src={song.image}
            alt={song.title}
            className="hidden h-14 w-14 shrink-0 rounded-xl object-cover sm:block"
          />

          {/* Song Info */}
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-gray-900">
              {song.title}
            </h3>

            <p className="truncate text-sm text-gray-500">
              {song.artist}
            </p>
          </div>

          {/* Controls */}
          <PlayerControls
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
          />
        </div>

        {/* Progress */}
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-0 rounded-full bg-amber-500" />
        </div>
      </div>
    </div>
  );
}




