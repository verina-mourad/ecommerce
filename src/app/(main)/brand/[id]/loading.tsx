export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-80 rounded-2xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
