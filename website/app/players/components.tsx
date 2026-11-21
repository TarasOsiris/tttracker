import { Link } from "react-router";
import { formatDate } from "~/content/blog";
import { Credit } from "~/equipment/components/Media";
import { flag } from "~/equipment/labels";
import type { ProfileSummary } from "./models";

export function PlayerCard({ player }: { player: ProfileSummary }) {
  return (
    <li className="group overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/60">
      <Link to={`/players/${player.id}`} className="block focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          {player.photo && (
            <img src={player.photo.src} width={player.photo.width} height={player.photo.height} alt={player.name}
              loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
          )}
          <span className="absolute start-3 top-3 rounded-full bg-background px-3 py-1 text-sm font-semibold shadow-sm">
            World #{player.rank}
          </span>
        </div>
        <div className="space-y-2 p-4">
          <p className="text-sm text-muted-foreground"><span aria-hidden="true">{flag(player.country)} </span>{player.countryName}</p>
          <h3 className="font-display text-lg leading-tight font-bold tracking-tight group-hover:text-primary">{player.name}</h3>
          <p className="text-sm text-muted-foreground">{player.specialty}</p>
          <p className="text-sm font-medium text-primary">Explore profile</p>
        </div>
      </Link>
      {player.photo && <p className="px-4 pb-4 text-xs text-muted-foreground">Photo: <Credit image={player.photo} /></p>}
    </li>
  );
}

export function RankingNote({ date, week, officialUrl }: { date: string; week: number; officialUrl: string }) {
  return (
    <p className="text-sm leading-relaxed text-muted-foreground">
      Singles rankings as published <time dateTime={date}>{formatDate(date)}</time> · ITTF week {week}.
      This is a dated selection, updated editorially. <a href={officialUrl} target="_blank" rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-4">Check the latest ITTF rankings</a>.
    </p>
  );
}
