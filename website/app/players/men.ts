import type { PlayerProfile } from "./models";

export const menProfiles: PlayerProfile[] = [
  {
    id: "sora-matsushima", birthDate: "2007-04-29", birthYear: 2007,
    headline: "Japan’s left-handed breakthrough at the very top of the sport.",
    specialty: "Left-handed counterattack",
    bio: [
      "Sora Matsushima’s journey runs from a World Youth U15 singles title in 2021 to the senior world No. 1 position in October 2026. He became Japan’s first men’s singles ranking leader since Seiji Ono in 1980, and the first player from outside China to lead the list since Dimitrij Ovtcharov in 2018.",
      "His senior breakthrough gathered pace with the 2025 All Japan singles championship and a WTT Champions title in Frankfurt. In 2026, a World Cup final and singles victories at the US Smash and China Smash gave that rise substance across the biggest events. His left-handed attacking game makes him a useful player to study for changes of angle and quick transitions between the two wings.",
    ],
    milestones: [
      { year: "2021", title: "World Youth U15 champion", detail: "Won the U15 boys’ singles title in Vila Nova de Gaia.", source: 1 },
      { year: "2025", title: "National and Champions success", detail: "Won the All Japan men’s singles championship and WTT Champions Frankfurt.", source: 0 },
      { year: "2026", title: "Two Smash singles titles", detail: "Won the US Smash and China Smash; also reached the men’s World Cup final.", source: 0 },
      { year: "2026", title: "World No. 1", detail: "Reached the top of the ITTF men’s singles ranking on 5 October.", source: 1 },
    ],
    game: [
      { title: "Angles from the left side", description: "The left-handed forehand changes the usual crosscourt geometry against a right-hander. Look for an opening to the wide forehand followed by a ball into the playing elbow." },
      { title: "A compact counter", description: "Study how little preparation is available when he stays near the table. A short backswing leaves time to adjust to an opponent’s change of direction." },
      { title: "Transition footwork", description: "The shot after an attack matters as much as the attack itself. Follow the recovery step that puts both forehand and backhand back in play." },
    ],
    watch: ["Where does his first topspin land against a right-hander?", "Does he counter early or give himself more space?", "Watch his feet immediately after playing wide."],
    practice: { title: "Open, recover, counter", steps: ["Start with a backspin feed to one fixed corner and play a controlled opening topspin.", "Have a partner block to the other wing; recover and counter at a comfortable pace.", "Complete five clean sequences before allowing the block to go to either corner."], goal: "Count successful recoveries, rather than outright winners." },
    sources: [
      { label: "Butterfly · biography and career results", url: "https://www.butterfly-global.com/en/sponsoring/detail/matsushima-sora.html" },
      { label: "ITTF · Matsushima reaches world No. 1", url: "https://www.ittf.com/2026/10/05/sora-matsushima-becomes-first-non-chinese-world-no-1-since-2018/" },
    ],
  },
  {
    id: "tomokazu-harimoto", birthDate: "2003-06-27", birthYear: 2003,
    headline: "Early timing, relentless pressure and a career built on breaking through young.",
    specialty: "Close-table backhand pressure",
    bio: [
      "Tomokazu Harimoto is a Japanese attacker whose career has progressed from precocious international success to major senior titles. His compact, close-table game is a particularly useful reference for players who want to take time away from an opponent without making every stroke bigger.",
      "His recent record includes the 2025 WTT Finals Hong Kong singles title and a strong 2026 season: singles victories at WTT Champions Yokohama and Frankfurt, the Asian singles championship, and a World Team Championships silver medal with Japan. His sister Miwa is also in this edition’s singles top 10. Their shared surname appears across the elite game, but each has a distinct profile and career.",
    ],
    milestones: [
      { year: "2025", title: "WTT Finals champion", detail: "Won the men’s singles title at the season-ending WTT Finals in Hong Kong.", source: 0 },
      { year: "2026", title: "World team silver", detail: "Helped Japan finish runner-up at the World Team Championships.", source: 0 },
      { year: "2026", title: "Asian singles champion", detail: "Won the men’s singles championship in Tashkent.", source: 0 },
      { year: "2026", title: "Frankfurt champion", detail: "Added the WTT Champions Frankfurt title to his Yokohama success earlier in the year.", source: 0 },
    ],
    game: [
      { title: "Backhand at the bounce", description: "An early contact can redirect an opponent’s pace before they recover. Track the racket’s starting position and the small movement into the ball." },
      { title: "Pressure through placement", description: "Fast exchanges become more difficult when the target changes. Watch for the switch from a comfortable crosscourt rally into the opponent’s body." },
      { title: "Staying available on both wings", description: "A strong backhand still needs a ready forehand. Notice the balanced stance between strokes and the adjustment when a ball arrives at the elbow." },
    ],
    watch: ["How far from the table is his contact point?", "Which ball prompts a backhand down the line?", "Follow his racket recovery between two fast backhands."],
    practice: { title: "Backhand pressure with a purpose", steps: ["Play eight controlled backhands crosscourt with a partner.", "On the next ball, place a backhand toward a marked target near the middle.", "Recover for one more ball instead of stopping after the change of direction."], goal: "Make the change accurately at rally speed before increasing pace." },
    sources: [{ label: "Butterfly · birth date and major achievements", url: "https://www.butterfly-global.com/en/sponsoring/detail/harimoto-tomokazu.html" }],
  },
  {
    id: "felix-lebrun", birthDate: "2006-09-12", birthYear: 2006,
    headline: "Modern penhold at full speed, with two Olympic medals already on the board.",
    specialty: "Penhold speed and reverse backhand",
    bio: [
      "Félix Lebrun is a French right-handed penholder who grew up in a table tennis family alongside his older brother Alexis. The brothers use different grips: Félix plays penhold, while Alexis plays shakehand. Félix’s international breakthrough included the 2023 European Games singles title, followed by singles and team bronze medals at Paris 2024.",
      "His penhold game combines quick exchanges with a reverse penhold backhand, using the back face of the racket to attack. In 2024 he also won WTT Champions Montpellier and the European doubles championship with Alexis. Those results make his profile a meeting point between an unusual grip in European elite table tennis and thoroughly modern, two-wing attacking play.",
    ],
    milestones: [
      { year: "2023", title: "European Games gold", detail: "Won the singles final against Marcos Freitas in seven games.", source: 1 },
      { year: "2024", title: "Two Olympic bronzes", detail: "Reached the singles podium and helped France win team bronze in Paris.", source: 0 },
      { year: "2024", title: "Montpellier champion", detail: "Won his first WTT Champions singles title on home ground.", source: 0 },
      { year: "2024", title: "European doubles champion", detail: "Partnered Alexis Lebrun to the men’s doubles title in Linz.", source: 0 },
    ],
    game: [
      { title: "Reverse penhold backhand", description: "Watch the back face of the racket and the elbow’s position. The stroke lets a penholder stay in a fast backhand exchange without stepping around every ball." },
      { title: "Time taken away", description: "Short preparation and early contact can be more disruptive than a harder hit. Look at how close to the bounce the ball is taken in quick exchanges." },
      { title: "Serve into the next ball", description: "Treat the serve and first attack as one pattern. Observe which receive he invites and how his ready position anticipates it." },
    ],
    watch: ["Which side of the racket contacts each backhand?", "When does he step around instead of using the backhand?", "Watch the first recovery after a short receive."],
    practice: { title: "Fast hands, controlled placement", steps: ["Rally backhand to backhand at a pace where both players can stay close to the table.", "Alternate five crosscourt balls with one ball to the middle.", "Penholders can use reverse backhand; shakehand players can practise the same timing pattern."], goal: "Keep the preparation short and complete ten placement changes." },
    sources: [
      { label: "Tibhar · playing style and major results", url: "https://tibhar.info/en/pro-player/felix-lebrun/" },
      { label: "ETTU · family background, birth date and European Games", url: "https://www.ettu.org/en-n-news-2024-october-f-lix-lebrun-in-pursuit-of-glory-at-the-liebherr-european-championships/" },
    ],
  },
  {
    id: "wang-chuqin", birthDate: "2000-05-11", birthYear: 2000,
    headline: "A left-handed world champion with Olympic gold in two disciplines.",
    specialty: "Serve, receive and first attack",
    bio: [
      "Wang Chuqin is a Chinese left-handed shakehand attacker and the 2025 men’s singles world champion. He won that title in Doha by defeating Hugo Calderano, adding a defining singles achievement to an already substantial doubles and team career.",
      "At Paris 2024 he won mixed doubles gold with Sun Yingsha and men’s team gold with China. His earlier World Championships successes include men’s doubles gold with Ma Long in 2019. For a learner, his matches offer a way to study how an advantage is established before the open rally: serve placement, assertive receive, and a first attack that leaves the next ball manageable.",
    ],
    milestones: [
      { year: "2019", title: "World doubles champion", detail: "Won men’s doubles with Ma Long in Budapest.", source: 0 },
      { year: "2023", title: "World mixed doubles champion", detail: "Won the mixed doubles title with Sun Yingsha in Durban.", source: 0 },
      { year: "2024", title: "Two Olympic golds", detail: "Won mixed doubles with Sun Yingsha and the men’s team event in Paris.", source: 0 },
      { year: "2025", title: "Singles world champion", detail: "Beat Hugo Calderano 4–1 in the Doha men’s singles final.", source: 0 },
    ],
    game: [
      { title: "The first three balls", description: "Look for the relationship between a serve’s length and his next position. A good setup can produce an attackable receive without needing an outright service winner." },
      { title: "Left-handed forehand geometry", description: "Against a right-hander, the natural diagonal changes. Watch the combination of a wide ball and a follow-up toward the body rather than treating each attack separately." },
      { title: "Active receive", description: "Separate short touch, deep push and attacking receive when studying a match. The choice changes how much initiative the server retains." },
    ],
    watch: ["Which serves produce a long receive?", "Where does he stand before the third ball?", "Does the opening attack target a corner or the elbow?"],
    practice: { title: "Build a third-ball pattern", steps: ["Serve short backspin to a chosen zone.", "Ask a partner to push long to a fixed corner and open with topspin to the middle.", "Let the next ball become free play, keeping a tally of balanced first attacks."], goal: "Land seven of ten opening attacks while staying ready for the block." },
    sources: [{ label: "Wikipedia · biography, Olympic medals and world titles", url: "https://en.wikipedia.org/wiki/Wang_Chuqin" }],
  },
  {
    id: "lin-yun-ju", birthDate: "2001-08-17", birthYear: 2001,
    headline: "A left-handed technician who turns the receive into an attacking opportunity.",
    specialty: "Backhand receive and timing",
    bio: [
      "Lin Yun-Ju represents Chinese Taipei and plays left-handed with a shakehand grip. His major results span singles and doubles: mixed doubles bronze at the Tokyo Olympics, WTT Champions Frankfurt singles gold in 2023, and a men’s doubles silver medal at the 2025 World Championships.",
      "In 2026 he won WTT Champions Doha and reached the singles finals at the Singapore Smash and China Smash. His game is a useful study in initiative: a compact backhand receive, well-timed changes of direction and a calm transition into the rally. Study the placement and recovery as closely as the eye-catching wrist action.",
    ],
    milestones: [
      { year: "2021", title: "Olympic mixed doubles bronze", detail: "Reached the Tokyo podium for Chinese Taipei.", source: 0 },
      { year: "2023", title: "Frankfurt singles champion", detail: "Won the WTT Champions title in Germany.", source: 0 },
      { year: "2025", title: "World doubles silver", detail: "Finished runner-up in men’s doubles at the World Championships.", source: 0 },
      { year: "2026", title: "Doha title and Smash finals", detail: "Won WTT Champions Doha and reached the Singapore and China Smash singles finals.", source: 0 },
    ],
    game: [
      { title: "Backhand receive", description: "An over-table attack starts with getting close enough to the ball. Watch the step under the table before focusing on the hand and racket angle." },
      { title: "Direction with small preparation", description: "Similar preparations can send a ball to different zones. Follow the contact point and the opponent’s position to see why a small change can matter." },
      { title: "A quiet recovery", description: "After a receive attack, the rally is still alive. Observe how the racket returns to a neutral position and how quickly the feet clear the table." },
    ],
    watch: ["Which short serves does he attack with backhand?", "Where is his free foot during the receive?", "What happens on the ball after the flick?"],
    practice: { title: "Receive and get out", steps: ["Have a partner serve a predictable short ball with light spin.", "Step in and play a controlled flick or short touch to a target.", "Step back into a neutral stance and play the next ball to either wing."], goal: "Finish each receive balanced enough to continue the rally." },
    sources: [{ label: "Butterfly · birth date and career achievements", url: "https://www.butterfly-global.com/en/sponsoring/detail/lin-yunju.html" }],
  },
  {
    id: "truls-moregardh", birthDate: "2002-02-16", birthYear: 2002,
    headline: "Sweden’s Olympic silver medallist and a master of changing the rhythm.",
    specialty: "Creative placement and variation",
    bio: [
      "Truls Möregårdh is a Swedish right-handed attacker whose game is known for variation, inventive blocks and sudden changes of pace. He won men’s singles and men’s team silver medals at Paris 2024, bringing his distinctive style to one of the sport’s largest stages.",
      "His sponsor’s career record also includes singles titles at the 2025 Europe Smash, 2025 WTT Champions Montpellier and 2026 WTT Champions Macao. The recognisable Cybershape racket is only part of the story: his matches are especially useful for studying how a different speed or placement can unsettle a rally that an opponent thought was predictable.",
    ],
    milestones: [
      { year: "2024", title: "Olympic singles silver", detail: "Reached the men’s singles final in Paris.", source: 0 },
      { year: "2024", title: "Olympic team silver", detail: "Helped Sweden reach the men’s team final at the same Games.", source: 0 },
      { year: "2025", title: "Europe Smash champion", detail: "Won the men’s singles title in Sweden and WTT Champions Montpellier.", source: 0 },
      { year: "2026", title: "Macao champion", detail: "Won the men’s singles title at WTT Champions Macao.", source: 0 },
    ],
    game: [
      { title: "Changing the rhythm", description: "A softer ball can be a deliberate attacking choice. Watch whether a reduced pace pulls the opponent forward or changes the height of their next contact." },
      { title: "Block placement", description: "In a block exchange, direction can be more valuable than speed. Follow how a small racket adjustment turns the next attack into a moving shot." },
      { title: "Forehand after variation", description: "The creative shot often sets up something simpler. Track the forehand opportunity that follows a disrupted rhythm rather than watching only the spectacular contact." },
    ],
    watch: ["Which slower balls force an extra step?", "When does he block to the opponent’s forehand?", "What ordinary shot follows an unusual one?"],
    practice: { title: "Change pace, keep control", steps: ["Ask a partner to loop steadily to your backhand.", "Alternate two normal blocks with one softer block, keeping the ball low.", "Add a controlled change down the line when both players can maintain the sequence."], goal: "Change the opponent’s timing without giving away height." },
    sources: [
      { label: "STIGA · style and career highlights", url: "https://www.stigasports.com/en-row/players-teams-tt/truls-moregardh" },
      { label: "Europe Top 16 · player biography and birth date", url: "https://top16montreux.com/wp-content/uploads/2026/01/Top16-Montreux-Truls-Moregardh.pdf" },
    ],
  },
  {
    id: "hugo-calderano", birthDate: "1996-06-22", birthYear: 1996,
    headline: "Brazil’s World Cup champion and a landmark figure for the Americas.",
    specialty: "Athletic two-wing power",
    bio: [
      "Hugo Calderano was born in Rio de Janeiro and became a standard-bearer for Brazilian table tennis. In 2025 he won the men’s World Cup and reached the World Championships singles final, the first player from outside Asia and Europe to reach that final.",
      "His own career timeline records a rise to world No. 2 in February 2026, another World Cup podium that April, and further continental success. His strong two-wing attack is useful to study alongside his movement: power becomes more repeatable when the legs create space for the stroke and the player recovers before the next ball.",
    ],
    milestones: [
      { year: "2025", title: "World Cup champion", detail: "Won the ITTF men’s World Cup in Macao, a breakthrough for the Americas.", source: 0 },
      { year: "2025", title: "World Championships silver", detail: "Became the first player from outside Asia and Europe to reach the singles final.", source: 0 },
      { year: "2026", title: "Career-high No. 2", detail: "Reached second in the ITTF singles world ranking in February.", source: 0 },
      { year: "2026", title: "Another World Cup podium", detail: "Finished third in Macao and won a seventh Pan American Championships singles title in October.", source: 0 },
    ],
    game: [
      { title: "Power with room to swing", description: "Watch the small spacing adjustments before a hard attack. Moving away from the ball slightly can create a much cleaner contact than swinging harder from a cramped position." },
      { title: "Both wings as weapons", description: "A strong backhand reduces the need to pivot around every ball. Observe when he stays square and when he commits to a forehand from the backhand corner." },
      { title: "Recovery after acceleration", description: "The hardest attack still needs a next position. Follow the landing and recovery step rather than allowing the speed of the shot to hide the footwork." },
    ],
    watch: ["How does he create distance from a ball into the body?", "When does he choose backhand instead of a pivot?", "Where do his feet land after a wide forehand?"],
    practice: { title: "Power from good spacing", steps: ["Play two controlled backhands, then a forehand from the middle.", "Have a partner vary the forehand feed slightly so you must adjust your feet.", "Finish with a recovery ball to the backhand, keeping the pace below maximum."], goal: "Complete five balanced four-ball sequences before adding speed." },
    sources: [
      { label: "Hugo Calderano · official career timeline", url: "https://www.hugocalderano.com/en/timeline/" },
      { label: "JOOLA · player and equipment collection", url: "https://joola.com/pages/hugo-calderano" },
    ],
  },
  {
    id: "jang-woojin", birthDate: "1995-09-10", birthYear: 1995,
    headline: "Korean forehand firepower, world doubles medals and a Champions breakthrough.",
    specialty: "Forehand initiative and footwork",
    bio: [
      "Jang Woojin is a South Korean right-handed shakehand attacker. His international record includes a World Junior singles title in 2013 and men’s doubles silver medals at the 2021 and 2023 World Championships with Lim Jonghoon.",
      "In November 2026 he won WTT Champions Montpellier, adding a major singles result to a career already rich in doubles success. His game offers a clear study theme: creating forehand opportunities while still covering the space left behind. Watch how the serve and first movement influence whether a large forehand is a sound decision.",
    ],
    milestones: [
      { year: "2013", title: "World Junior champion", detail: "Won the boys’ singles title at the World Junior Championships.", source: 0 },
      { year: "2018", title: "Korea Open triple crown", detail: "Won singles, men’s doubles and mixed doubles at his home World Tour event.", source: 0 },
      { year: "2021–2023", title: "Two world doubles silvers", detail: "Reached consecutive World Championships men’s doubles finals with Lim Jonghoon.", source: 0 },
      { year: "2026", title: "Montpellier champion", detail: "Won his first WTT Champions singles title in Montpellier.", source: 1 },
    ],
    game: [
      { title: "Forehand initiative", description: "A forehand-led pattern starts before the forehand. Look at serve placement and the first step to understand why the attacking ball becomes available." },
      { title: "Covering the open corner", description: "A pivot creates both opportunity and risk. Watch whether the next recovery covers a wide block before judging the quality of the initial attack." },
      { title: "Doubles movement", description: "Doubles makes recovery visible because the partner needs space. Follow how the striker exits the hitting lane and prepares to re-enter for the next turn." },
    ],
    watch: ["Which receives trigger a step-around forehand?", "How quickly does he cover the wide forehand after pivoting?", "In doubles, which direction does he move after contact?"],
    practice: { title: "Pivot with an exit plan", steps: ["Receive a predictable long push into the backhand corner.", "Step around and play a forehand topspin at controlled pace.", "Have the partner block wide to the forehand; recover and make the next ball."], goal: "Count the second forehand as the successful completion of the drill." },
    sources: [
      { label: "Wikipedia · biography and international medal record", url: "https://en.wikipedia.org/wiki/Jang_Woo-jin" },
      { label: "Butterfly Online · Montpellier 2026 report", url: "https://butterflyonline.com/jang-darc-jang-woojin-is-surprise-winner-in-montpellier/" },
    ],
  },
  {
    id: "alexis-lebrun", birthDate: "2003-08-27", birthYear: 2003,
    headline: "France’s shakehand innovator, European champion in singles and doubles.",
    specialty: "Serve variety and tempo changes",
    bio: [
      "Alexis Lebrun is the older of the French Lebrun brothers and plays right-handed with a shakehand grip. He began table tennis at three, in a family with strong connections to the sport, and won three consecutive French singles championships from 2022 to 2024.",
      "His 2024 season included World Team Championships silver and European titles in singles and doubles, the latter with Félix. He added the Europe Top 16 title in 2025. For players studying tactics, his matches invite attention to serve variety, changes of pace and the way a small variation can produce a more comfortable next ball.",
    ],
    milestones: [
      { year: "2022–2024", title: "Three French singles titles", detail: "Won the national singles championship in three consecutive years.", source: 1 },
      { year: "2024", title: "World team silver", detail: "Helped France reach the final in Busan.", source: 1 },
      { year: "2024", title: "European double champion", detail: "Won singles and men’s doubles with Félix Lebrun in Linz.", source: 1 },
      { year: "2025", title: "Europe Top 16 winner", detail: "Added the continental invitation tournament to his singles honours.", source: 1 },
    ],
    game: [
      { title: "Variation before acceleration", description: "Look for the slower ball that changes an opponent’s balance. It can create a better attacking opportunity than another fast ball into the same diagonal." },
      { title: "A serve with a plan", description: "Watch several serves from the same setup and compare the resulting receives. Similar preparation can support different spins, lengths and third-ball intentions." },
      { title: "Shakehand flexibility", description: "Separate grip from tactics when comparing the brothers. Alexis can attack on both wings while still changing the rally rhythm through touch and placement." },
    ],
    watch: ["Which serve variations begin with similar preparation?", "When does he deliberately slow a rally?", "What receive gives him a first forehand attack?"],
    practice: { title: "Two serves, one preparation", steps: ["Choose a comfortable service action and practise a short backspin serve.", "Use the same starting routine for a low-spin variation to the same zone.", "Ask a partner to receive normally and record the different third balls you get."], goal: "Keep both serves low and make the intended third-ball pattern repeatable." },
    sources: [
      { label: "Tibhar · family background and playing hand", url: "https://tibhar.info/en/alexis-lebrun/" },
      { label: "Europe Top 16 · birth date and career biography", url: "https://top16montreux.com/wp-content/uploads/2026/01/Top16-Montreux-Alexis-Lebrun.pdf" },
    ],
  },
  {
    id: "lin-shidong", birthDate: "2005-04-18", birthYear: 2005,
    headline: "A former world No. 1 with a compact, explosive two-wing attack.",
    specialty: "Backhand acceleration and counters",
    bio: [
      "Lin Shidong is a Chinese right-handed shakehand player born in 2005. His rise through the youth game was followed by a rapid senior breakthrough, culminating in a Singapore Smash triple crown in 2025 and the men’s singles world No. 1 ranking that February.",
      "He also reached the 2025 World Cup singles final and won mixed doubles bronze with Kuai Man at the 2023 World Championships. His close-table exchanges provide a useful lesson in efficient preparation: a compact stroke can still accelerate sharply, while leaving enough time to change direction on the next ball.",
    ],
    milestones: [
      { year: "2023", title: "World mixed doubles bronze", detail: "Reached the World Championships podium with Kuai Man in Durban.", source: 0 },
      { year: "2023", title: "World Youth success", detail: "Returned to the World Youth Championships and defended four titles.", source: 1 },
      { year: "2025", title: "Singapore triple crown", detail: "Won singles, men’s doubles and mixed doubles at the Singapore Smash.", source: 1 },
      { year: "2025", title: "World No. 1 and World Cup silver", detail: "Reached No. 1 in February and finished runner-up at the men’s World Cup.", source: 0 },
    ],
    game: [
      { title: "Compact backhand power", description: "Watch the preparation between contacts. Keeping the racket close to its next starting point leaves room to accelerate without a long backswing." },
      { title: "Countering an opening loop", description: "A first topspin is not always a winning attack. Follow how height and depth affect the decision to counter, block or create more space." },
      { title: "Two-wing continuity", description: "The value of a strong backhand includes what it does for the forehand. Observe the neutral position that allows either wing to take the next ball." },
    ],
    watch: ["How far does the racket travel between backhands?", "Which opening loops does he counter immediately?", "Watch his feet on the change from backhand to forehand."],
    practice: { title: "Compact counter, then change", steps: ["Have a partner feed a gentle opening topspin to your backhand.", "Counter crosscourt with a short preparation and recover the racket.", "Play the next ball to the middle, then continue freely for two more contacts."], goal: "Keep the counter low and repeat the sequence without rushing." },
    sources: [
      { label: "Wikipedia · birth date and major results", url: "https://en.wikipedia.org/wiki/Lin_Shidong" },
      { label: "ITTF · Lin Shidong’s ascent to No. 1", url: "https://www.ittf.com/2025/02/11/lin-shidong-becomes-youngest-mens-world-no-1-in-table-tennis-history/" },
    ],
  },
];
