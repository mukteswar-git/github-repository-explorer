function EmptyState({ title, description }) {
  return (
    <div
      className="
        py-20
        text-center
      "
    >
      <h2
        className="
          text-2xl
          font-semibold
          text-slate-300
        "
      >
        {title}
      </h2>

      {description && (
        <p
          className="
              mt-3
              text-slate-500
            "
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default EmptyState;
