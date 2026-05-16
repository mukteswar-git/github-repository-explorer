function RepoDetailsSkeleton() {
  return (
    <div
      className="
        animate-pulse
        rounded-xl
        border
        border-slate-700
        bg-slate-800
        p-6
      "
    >
      <div className="flex gap-4">
        <div
          className="
            h-16
            w-16
            rounded-full
            bg-slate-700
          "
        />

        <div className="flex-1">
          <div
            className="
              h-8
              w-64
              rounded
              bg-slate-700
            "
          />

          <div
            className="
              mt-3
              h-4
              w-40
              rounded
              bg-slate-700
            "
          />
        </div>
      </div>

      <div
        className="
          mt-8
          h-4
          w-full
          rounded
          bg-slate-700
        "
      />

      <div
        className="
          mt-3
          h-4
          w-3/4
          rounded
          bg-slate-700
        "
      />
    </div>
  );
}

export default RepoDetailsSkeleton;
