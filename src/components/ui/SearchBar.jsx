function SearchBar({ value, onChange }) {
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
    </div>
  );
}

export default SearchBar;
