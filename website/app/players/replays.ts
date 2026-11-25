const videos = [
  { event: "3249", players: ["121582", "135996"], video: "shrAdamlupE", kind: "Highlights", features: ["sora-matsushima", "lin-yun-ju"] },
  { event: "3252", players: ["102832", "123980"], video: "zONYY-ak4E4", kind: "Highlights", features: ["tomokazu-harimoto"] },
  { event: "3242", players: ["135977", "132992"], video: "U4IMuqtHjXI", kind: "Full match", features: ["felix-lebrun", "alexis-lebrun"] },
  { event: "3234", players: ["121558", "121582"], video: "DHxcmcGrpn8", kind: "Highlights", features: ["wang-chuqin"] },
  { event: "3250", players: ["137237", "122044"], video: "8dMXG06mrJY", kind: "Highlights", features: ["lin-shidong", "truls-moregardh"] },
  { event: "3248", players: ["135996", "115641"], video: "f6Xv-6_23vM", kind: "Highlights", features: ["hugo-calderano"] },
  { event: "3250", players: ["114936", "102832"], video: "kfXzhRoZZiA", kind: "Highlights", features: ["jang-woojin"] },
  { event: "3234", players: ["131163", "121411"], video: "9e5Eqa4Edr4", kind: "Highlights", features: ["sun-yingsha", "wang-manyu"] },
  { event: "3248", players: ["136711", "132132"], video: "vh7kTxwItLM", kind: "Full match", features: ["miwa-harimoto", "chen-yi"] },
  { event: "3250", players: ["132132", "135049"], video: "3z-pVatSHfU", kind: "Full match", features: ["kuai-man"] },
  { event: "3246", players: ["121411", "124110"], video: "X0db6pqKBD4", kind: "Highlights", features: ["wang-yidi"] },
  { event: "3252", players: ["133405", "123672"], video: "2nDkvAwSlXA", kind: "Highlights", features: ["hina-hayata", "satsuki-odo"] },
  { event: "3252", players: ["121403", "136711"], video: "8tgINEorSfI", kind: "Highlights", features: ["chen-xingtong"] },
  { event: "3254", players: ["122261", "131036"], video: "SfUdW43qQE0", kind: "Full match", features: ["hitomi-sato"] },
] as const;

export function matchReplay(event: string, players: string[]) {
  const replay = videos.find((item) => item.event === event && item.players.every((id) => players.includes(id)));
  return replay && { url: `https://www.youtube.com/watch?v=${replay.video}`, kind: replay.kind, features: [...replay.features] };
}
