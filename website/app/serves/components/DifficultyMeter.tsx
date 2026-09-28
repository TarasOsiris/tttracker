interface DifficultyMeterProps {
  level: number; // 1-5
  max?: number;
}

export function DifficultyMeter({ level, max = 5 }: DifficultyMeterProps) {
  return (
    <div className="flex items-center gap-1" title={`Difficulty: ${level}/${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className={`h-2.5 w-2.5 rounded-full ${
            i < level
              ? level <= 2
                ? "bg-green-500"
                : level <= 3
                  ? "bg-yellow-500"
                  : "bg-red-500"
              : "bg-heat-0"
          }`}
        />
      ))}
    </div>
  );
}
