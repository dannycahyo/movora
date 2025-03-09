import Image from "next/image";
import { Cast } from "@/src/types/TVShowCredits";

interface CastSectionProps {
  cast: Cast[];
}

export default function CastSection({ cast }: CastSectionProps) {
  // Display only top cast members
  const displayCast = cast.slice(0, 12);

  return (
    <div data-testid="cast-section" className="py-10">
      <h2
        data-testid="cast-section-title"
        className="text-2xl font-bold mb-6"
      >
        Cast
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {displayCast.map((person, index) => (
          <div
            key={person.id}
            className="bg-gray-800 rounded-lg overflow-hidden"
          >
            <div className="relative aspect-[2/3]">
              <Image
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                    : "/images/no-profile.png"
                }
                alt={person.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div className="p-3">
              <h3
                data-testid={`cast-name-${index + 1}`}
                className="font-medium text-sm"
              >
                {person.name}
              </h3>
              <p
                data-testid={`cast-character-${index + 1}`}
                className="text-gray-400 text-xs mt-1"
              >
                {person.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
