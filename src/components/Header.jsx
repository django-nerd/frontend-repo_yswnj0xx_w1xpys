import { User } from "lucide-react";
import PropTypes from "prop-types";

export default function Header({ user, onToggleAuth }) {
  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/90 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
          <span className="font-semibold text-gray-800 tracking-tight">WaveLite</span>
        </div>
        <button
          onClick={onToggleAuth}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
        >
          <User className="h-4 w-4" />
          {user ? `Hi, ${user}` : "Sign in"}
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.string,
  onToggleAuth: PropTypes.func.isRequired,
};