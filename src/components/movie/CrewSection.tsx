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
    <section className="py-10" data-testid="crew-section">
      <h2
        className="text-2xl font-bold mb-6"
        data-testid="crew-section-title"
      >
        Crew
      </h2>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        data-testid="crew-grid"
      >
        {importantDepartments.map((dept) => {
          const departmentCrew = departments[dept];
          if (!departmentCrew || departmentCrew.length === 0)
            return null;

          return (
            <div
              key={dept}
              className="bg-gray-800 rounded-lg p-4"
              data-testid={`crew-department-${dept}`}
            >
              <h3
                className="text-xl font-semibold mb-3"
                data-testid={`crew-department-title-${dept}`}
              >
                {dept}
              </h3>
              <ul className="space-y-2">
                {departmentCrew.slice(0, 3).map((person) => (
                  <li
                    key={`${person.id}-${person.job}`}
                    className="flex justify-between"
                    data-testid={`crew-person-${
                      person.id
                    }-${person.job.replace(/\s+/g, "-")}`}
                  >
                    <span
                      className="font-medium"
                      data-testid={`crew-name-${person.id}`}
                    >
                      {person.name}
                    </span>
                    <span
                      className="text-sm text-gray-400"
                      data-testid={`crew-job-${person.id}`}
                    >
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
