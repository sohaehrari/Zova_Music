

const exploreLinks = [
  "Songs",
  "Artists",
  "Albums",
  "Music Videos",
];

const discoverLinks = [
  "Genres",
  "Latest Music",
  "Popular Artists",
  "Featured",
];

export default function Footer() {
  return (
    <footer className="border-t border-amber-500/10 bg-gradient-to-b from-white to-amber-50/40">
      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              VYRA<span className="text-amber-500">.</span>
            </h2>

            <p className="mt-5 max-w-md leading-7 text-gray-500">
              Discover Afghan music, artists, songs, and music videos
              in one beautiful place.
            </p>

            {/* Social */}
            <div className="mt-7 flex gap-3">
              {["Instagram", "YouTube", "Facebook"].map((social) => (
                <button
                  key={social}
                  className="rounded-full border border-amber-500/15 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm transition hover:border-amber-400/40 hover:text-amber-600"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Explore
            </h3>

            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link}>
                  <button className="text-sm text-gray-500 transition hover:text-amber-600">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Discover
            </h3>

            <ul className="mt-5 space-y-3">
              {discoverLinks.map((link) => (
                <li key={link}>
                  <button className="text-sm text-gray-500 transition hover:text-amber-600">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-amber-500/10 pt-7 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 VYRA. All rights reserved.
          </p>

          <div className="flex gap-6">
            <button className="transition hover:text-amber-600">
              Privacy
            </button>

            <button className="transition hover:text-amber-600">
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
