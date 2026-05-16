import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-slate-700
        bg-slate-900/80
        backdrop-blur
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-4
          py-4
        "
      >
        <Link
          to="/"
          className="
            text-2xl
            font-bold
            text-white
          "
        >
          GitHub Explorer
        </Link>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="
            text-slate-400
            transition
            hover:text-white
          "
        >
          GitHub
        </a>
      </div>
    </header>
  );
}

export default Navbar;
