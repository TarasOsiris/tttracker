export const rankingSnapshot = {
  date: "2026-11-23",
  week: 48,
  checked: "2026-11-25",
  officialUrl: "https://www.ittf.com/rankings/",
  sources: [
    { label: "ITTF publication date · week 48", url: "https://www.ittf.com/ittf-table-tennis-world-ranking/" },
    { label: "World Table Tennis · official rankings", url: "https://www.worldtabletennis.com/rankings" },
  ],
  men: [
    { id: "sora-matsushima", rank: 1, points: 7598 },
    { id: "tomokazu-harimoto", rank: 2, points: 6963 },
    { id: "felix-lebrun", rank: 3, points: 6559 },
    { id: "wang-chuqin", rank: 4, points: 6297 },
    { id: "lin-yun-ju", rank: 5, points: 5870 },
    { id: "truls-moregardh", rank: 6, points: 5630 },
    { id: "hugo-calderano", rank: 7, points: 4830 },
    { id: "jang-woojin", rank: 8, points: 4236 },
    { id: "lin-shidong", rank: 9, points: 3686 },
    { id: "alexis-lebrun", rank: 10, points: 3630 },
  ],
  women: [
    { id: "wang-manyu", rank: 1, points: 9265 },
    { id: "sun-yingsha", rank: 2, points: 8575 },
    { id: "miwa-harimoto", rank: 3, points: 6889 },
    { id: "kuai-man", rank: 4, points: 6030 },
    { id: "wang-yidi", rank: 5, points: 5260 },
    { id: "hina-hayata", rank: 6, points: 4770 },
    { id: "chen-xingtong", rank: 7, points: 4660 },
    { id: "chen-yi", rank: 8, points: 4335 },
    { id: "hitomi-sato", rank: 9, points: 4220 },
    { id: "satsuki-odo", rank: 10, points: 3710 },
  ],
};

export const profileIds = [...rankingSnapshot.men, ...rankingSnapshot.women].map((p) => p.id);
