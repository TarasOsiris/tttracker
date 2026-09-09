package xyz.tleskiv.tt.showcase

import xyz.tleskiv.tt.data.model.enums.CompetitionLevel
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle
import xyz.tleskiv.tt.data.model.enums.SessionType

/// The dataset the App Store and Play Store screenshots are taken against.
///
/// It is fixed rather than generated, so the iPhone, iPad and Android rows of the store listing show
/// the same player with the same history, and so a re-capture months later reproduces the same
/// screenshots. Dates are offsets from today, not calendar dates, so the month view and the recent
/// analytics are full whenever the capture runs.
object ShowcaseData {

	val opponents: List<ShowcaseOpponent> = listOf(
		ShowcaseOpponent("Mika Halonen", "Helsinki Spin", 1842.0, Handedness.RIGHT, PlayingStyle.ATTACKER, "Quick backhand flick — keep the serve short."),
		ShowcaseOpponent("Lena Fischer", "TTC Berlin", 1755.0, Handedness.LEFT, PlayingStyle.ALL_ROUND, null),
		ShowcaseOpponent("Diego Marín", "Barcelona TT", 1690.0, Handedness.RIGHT, PlayingStyle.DEFENDER, "Blocks everything — vary the pace."),
		ShowcaseOpponent("Yuki Tanaka", "Osaka Racket Club", 1968.0, Handedness.RIGHT, PlayingStyle.ATTACKER, null),
		ShowcaseOpponent("Sofia Rossi", "Milano Pong", 1604.0, Handedness.RIGHT, PlayingStyle.CHOPPER, "Long pips on the backhand."),
		ShowcaseOpponent("Oleh Marchenko", "Kyiv Topspin", 1721.0, Handedness.LEFT, PlayingStyle.ATTACKER, null),
		ShowcaseOpponent("Priya Nair", "Mumbai Paddles", 1538.0, Handedness.RIGHT, PlayingStyle.ALL_ROUND, null),
		ShowcaseOpponent("Tomáš Novák", "Prague Smashers", 1877.0, Handedness.RIGHT, PlayingStyle.ATTACKER, "Weak on serve return."),
		ShowcaseOpponent("Amara Diallo", "Paris Elite", 1649.0, Handedness.LEFT, PlayingStyle.PIPS, null),
		ShowcaseOpponent("Chen Wei", "Shanghai Blades", 2014.0, Handedness.RIGHT, PlayingStyle.ATTACKER, "Play wide to the forehand.")
	)

	/// Session notes per app language, indexed by [ShowcaseSession.note].
	///
	/// Notes are user content rather than UI strings, so nothing localizes them automatically — and a
	/// store screenshot of the Spanish app showing English notes is exactly the seam a reader
	/// notices. The seeder picks the list for the language it is told to write.
	val notes: Map<String, List<String>> = mapOf(
		"en" to listOf(
			"Multiball: forehand loop against backspin.",
			"Footwork ladder before work.",
			"Regional qualifier — reached the semi-final.",
			"Pendulum serve, short to the crossover.",
			"Easy session with the junior group.",
			"Backhand counter-topspin, whole session.",
			"Club championship — runner-up.",
			"Reverse pendulum — still inconsistent.",
			"Doubles footwork with Lena.",
			"Sprints and core.",
			"Third-ball attack from short serve.",
			"Bat swap night — everyone on anti-spin.",
			"Long rallies — 40 shots without a miss.",
			"Open — lost in the quarter-final.",
			"First session on the new blade."
		),

		"de" to listOf(
			"Multiball: Vorhand-Topspin gegen Unterschnitt.",
			"Koordinationsleiter vor der Arbeit.",
			"Regionale Qualifikation — Halbfinale erreicht.",
			"Pendelaufschlag, kurz auf den Ellbogen.",
			"Lockere Einheit mit der Jugendgruppe.",
			"Rückhand-Konter-Topspin, die ganze Einheit.",
			"Vereinsmeisterschaft — Zweiter.",
			"Rückhand-Pendelaufschlag — noch unsauber.",
			"Doppel-Beinarbeit mit Lena.",
			"Sprints und Rumpfstabilität.",
			"Dritter Ball nach kurzem Aufschlag.",
			"Schlägertausch-Abend — alle mit Anti-Topspin.",
			"Lange Ballwechsel — 40 Schläge ohne Fehler.",
			"Open — im Viertelfinale ausgeschieden.",
			"Erste Einheit mit dem neuen Holz."
		),

		"fr" to listOf(
			"Multiballe : topspin coup droit contre coupé.",
			"Échelle de rythme avant le travail.",
			"Qualifications régionales — demi-finale atteinte.",
			"Service pendule, court sur le coude.",
			"Séance tranquille avec le groupe jeunes.",
			"Contre-topspin revers, toute la séance.",
			"Championnat du club — deuxième place.",
			"Service pendule inversé — encore irrégulier.",
			"Déplacements en double avec Lena.",
			"Sprints et gainage.",
			"Attaque à la troisième balle sur service court.",
			"Soirée échange de raquettes — tous en anti-spin.",
			"Longs échanges — 40 frappes sans faute.",
			"Open — éliminé en quart de finale.",
			"Première séance avec le nouveau bois."
		),

		"es" to listOf(
			"Multibola: topspin de derecha contra cortado.",
			"Escalera de agilidad antes del trabajo.",
			"Clasificatorio regional: llegué a semifinales.",
			"Saque de péndulo, corto al codo.",
			"Sesión suave con el grupo juvenil.",
			"Contratopspin de revés, toda la sesión.",
			"Campeonato del club: subcampeón.",
			"Péndulo invertido: aún irregular.",
			"Juego de pies de dobles con Lena.",
			"Sprints y core.",
			"Ataque a la tercera bola tras saque corto.",
			"Noche de cambio de palas: todos con antitopspin.",
			"Peloteos largos: 40 golpes sin fallar.",
			"Open: eliminado en cuartos de final.",
			"Primera sesión con la madera nueva."
		),

		"it" to listOf(
			"Multiball: top spin di dritto contro backspin.",
			"Scaletta di agilità prima del lavoro.",
			"Qualificazioni regionali — arrivato in semifinale.",
			"Servizio a pendolo, corto sul gomito.",
			"Sessione tranquilla con il gruppo giovanile.",
			"Contro-topspin di rovescio, tutta la sessione.",
			"Campionato del club — secondo posto.",
			"Pendolo inverso — ancora incostante.",
			"Gioco di gambe in doppio con Lena.",
			"Scatti e core.",
			"Attacco sulla terza palla dopo servizio corto.",
			"Serata scambio racchette — tutti con antitop.",
			"Scambi lunghi — 40 colpi senza errori.",
			"Open — eliminato ai quarti di finale.",
			"Prima sessione con il legno nuovo."
		),

		"pt" to listOf(
			"Multibola: topspin de direita contra backspin.",
			"Escada de agilidade antes do trabalho.",
			"Classificatório regional — cheguei à semifinal.",
			"Saque pêndulo, curto no cotovelo.",
			"Treino leve com o grupo juvenil.",
			"Contra-topspin de esquerda, o treino todo.",
			"Campeonato do clube — vice-campeão.",
			"Pêndulo invertido — ainda inconstante.",
			"Movimentação de duplas com a Lena.",
			"Tiros e core.",
			"Ataque na terceira bola após saque curto.",
			"Noite de troca de raquetes — todos com antispin.",
			"Ralis longos — 40 bolas sem errar.",
			"Open — eliminado nas quartas de final.",
			"Primeiro treino com a madeira nova."
		),

		"uk" to listOf(
			"Мультибол: топспін справа проти підрізки.",
			"Координаційна драбина перед роботою.",
			"Регіональний відбір — вийшов у півфінал.",
			"Подача маятником, коротко в лікоть.",
			"Легке заняття з юніорською групою.",
			"Контр-топспін зліва, усе тренування.",
			"Чемпіонат клубу — друге місце.",
			"Зворотний маятник — досі нестабільно.",
			"Робота ніг у парі з Леною.",
			"Спринти й кор.",
			"Атака третім м'ячем після короткої подачі.",
			"Вечір обміну ракетками — усі на антиспіні.",
			"Довгі розіграші — 40 ударів без помилки.",
			"Опен — виліт у чвертьфіналі.",
			"Перше тренування з новим підкладом."
		),

		"tr" to listOf(
			"Çoklu top: alttan topa forehand topspin.",
			"İşten önce çeviklik merdiveni.",
			"Bölge elemesi — yarı finale çıktım.",
			"Sarkaç servis, kısa ve çapraz noktaya.",
			"Gençler grubuyla hafif antrenman.",
			"Bütün antrenman backhand kontra topspin.",
			"Kulüp şampiyonası — ikinci oldum.",
			"Ters sarkaç — hâlâ tutarsız.",
			"Lena ile çiftler ayak çalışması.",
			"Sprint ve karın çalışması.",
			"Kısa servis sonrası üçüncü top atağı.",
			"Raket değişimi gecesi — herkes anti-spin.",
			"Uzun raliler — hatasız 40 vuruş.",
			"Açık turnuva — çeyrek finalde elendim.",
			"Yeni ahşapla ilk antrenman."
		),

		"ar" to listOf(
			"تمرين الكرات المتعددة: توب سبين أمامي ضد الكرة المقصوصة.",
			"تمارين سلم الرشاقة قبل العمل.",
			"تصفيات إقليمية — بلغت نصف النهائي.",
			"إرسال البندول، قصير إلى نقطة التقاطع.",
			"حصة خفيفة مع مجموعة الناشئين.",
			"توب سبين خلفي مضاد طوال الحصة.",
			"بطولة النادي — المركز الثاني.",
			"البندول العكسي — ما زال غير ثابت.",
			"تدريب حركة القدمين في الزوجي مع لينا.",
			"جري سريع وتمارين للجذع.",
			"الهجوم بالكرة الثالثة بعد إرسال قصير.",
			"ليلة تبادل المضارب — الجميع على المطاط المضاد.",
			"تبادلات طويلة — 40 ضربة دون خطأ.",
			"بطولة مفتوحة — خرجت من ربع النهائي.",
			"أول حصة بالمضرب الجديد."
		),

		"hi" to listOf(
			"मल्टीबॉल: बैकस्पिन पर फोरहैंड लूप।",
			"काम से पहले फुटवर्क लैडर।",
			"क्षेत्रीय क्वालिफायर — सेमीफाइनल तक पहुँचा।",
			"पेंडुलम सर्विस, क्रॉसओवर पर छोटी।",
			"जूनियर ग्रुप के साथ हल्का सत्र।",
			"पूरे सत्र बैकहैंड काउंटर-टॉपस्पिन।",
			"क्लब चैंपियनशिप — उपविजेता।",
			"रिवर्स पेंडुलम — अब भी अस्थिर।",
			"लेना के साथ डबल्स फुटवर्क।",
			"स्प्रिंट और कोर।",
			"छोटी सर्विस के बाद थर्ड-बॉल अटैक।",
			"बैट स्वैप नाइट — सब एंटी-स्पिन पर।",
			"लंबी रैलियाँ — बिना चूके 40 शॉट।",
			"ओपन — क्वार्टर फाइनल में हार।",
			"नए ब्लेड के साथ पहला सत्र।"
		),

		"id" to listOf(
			"Multibola: loop forehand melawan backspin.",
			"Latihan tangga kelincahan sebelum kerja.",
			"Kualifikasi regional — lolos ke semifinal.",
			"Servis pendulum, pendek ke titik silang.",
			"Latihan ringan bersama grup junior.",
			"Counter-topspin backhand sepanjang sesi.",
			"Kejuaraan klub — juara dua.",
			"Pendulum terbalik — masih belum stabil.",
			"Latihan kaki ganda bersama Lena.",
			"Sprint dan latihan inti.",
			"Serangan bola ketiga dari servis pendek.",
			"Malam tukar bet — semua pakai anti-spin.",
			"Reli panjang — 40 pukulan tanpa gagal.",
			"Turnamen terbuka — kalah di perempat final.",
			"Sesi pertama dengan kayu baru."
		),

		"ja" to listOf(
			"多球練習：下回転をフォアドライブ。",
			"出勤前にラダートレーニング。",
			"地区予選、ベスト4。",
			"下回転サーブ、クロスへ短く。",
			"ジュニアと軽めの練習。",
			"バックのカウンタードライブを一本集中。",
			"クラブ選手権、準優勝。",
			"逆モーションサーブ、まだ安定せず。",
			"レナとダブルスの動きを確認。",
			"ダッシュと体幹。",
			"ショートサーブから三球目攻撃。",
			"ラケット交換ナイト、全員アンチで。",
			"ラリー継続、ノーミスで40本。",
			"オープン戦、ベスト8で敗退。",
			"新しいラケットで初練習。"
		),

		"ko" to listOf(
			"다구 훈련: 백스핀을 포핸드 드라이브로.",
			"출근 전 사다리 훈련.",
			"지역 예선 — 4강 진출.",
			"펜듈럼 서브, 짧게 크로스로.",
			"주니어 그룹과 가벼운 훈련.",
			"백핸드 카운터 드라이브만 집중.",
			"클럽 챔피언십 준우승.",
			"역회전 서브, 아직 불안정.",
			"레나와 복식 풋워크.",
			"스프린트와 코어.",
			"짧은 서브 후 3구 공격.",
			"라켓 바꿔 치는 날 — 다 같이 앤티러버.",
			"긴 랠리 — 실수 없이 40구.",
			"오픈 대회 — 8강에서 탈락.",
			"새 블레이드로 첫 훈련."
		),

		"zh-CN" to listOf(
			"多球练习：正手拉下旋。",
			"上班前做敏捷梯训练。",
			"地区资格赛，闯进四强。",
			"钩子发球，短球送到交叉点。",
			"和青少年组轻松练习。",
			"整节课练反手反拉。",
			"俱乐部锦标赛亚军。",
			"逆旋发球，还不稳定。",
			"和莉娜练双打步法。",
			"冲刺加核心训练。",
			"短球发球后抢攻第三板。",
			"换拍之夜，全员防弧圈。",
			"长多回合，连续40板不失误。",
			"公开赛八强出局。",
			"换新底板第一练。"
		)
	)

	/// Falls back to English for a language the table does not carry.
	fun note(languageTag: String, index: Int): String =
		(notes[languageTag] ?: notes.getValue(BASE_LANGUAGE))[index]

	private const val BASE_LANGUAGE = "en"

	val sessions: List<ShowcaseSession> = listOf(
		session(0, 90, 7, SessionType.TECHNIQUE, 0),
		session(2, 75, 6, SessionType.MATCH_PLAY, matches = listOf(m(1, 3, 1), m(6, 3, 0))),
		session(4, 45, 5, SessionType.PHYSICAL, 1),
		session(5, 120, 8, SessionType.TOURNAMENT, 2, listOf(m(6, 3, 0, true, CompetitionLevel.TOURNAMENT), m(2, 3, 2, true, CompetitionLevel.TOURNAMENT), m(9, 1, 3, true, CompetitionLevel.TOURNAMENT))),
		session(7, 60, 6, SessionType.SERVE_PRACTICE, 3),
		session(9, 90, 7, SessionType.MATCH_PLAY, matches = listOf(m(0, 3, 2, true, CompetitionLevel.LEAGUE), m(4, 2, 3, true, CompetitionLevel.LEAGUE))),
		session(11, 75, 6, SessionType.TECHNIQUE, null),
		session(12, 60, 4, SessionType.FREE_PLAY, 4),
		session(14, 90, 8, SessionType.MATCH_PLAY, matches = listOf(m(7, 3, 1, true, CompetitionLevel.LEAGUE), m(3, 1, 3, true, CompetitionLevel.LEAGUE), m(5, 3, 0))),
		session(16, 60, 5, SessionType.SERVE_PRACTICE, null),
		session(18, 45, 6, SessionType.PHYSICAL, null),
		session(19, 105, 7, SessionType.TECHNIQUE, 5),
		session(21, 90, 7, SessionType.MATCH_PLAY, matches = listOf(m(8, 3, 2), m(1, 3, 1), m(6, 3, 0))),
		session(23, 60, 5, SessionType.FREE_PLAY, null),
		session(25, 75, 6, SessionType.TECHNIQUE, null),
		session(26, 120, 9, SessionType.TOURNAMENT, 6, listOf(m(4, 3, 1, true, CompetitionLevel.TOURNAMENT), m(2, 3, 0, true, CompetitionLevel.TOURNAMENT), m(9, 2, 3, true, CompetitionLevel.TOURNAMENT))),
		session(28, 90, 7, SessionType.MATCH_PLAY, matches = listOf(m(0, 2, 3, true, CompetitionLevel.LEAGUE), m(5, 3, 1, true, CompetitionLevel.LEAGUE))),
		session(30, 60, 5, SessionType.SERVE_PRACTICE, 7),
		session(32, 45, 6, SessionType.PHYSICAL, null),
		session(33, 90, 7, SessionType.TECHNIQUE, null),
		session(35, 75, 6, SessionType.MATCH_PLAY, matches = listOf(m(7, 3, 2), m(3, 0, 3))),
		session(37, 60, 4, SessionType.FREE_PLAY, null),
		session(39, 90, 8, SessionType.MATCH_PLAY, matches = listOf(m(1, 3, 0, true, CompetitionLevel.LEAGUE), m(8, 3, 2, true, CompetitionLevel.LEAGUE), m(6, 3, 1))),
		session(40, 60, 5, SessionType.TECHNIQUE, 8, listOf(m(2, 3, 1, doubles = true), m(4, 2, 3, doubles = true))),
		session(42, 75, 6, SessionType.SERVE_PRACTICE, null),
		session(44, 90, 7, SessionType.TECHNIQUE, null),
		session(46, 45, 6, SessionType.PHYSICAL, 9),
		session(47, 105, 8, SessionType.MATCH_PLAY, matches = listOf(m(9, 1, 3, true, CompetitionLevel.LEAGUE), m(5, 3, 0, true, CompetitionLevel.LEAGUE), m(6, 3, 1))),
		session(49, 60, 5, SessionType.FREE_PLAY, null),
		session(51, 90, 7, SessionType.TECHNIQUE, 10),
		session(53, 75, 6, SessionType.MATCH_PLAY, matches = listOf(m(0, 3, 2), m(7, 2, 3))),
		session(54, 120, 8, SessionType.TOURNAMENT, null, listOf(m(3, 3, 2, true, CompetitionLevel.TOURNAMENT), m(1, 3, 0, true, CompetitionLevel.TOURNAMENT), m(9, 0, 3, true, CompetitionLevel.TOURNAMENT))),
		session(56, 60, 5, SessionType.SERVE_PRACTICE, null),
		session(58, 45, 6, SessionType.PHYSICAL, null),
		session(60, 90, 7, SessionType.MATCH_PLAY, matches = listOf(m(4, 2, 3, true, CompetitionLevel.LEAGUE), m(2, 3, 1, true, CompetitionLevel.LEAGUE))),
		session(61, 75, 6, SessionType.TECHNIQUE, null),
		session(63, 60, 4, SessionType.FREE_PLAY, 11),
		session(65, 90, 7, SessionType.MATCH_PLAY, matches = listOf(m(8, 3, 1), m(6, 3, 0), m(5, 3, 2))),
		session(67, 75, 6, SessionType.SERVE_PRACTICE, null),
		session(68, 60, 5, SessionType.TECHNIQUE, null),
		session(70, 90, 8, SessionType.MATCH_PLAY, matches = listOf(m(7, 3, 2, true, CompetitionLevel.LEAGUE), m(0, 1, 3, true, CompetitionLevel.LEAGUE))),
		session(72, 45, 6, SessionType.PHYSICAL, null),
		session(74, 105, 7, SessionType.TECHNIQUE, 12),
		session(75, 60, 5, SessionType.FREE_PLAY, null),
		session(77, 90, 7, SessionType.MATCH_PLAY, matches = listOf(m(1, 3, 1), m(3, 3, 2), m(9, 2, 3))),
		session(79, 75, 6, SessionType.SERVE_PRACTICE, null),
		session(81, 60, 5, SessionType.TECHNIQUE, null),
		session(82, 120, 9, SessionType.TOURNAMENT, 13, listOf(m(6, 3, 0, true, CompetitionLevel.TOURNAMENT), m(8, 3, 1, true, CompetitionLevel.TOURNAMENT), m(3, 2, 3, true, CompetitionLevel.TOURNAMENT))),
		session(86, 90, 7, SessionType.MATCH_PLAY, matches = listOf(m(2, 3, 0, true, CompetitionLevel.LEAGUE), m(4, 1, 3, true, CompetitionLevel.LEAGUE))),
		session(89, 75, 6, SessionType.TECHNIQUE, null),
		session(93, 45, 5, SessionType.PHYSICAL, null),
		session(96, 90, 7, SessionType.MATCH_PLAY, matches = listOf(m(5, 3, 1), m(0, 3, 2), m(7, 1, 3))),
		session(100, 60, 5, SessionType.SERVE_PRACTICE, null),
		session(103, 90, 6, SessionType.TECHNIQUE, null),
		session(107, 75, 7, SessionType.MATCH_PLAY, matches = listOf(m(6, 3, 1, true, CompetitionLevel.LEAGUE), m(9, 0, 3, true, CompetitionLevel.LEAGUE))),
		session(110, 60, 4, SessionType.FREE_PLAY, null),
		session(114, 90, 7, SessionType.TECHNIQUE, 14),
		session(117, 75, 6, SessionType.MATCH_PLAY, matches = listOf(m(1, 3, 2), m(8, 3, 0)))
	)
}

data class ShowcaseOpponent(
	val name: String,
	val club: String?,
	val rating: Double?,
	val handedness: Handedness?,
	val style: PlayingStyle?,
	val notes: String?
)

data class ShowcaseMatch(
	val opponentIndex: Int,
	val myGamesWon: Int,
	val opponentGamesWon: Int,
	val isDoubles: Boolean = false,
	val isRanked: Boolean = false,
	val competitionLevel: CompetitionLevel? = null
)

data class ShowcaseSession(
	val daysAgo: Int,
	val durationMinutes: Int,
	val rpe: Int,
	val sessionType: SessionType?,
	/// Index into [ShowcaseData.notes]; null for a session that carries no note.
	val note: Int?,
	val matches: List<ShowcaseMatch>
)

private fun session(
	daysAgo: Int,
	durationMinutes: Int,
	rpe: Int,
	sessionType: SessionType?,
	note: Int? = null,
	matches: List<ShowcaseMatch> = emptyList()
) = ShowcaseSession(daysAgo, durationMinutes, rpe, sessionType, note, matches)

private fun m(
	opponentIndex: Int,
	myGamesWon: Int,
	opponentGamesWon: Int,
	isRanked: Boolean = false,
	competitionLevel: CompetitionLevel? = null,
	doubles: Boolean = false
) = ShowcaseMatch(opponentIndex, myGamesWon, opponentGamesWon, doubles, isRanked, competitionLevel)
