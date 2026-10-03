

"use client";

import { useEffect, useRef, useState } from "react";
import PlayerControls from "./PlayerControls";

export default function AudioPlayer({
  song,
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}) {
  const playerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!song) return;

    setProgress(0);
    setIsPlaying(false);

    const createPlayer = () => {
      playerRef.current = new window.YT.Player("zova-youtube-player", {
        height: "1",
        width: "1",
        videoId: song.id,

        playerVars: {
          autoplay: 1,
          controls: 0,
        },

        events: {
          onReady: (event) => {
            event.target.playVideo();
            setIsPlaying(true);
          },

          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            }

            if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }

            if (event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
              setProgress(100);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );

      if (!existingScript) {
        const script = document.createElement("script");

        script.src = "https://www.youtube.com/iframe_api";

        document.body.appendChild(script);
      }

      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [song]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (!playerRef.current) return;

      const currentTime = playerRef.current.getCurrentTime();
      const duration = playerRef.current.getDuration();

      if (duration) {
        setProgress((currentTime / duration) * 100);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleSeek = (event) => {
    if (!playerRef.current) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const clickPosition = event.clientX - rect.left;
    const percentage = clickPosition / rect.width;

    const duration = playerRef.current.getDuration();

    if (!duration) return;

    const newTime = duration * percentage;

    playerRef.current.seekTo(newTime, true);
    setProgress(percentage * 100);
  };

  if (!song) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-amber-100 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-md">
      <div
        id="zova-youtube-player"
        className="pointer-events-none absolute h-px w-px opacity-0"
      />

      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          <img
            src={song.image}
            alt={song.title}
            className="hidden h-14 w-14 shrink-0 rounded-xl object-cover sm:block"
          />

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-gray-900">
              {song.title}
            </h3>

            <p className="truncate text-sm text-gray-500">
              {song.artist}
            </p>
          </div>

          <PlayerControls
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onPrevious={onPrevious}
            onNext={onNext}
            onClose={onClose}
            hasPrevious={hasPrevious}
            hasNext={hasNext}
          />
        </div>

        <div
          onClick={handleSeek}
          className="mt-3 h-2 w-full cursor-pointer overflow-hidden rounded-full bg-gray-100"
          role="slider"
          aria-label="Song progress"
        >
          <div
            className="h-full rounded-full bg-amber-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}