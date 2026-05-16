function RepoCardSkeleton() {
  return (
    <div
      className="
        animate-pulse
        rounded-xl
        border
        border-slate-700
        bg-slate-800
        p-5
      "
    >
      <div className="flex gap-3">
        <div className="h-12 w-12 rounded-full bg-slate-700" />

        <div className="flex-1">
          <div className="mb-2 h-4 w-40 rounded bg-slate-700" />

          <div className="h-3 w-24 rounded bg-slate-700" />
        </div>
      </div>

      <div className="mt-4 h-3 w-full rounded bg-slate-700" />

      <div className="mt-2 h-3 w-3/4 rounded bg-slate-700" />

      <div className="mt-4 flex gap-4">
        <div className="h-3 w-12 rounded bg-slate-700" />

        <div className="h-3 w-12 rounded bg-slate-700" />

        <div className="h-3 w-12 rounded bg-slate-700" />
      </div>
    </div>
  );
}

export default RepoCardSkeleton;
