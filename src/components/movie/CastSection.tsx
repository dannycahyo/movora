import Image from "next/image";
import { Cast } from "@/src/types/MovieCredits";

interface CastSectionProps {
  cast: Cast[];
}

export default function CastSection({ cast }: CastSectionProps) {
  const topCast = cast.slice(0, 10);

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Top Cast</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {topCast.map((person) => (
          <div
            key={person.cast_id}
            className="bg-gray-800 rounded-lg overflow-hidden"
          >
            <div className="relative w-full h-48">
              {person.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-semibold truncate">
                {person.name}
              </h3>
              <p className="text-sm text-gray-400 truncate">
                {person.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
