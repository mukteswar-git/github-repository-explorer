function ProfileSkeleton() {
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
      <div
        className="
          flex
          flex-col
          gap-6
          md:flex-row
        "
      >
        <div
          className="
            h-32
            w-32
            rounded-full
            bg-slate-700
          "
        />

        <div className="flex-1">
          <div
            className="
              h-8
              w-48
              rounded
              bg-slate-700
            "
          />

          <div
            className="
              mt-4
              h-4
              w-32
              rounded
              bg-slate-700
            "
          />

          <div
            className="
              mt-6
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
      </div>
    </div>
  );
}

export default ProfileSkeleton;
