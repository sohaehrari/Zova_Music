

Soha Ahrari
4:42 PM (0 minutes ago)
to me

const STORAGE_KEY = "zova-library-v1";

function createEmptyLibrary() {
  return {
    favorites: [],
    playlists: [],
  };
}

export function readZovaLibrary() {
  if (typeof window === "undefined") {
    return createEmptyLibrary();
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return createEmptyLibrary();

    const parsed = JSON.parse(saved);

    return {
      favorites: Array.isArray(parsed.favorites)
        ? parsed.favorites
        : [],
      playlists: Array.isArray(parsed.playlists)
        ? parsed.playlists
        : [],
    };
  } catch (error) {
    console.error("Could not read Zova Library:", error);
    return createEmptyLibrary();
  }
}

export function writeZovaLibrary(library) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library));

    // اطلاع دادن به کامپوننت‌های دیگر در همین صفحه
    window.dispatchEvent(new Event("zova-library-change"));
  } catch (error) {
    console.error("Could not save Zova Library:", error);
  }
}

export function toggleFavorite(item) {
  const library = readZovaLibrary();
  const exists = library.favorites.some(
    (favorite) => favorite.id === item.id
  );

  const favorites = exists
    ? library.favorites.filter((favorite) => favorite.id !== item.id)
    : [
        {
          ...item,
          savedAt: new Date().toISOString(),
        },
        ...library.favorites,
      ];

  writeZovaLibrary({ ...library, favorites });

  return !exists;
}

export function isFavorite(id) {
  return readZovaLibrary().favorites.some(
    (item) => item.id === id
  );
}

export function createPlaylist(name) {
  const cleanName = name.trim();

  if (!cleanName) {
    throw new Error("Please enter a playlist name.");
  }

  const library = readZovaLibrary();

  const playlist = {
    id: `playlist-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: cleanName,
    items: [],
    createdAt: new Date().toISOString(),
  };

  writeZovaLibrary({
    ...library,
    playlists: [playlist, ...library.playlists],
  });

  return playlist;
}

export function deletePlaylist(playlistId) {
  const library = readZovaLibrary();

  writeZovaLibrary({
    ...library,
    playlists: library.playlists.filter(
      (playlist) => playlist.id !== playlistId
    ),
  });
}

export function addToPlaylist(playlistId, item) {
  const library = readZovaLibrary();

  const playlists = library.playlists.map((playlist) => {
    if (playlist.id !== playlistId) return playlist;

    const alreadyAdded = playlist.items.some(
      (existing) => existing.id === item.id
    );

    if (alreadyAdded) return playlist;

    return {
      ...playlist,
      items: [item, ...playlist.items],
    };
  });

  writeZovaLibrary({ ...library, playlists });
}

export function removeFromPlaylist(playlistId, itemId) {
  const library = readZovaLibrary();

  const playlists = library.playlists.map((playlist) =>
    playlist.id === playlistId
      ? {
          ...playlist,
          items: playlist.items.filter(
            (item) => item.id !== itemId
          ),
        }
      : playlist
  );

  writeZovaLibrary({ ...library, playlists });
}

export function removeFavorite(itemId) {
  const library = readZovaLibrary();

  writeZovaLibrary({
    ...library,
    favorites: library.favorites.filter(
      (item) => item.id !== itemId
    ),
  });
}
