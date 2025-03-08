import { Crew } from "@/src/types/MovieCredits";

interface CrewSectionProps {
  crew: Crew[];
}

export default function CrewSection({ crew }: CrewSectionProps) {
  const departments = crew.reduce((acc, person) => {
    const dept = person.department;
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(person);
    return acc;
  }, {} as Record<string, Crew[]>);

  const importantDepartments = [
    "Directing",
    "Writing",
    "Production",
    "Sound",
    "Camera",
  ];

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Crew</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {importantDepartments.map((dept) => {
          const departmentCrew = departments[dept];
          if (!departmentCrew || departmentCrew.length === 0)
            return null;

          return (
            <div key={dept} className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-3">{dept}</h3>
              <ul className="space-y-2">
                {departmentCrew.slice(0, 3).map((person) => (
                  <li
                    key={`${person.id}-${person.job}`}
                    className="flex justify-between"
                  >
                    <span className="font-medium">{person.name}</span>
                    <span className="text-sm text-gray-400">
                      {person.job}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
