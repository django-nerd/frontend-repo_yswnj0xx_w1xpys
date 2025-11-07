import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export default function Player({ track, playlist, onPrev, onNext }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Auto play when track changes
  useEffect(() => {
    if (!audioRef.current) return;
    if (track?.url) {
      const play = async () => {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (e) {
          setIsPlaying(false);
        }
      };
      // small delay to ensure src set
      setTimeout(play, 50);
    }
  }, [track]);

  const toggle = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {}
    }
  };

  const onTime = () => {
    if (!audioRef.current) return;
    const p = (audioRef.current.currentTime / audioRef.current.duration) * 100 || 0;
    setProgress(p);
  };

  const seek = (e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * (audioRef.current.duration || 0);
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onNext);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onNext);
    };
  }, [onNext]);

  return (
    <div className="w-full bg-white/80 border border-gray-200 rounded-lg p-4">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-md bg-gradient-to-br from-indigo-500 to-fuchsia-500 overflow-hidden flex-shrink-0">
          {track?.cover ? (
            <img src={track.cover} alt="cover" className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 truncate">
            {track ? track.title : "Nothing playing"}
          </p>
          <p className="text-xs text-gray-500 truncate">{track?.artist ?? ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
            aria-label="Previous"
          >
            <SkipBack className="h-4 w-4" />
          </button>
          <button
            onClick={toggle}
            className="p-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            aria-label="Play/Pause"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            onClick={onNext}
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
            aria-label="Next"
          >
            <SkipForward className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div
          className="w-full h-2 bg-gray-200 rounded cursor-pointer"
          onClick={seek}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
        >
          <div
            className="h-2 bg-indigo-600 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <audio ref={audioRef} src={track?.url || ""} preload="metadata" />
    </div>
  );
}

Player.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    cover: PropTypes.string,
  }),
  playlist: PropTypes.array,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};