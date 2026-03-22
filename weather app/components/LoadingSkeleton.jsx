export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="glass-card h-48 animate-pulse rounded-3xl" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="glass-card h-24 animate-pulse rounded-2xl" />
        ))}
      </div>
      <div className="glass-card h-52 animate-pulse rounded-3xl" />
      <div className="glass-card h-40 animate-pulse rounded-3xl" />
    </div>
  );
}
