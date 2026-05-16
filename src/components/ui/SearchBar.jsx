import { useState } from "react";

function SearchBar({ value, onChange, sort, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "Stars", value: "stars" },
    { label: "Forks", value: "forks" },
    { label: "Recently Updated", value: "updated" },
  ];

  const selectedOption = options.find(
    (option) => option.value === sort
  );

  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search GitHub repositories..."
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-lg
          border
          border-slate-700
          bg-slate-800
          px-4
          py-3
          text-white
          outline-none
          focus:border-blue-500
        "
      />

      <div className="relative mt-4 w-56">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="
            flex
            w-full
            items-center
            justify-between
            rounded-lg
            border
            border-slate-700
            bg-slate-800
            px-4
            py-3
            text-white
            transition
            hover:border-slate-600
          "
        >
          <span>{selectedOption.label}</span>

          <span
            className={`
              transition-transform duration-200
              ${isOpen ? "rotate-180" : ""}
            `}
          >
            ▼
          </span>
        </button>

        {isOpen && (
          <div
            className="
              absolute
              z-50
              mt-2
              w-full
              overflow-hidden
              rounded-lg
              border
              border-slate-700
              bg-slate-800
              shadow-lg
            "
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onSortChange({
                    target: {
                      value: option.value,
                    },
                  });

                  setIsOpen(false);
                }}
                className="
                  block
                  w-full
                  px-4
                  py-3
                  text-left
                  text-sm
                  text-slate-200
                  transition
                  hover:bg-slate-700
                "
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;