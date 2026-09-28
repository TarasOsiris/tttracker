import { Link } from "../navigation";
import type { EnrichedServe } from "../models";
import { useLanguage } from "../context";
import { useFavorites } from "../hooks/useFavorites";
import { DifficultyMeter } from "./DifficultyMeter";
import { Tag } from "./Tag";
import { eSpeed, eBounce } from "../utils/emoji";
import { Heart } from "lucide-react";

interface ServeCardProps {
  serve: EnrichedServe;
}

const speedColor: Record<string, "green" | "yellow" | "red"> = {
  slow: "green",
  medium: "yellow",
  fast: "red",
};

export function ServeCard({ serve }: ServeCardProps) {
  const { language, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(serve.id);

  return (
    <Link
      to={`/serves/${serve.id}`}
      className="block rounded-3xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-foreground leading-tight">{serve.name}</h3>
        <div className="flex shrink-0 items-center gap-1">
          <DifficultyMeter level={serve.difficulty} />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(serve.id);
            }}
            className="rounded-full p-0.5 text-muted-foreground transition-colors hover:text-red-500"
            aria-label={favorited ? t("serveCard.unfavorite") : t("serveCard.favorite")}
          >
            <Heart className={`size-4 ${favorited ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        <Tag label={serve.motion.name} color="blue" />
        <Tag label={serve.spinProfile.name} color="purple" />
        <Tag label={eBounce(serve.bounce.category, language)} color={serve.bounce.risk === "high" ? "red" : serve.bounce.risk === "medium" ? "yellow" : "green"} />
        <Tag label={eSpeed(serve.speed.label, language)} color={speedColor[serve.speed.label]} />
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2">{serve.description}</p>

      {serve.legalityNotes && (
        <div className="mt-2 rounded bg-red-50 px-2 py-1 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-400">
          ⚠️ {t("serveCard.legalityConcern")}
        </div>
      )}
    </Link>
  );
}
