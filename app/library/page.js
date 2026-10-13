
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  addToPlaylist,
  createPlaylist,
  deletePlaylist,
  readZovaLibrary,
  removeFavorite,
  removeFromPlaylist,
} from "@/lib/zova-library";

export default function LibraryPage() {
  const [library, setLibrary] = useState({
    favorites: [],
    playlists: [],
  });

  const [ready, setReady] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [activePlaylist, setActivePlaylist] = useState("all");
  const [notice, setNotice] = useState("");

  function refreshLibrary() {
    setLibrary(readZovaLibrary());
  }

  useEffect(() => {
    refreshLibrary();
    setReady(true);

    const handleChange = () => refreshLibrary();

    window.addEventListener("zova-library-change", handleChange);
    window.addEventListener("storage", handleChange);

    return () => {
      window.removeEventListener("zova-library-change", handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, []);

  function handleCreatePlaylist(event) {
    event.preventDefault();

    if (!playlistName.trim()) {
      setNotice("Please enter a playlist name.");
      return;
    }

    try {
      const playlist = createPlaylist(playlistName);
      setPlaylistName("");
      setActivePlaylist(playlist.id);
      refreshLibrary();
      setNotice(`"${playlist.name}" was created.`);
    } catch (error) {
      setNotice(error.message || "Could not create playlist.");
    }
  }

  function handleDeletePlaylist(playlistId, name) {
    const confirmed = window.confirm(
      `Delete the playlist "${name}"?`
    );

    if (!confirmed) return;

    deletePlaylist(playlistId);

    if (activePlaylist === playlistId) {
      setActivePlaylist("all");
    }

    refreshLibrary();
    setNotice("Playlist deleted.");
  }

  function handleRemoveFavorite(itemId) {
    removeFavorite(itemId);
    refreshLibrary();
    setNotice("Removed from favorites.");
  }

  function handleAddFavoriteToPlaylist(item, playlistId) {
    if (!playlistId) return;

    addToPlaylist(playlistId, item);
    refreshLibrary();
    setNotice("Added to playlist.");
  }

  function handleRemovePlaylistItem(playlistId, itemId) {
    removeFromPlaylist(playlistId, itemId);
    refreshLibrary();
    setNotice("Item removed from playlist.");
  }

  const selectedPlaylist = library.playlists.find(
    (playlist) => playlist.id === activePlaylist
  );

  const visibleItems = selectedPlaylist
    ? selectedPlaylist.items
    : library.favorites;

  if (!ready) {
    return (
      <main className="min-h-screen bg-[#faf8f2] px-5 py-20 text-center text-stone-600">
        Loading your library...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f2] text-stone-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-amber-200/70 bg-gradient-to-br from-white via-[#fffaf0] to-[#f3e4bd]">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-10 h-64 w-64 rounded-full bg-yellow-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-amber-800"
          >
            <span aria-hidden="true">←</span>
            Back to videos
          </Link>

          <div className="mt-9 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-700">
              Your personal music space
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              Zova{" "}
              <span className="font-serif italic text-amber-700">
                Library
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
              Keep your favorite Afghan music close.
              Collect videos, build playlists, and create a
              library that feels like yours.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-2xl border border-amber-200 bg-white/80 px-5 py-4 shadow-sm">
                <p className="text-2xl font-semibold text-amber-800">
                  {library.favorites.length}
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  Favorites
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-white/80 px-5 py-4 shadow-sm">
                <p className="text-2xl font-semibold text-amber-800">
                  {library.playlists.length}
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  Playlists
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-white/80 px-5 py-4 shadow-sm">
                <p className="text-2xl font-semibold text-amber-800">
                  {library.playlists.reduce(
                    (total, playlist) =>
                      total + playlist.items.length,
                    0
                  )}
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  Playlist items
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:py-14">
        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              Your collection
            </p>

            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => setActivePlaylist("all")}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition ${
                  activePlaylist === "all"
                    ? "bg-stone-900 text-white"
                    : "text-stone-600 hover:bg-amber-50"
                }`}
              >
                <span>♡ Favorites</span>
                <span>{library.favorites.length}</span>
              </button>

              <div className="px-1 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Playlists
                </p>
              </div>

              {library.playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  type="button"
                  onClick={() => setActivePlaylist(playlist.id)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                    activePlaylist === playlist.id
                      ? "bg-amber-100 text-amber-950"
                      : "text-stone-600 hover:bg-amber-50"
                  }`}
                >
                  <span className="min-w-0 truncate">
                    ♫ {playlist.name}
                  </span>
                  <span className="shrink-0 text-xs">
                    {playlist.items.length}
                  </span>
                </button>
              ))}

              {library.playlists.length === 0 && (
                <p className="px-3 py-2 text-xs leading-5 text-stone-400">
                  Your playlists will appear here.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-[#fffdf7] to-[#f4e6c3] p-5">
            <p className="text-lg font-semibold">Create a playlist</p>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Give your collection a name and add videos to it.
            </p>

            <form onSubmit={handleCreatePlaylist} className="mt-5">
              <label
                htmlFor="playlist-name"
                className="mb-2 block text-xs font-medium text-stone-600"
              >
                Playlist name
              </label>

              <input
                id="playlist-name"
                value={playlistName}
                onChange={(event) =>
                  setPlaylistName(event.target.value)
                }
                maxLength={60}
                placeholder="e.g. Afghan Classics"
                className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />

              <button
                type="submit"
                className="mt-3 w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-amber-800"
              >
                + Create playlist
              </button>
            </form>
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0">
          <div className="flex flex-col justify-between gap-3 border-b border-amber-200 pb-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                Zova collection
              </p>

              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                {selectedPlaylist
                  ? selectedPlaylist.name
                  : "Your favorites"}
              </h2>

              <p className="mt-2 text-sm text-stone-500">
                {selectedPlaylist
                  ? `${selectedPlaylist.items.length} items in this playlist`
                  : `${library.favorites.length} saved items`}
              </p>
            </div>

            {selectedPlaylist && (
              <button
                type="button"
                onClick={() =>
                  handleDeletePlaylist(
                    selectedPlaylist.id,
                    selectedPlaylist.name
                  )
                }
                className="self-start rounded-full border border-red-200 px-4 py-2 text-sm text-red-700 transition hover:bg-red-50 sm:self-auto"
              >
                Delete playlist
              </button>
            )}
          </div>

          {notice && (
            <div
              role="status"
              className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
            >
              <span>{notice}</span>
              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss message"
                className="text-lg leading-none"
              >
                ×
              </button>
            </div>
          )}

          {visibleItems.length === 0 ? (
            <div className="mt-7 rounded-3xl border border-dashed border-amber-300 bg-white/70 px-6 py-14 text-center sm:px-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-3xl text-amber-800">
                ♫
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                {selectedPlaylist
                  ? "This playlist is empty"
                  : "Your library starts here"}
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
                {selectedPlaylist
                  ? "Open Videos and save a video to your favorites, then add it to this playlist."
                  : "Browse videos and press Save to keep the music you love here."}
              </p>

              <Link
                href="/videos"
                className="mt-6 inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-amber-800"
              >
                Explore videos
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visibleItems.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#f4e5bd] to-[#fffdf7]">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title || "Saved music video"}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-4xl text-amber-800">
                        ♫
                      </div>
                    )}

                    <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-900">
                      {item.type || "Music"}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="line-clamp-2 font-semibold leading-6">
                      {item.title || "Untitled video"}
                    </h3>

                    <p className="mt-1 truncate text-sm text-stone-500">
                      {item.artist || "Afghan Music"}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full bg-stone-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-amber-800"
                        >
                          Watch video ↗
                        </a>
                      )}

                      {!selectedPlaylist && library.playlists.length > 0 && (
                        <select
                          defaultValue=""
                          aria-label={`Add ${item.title} to a playlist`}
                          onChange={(event) => {
                            handleAddFavoriteToPlaylist(
                              item,
                              event.target.value
                            );
                            event.target.value = "";
                          }}
                          className="min-w-0 max-w-full rounded-full border border-amber-200 bg-white px-3 py-2 text-xs text-stone-700 outline-none focus:border-amber-500"
                        >
                          <option value="" disabled>
                            + Playlist
                          </option>
                          {library.playlists.map((playlist) => (
                            <option
                              key={playlist.id}
                              value={playlist.id}
                            >
                              {playlist.name}
                            </option>
                          ))}
                        </select>
                      )}

                      {selectedPlaylist ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleRemovePlaylistItem(
                              selectedPlaylist.id,
                              item.id
                            )
                          }
                          className="rounded-full border border-amber-200 px-3 py-2 text-xs text-stone-600 transition hover:border-red-300 hover:text-red-700"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRemoveFavorite(item.id)}
                          className="rounded-full border border-amber-200 px-3 py-2 text-xs text-stone-600 transition hover:border-red-300 hover:text-red-700"
                        >
                          ♥ Remove
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-amber-100 px-5 py-7 text-center text-xs text-stone-400">
        Zova Music · Your music, your collection
      </footer>
    </main>
  );
}
