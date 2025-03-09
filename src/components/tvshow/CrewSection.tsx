import { Crew } from "@/src/types/TVShowCredits";

interface CrewSectionProps {
  crew: Crew[];
}

export default function CrewSection({ crew }: CrewSectionProps) {
  const uniqueCrewByDepartment = new Map<string, Crew[]>();

  // Group crew by department
  crew.forEach((person) => {
    if (!uniqueCrewByDepartment.has(person.department)) {
      uniqueCrewByDepartment.set(person.department, []);
    }
    const departmentCrew = uniqueCrewByDepartment.get(
      person.department,
    );

    // Check if this person with the same job is already in the department
    const exists = departmentCrew?.some(
      (p) => p.id === person.id && p.job === person.job,
    );

    if (!exists) {
      uniqueCrewByDepartment.get(person.department)?.push(person);
    }
  });

  // Sort departments by importance
  const sortedDepartments = Array.from(
    uniqueCrewByDepartment.entries(),
  ).sort(([depA], [depB]) => {
    // Custom sorting order
    const order = [
      "Production",
      "Directing",
      "Writing",
      "Sound",
      "Camera",
      "Editing",
      "Art",
      "Costume & Make-Up",
      "Visual Effects",
    ];

    const indexA = order.indexOf(depA);
    const indexB = order.indexOf(depB);

    // If both departments are in the order array, sort by their position
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    // If only depA is in the order array, prioritize it
    if (indexA !== -1) return -1;
    // If only depB is in the order array, prioritize it
    if (indexB !== -1) return 1;
    // If neither is in the order array, sort alphabetically
    return depA.localeCompare(depB);
  });

  // Take only the most important departments
  const importantDepartments = sortedDepartments.slice(0, 4);

  return (
    <div className="py-8 border-t border-gray-800">
      <h2 className="text-2xl font-bold mb-6">Crew</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {importantDepartments.map(([department, departmentCrew]) => (
          <div key={department}>
            <h3 className="text-lg font-semibold mb-3">
              {department}
            </h3>
            <ul className="space-y-2">
              {departmentCrew
                .sort((a, b) => a.job.localeCompare(b.job))
                .slice(0, 6) // Show only top 6 crew members per department
                .map((person, index) => (
                  <li
                    key={`${person.id}-${index}`}
                    className="text-gray-300"
                  >
                    <span className="font-medium">{person.name}</span>
                    <span className="text-gray-500 text-sm block">
                      {person.job}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
