import PropTypes from "prop-types";

export default function TrackList({ tracks, currentId, onSelect }) {
  if (!tracks || tracks.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">No results yet. Try a search!</div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 rounded-md border border-gray-200 overflow-hidden">
      {tracks.map((t) => (
        <li
          key={t.id}
          className={`flex items-center justify-between p-3 bg-white/70 ${
            t.id === currentId ? "bg-indigo-50" : ""
          }`}
        >
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{t.title}</p>
            <p className="text-xs text-gray-500 truncate">{t.artist}</p>
          </div>
          <button
            onClick={() => onSelect(t)}
            className="px-3 py-1.5 text-sm rounded-md border border-gray-300 hover:bg-gray-50"
          >
            {t.id === currentId ? "Playing" : "Play"}
          </button>
        </li>
      ))}
    </ul>
  );
}

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      cover: PropTypes.string,
    })
  ),
  currentId: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};