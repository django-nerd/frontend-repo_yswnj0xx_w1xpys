import { useMemo, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TrackList from "./components/TrackList";
import Player from "./components/Player";

function App() {
  // Small but working catalog (royalty-free demo tracks)
  const catalog = useMemo(
    () => [
      {
        id: "shx1",
        title: "SoundHelix Song 1",
        artist: "T. Schürger",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: "https://images.unsplash.com/photo-1513569771920-c9e1d31714af?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "shx2",
        title: "SoundHelix Song 2",
        artist: "T. Schürger",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "shx3",
        title: "SoundHelix Song 3",
        artist: "T. Schürger",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: "mdn",
        title: "MDN Sample Audio",
        artist: "MDN",
        url: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop",
      },
    ],
    []
  );

  const [user, setUser] = useState("");
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState(null);

  const results = useMemo(() => {
    if (!query) return catalog;
    const q = query.toLowerCase();
    return catalog.filter(
      (t) => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q)
    );
  }, [catalog, query]);

  const onSearch = (q) => setQuery(q);

  const playTrack = (t) => setCurrent(t);

  const onNext = () => {
    const list = results.length ? results : catalog;
    if (!current) return setCurrent(list[0]);
    const idx = list.findIndex((x) => x.id === current.id);
    const nextIdx = (idx + 1) % list.length;
    setCurrent(list[nextIdx]);
  };

  const onPrev = () => {
    const list = results.length ? results : catalog;
    if (!current) return setCurrent(list[0]);
    const idx = list.findIndex((x) => x.id === current.id);
    const prevIdx = (idx - 1 + list.length) % list.length;
    setCurrent(list[prevIdx]);
  };

  // Ensure something is playing quickly on first load
  const ensureInitial = () => {
    if (!current && catalog.length) setCurrent(catalog[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 text-slate-900" onLoad={ensureInitial}>
      <Header user={user} onToggleAuth={() => setUser((u) => (u ? "" : "Guest"))} />

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        <section className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          <div className="bg-white/80 backdrop-blur rounded-lg border border-gray-200 p-4">
            <SearchBar onSearch={onSearch} />
          </div>

          <Player track={current} playlist={results} onPrev={onPrev} onNext={onNext} />

          <div className="text-xs text-gray-500">Fast playback demo. Click any track to play instantly.</div>
        </section>

        <aside className="col-span-12 lg:col-span-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Library</h2>
          <TrackList tracks={results} currentId={current?.id} onSelect={playTrack} />
        </aside>
      </main>

      <footer className="py-6 text-center text-xs text-gray-500">
        Built for quick validation — small catalog, instant play.
      </footer>
    </div>
  );
}

export default App;
