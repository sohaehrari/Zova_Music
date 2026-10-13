

"use client";

import { useEffect, useState } from "react";
import {
  addToPlaylist,
  isFavorite,
  readZovaLibrary,
  toggleFavorite,
} from "@/lib/zova-library";

export default function LibraryActions({ item }) {
  const [favorite, setFavorite] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const refresh = () => {
      setFavorite(isFavorite(item.id));
      setPlaylists(readZovaLibrary().playlists);
    };

    refresh();

    window.addEventListener("zova-library-change", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("zova-library-change", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [item.id]);

  function handleFavorite() {
    const nowFavorite = toggleFavorite(item);
    setFavorite(nowFavorite);
    setMessage(
      nowFavorite
        ? "Added to your favorites"
        : "Removed from your favorites"
    );
  }

  function handleAddToPlaylist() {
    if (!selectedPlaylist) {
      setMessage("Create a playlist in Library first.");
      return;
    }

    addToPlaylist(selectedPlaylist, item);
    setMessage("Added to playlist");
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleFavorite}
        aria-pressed={favorite}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
          favorite
            ? "border-amber-500 bg-amber-100 text-amber-900"
            : "border-amber-200 bg-white text-stone-700 hover:border-amber-500"
        }`}
      >
        {favorite ? "♥ Saved" : "♡ Save"}
      </button>

      <select
        value={selectedPlaylist}
        onChange={(event) => setSelectedPlaylist(event.target.value)}
        aria-label="Choose a playlist"
        className="max-w-full rounded-full border border-amber-200 bg-white px-3 py-2 text-sm text-stone-700 outline-none focus:border-amber-500"
      >
        <option value="">Choose playlist</option>
        {playlists.map((playlist) => (
          <option key={playlist.id} value={playlist.id}>
            {playlist.name}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleAddToPlaylist}
        disabled={!selectedPlaylist}
        className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        + Add
      </button>

      {message && (
        <span
          role="status"
          className="w-full text-xs text-amber-800"
        >
          {message}
        </span>
      )}
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import {
  addToPlaylist,
  isFavorite,
  readZovaLibrary,
  toggleFavorite,
} from "@/lib/zova-library";

export default function LibraryActions({ item }) {
  const [favorite, setFavorite] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const refresh = () => {
      setFavorite(isFavorite(item.id));
      setPlaylists(readZovaLibrary().playlists);
    };

    refresh();

    window.addEventListener("zova-library-change", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("zova-library-change", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [item.id]);

  function handleFavorite() {
    const nowFavorite = toggleFavorite(item);
    setFavorite(nowFavorite);
    setMessage(
      nowFavorite
        ? "Added to your favorites"
        : "Removed from your favorites"
    );
  }

  function handleAddToPlaylist() {
    if (!selectedPlaylist) {
      setMessage("Create a playlist in Library first.");
      return;
    }

    addToPlaylist(selectedPlaylist, item);
    setMessage("Added to playlist");
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleFavorite}
        aria-pressed={favorite}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
          favorite
            ? "border-amber-500 bg-amber-100 text-amber-900"
            : "border-amber-200 bg-white text-stone-700 hover:border-amber-500"
        }`}
      >
        {favorite ? "♥ Saved" : "♡ Save"}
      </button>

      <select
        value={selectedPlaylist}
        onChange={(event) => setSelectedPlaylist(event.target.value)}
        aria-label="Choose a playlist"
        className="max-w-full rounded-full border border-amber-200 bg-white px-3 py-2 text-sm text-stone-700 outline-none focus:border-amber-500"
      >
        <option value="">Choose playlist</option>
        {playlists.map((playlist) => (
          <option key={playlist.id} value={playlist.id}>
            {playlist.name}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleAddToPlaylist}
        disabled={!selectedPlaylist}
        className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        + Add
      </button>

      {message && (
        <span
          role="status"
          className="w-full text-xs text-amber-800"
        >
          {message}
        </span>
      )}
    </div>
  );
}
