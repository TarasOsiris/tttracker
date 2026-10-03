import type { Messages } from "../types";

export const tr: Messages = {
  meta: {
    homeTitle: "Masa Tenisi Antrenman Günlüğü – Ping Pong maç ve skor defteri",
    homeDescription:
      "iPhone ve Android için ücretsiz masa tenisi antrenman günlüğü. Antrenmanı saniyeler içinde kaydedin, maç skorlarını ve rakipleri tutun, gelişiminizi görün.",
    drillsTitle: "Ücretsiz Masa Tenisi Antrenman Programları | Masa Tenisi Antrenman Günlüğü",
    drillsDescription:
      "Yazdırılabilir masa tenisi antrenman programları: temel vuruşlar, ayak çalışması, servis ve karşılama, çoklu top, istikrar ve maç hazırlığı. İpuçları ve SSS ile.",
  },
  nav: {
    app: "Uygulama",
    learn: "Öğren",
    features: "Özellikler",
    howItWorks: "Nasıl çalışır",
    serves: "Servisler",
    drills: "Alıştırmalar",
    equipment: "Ekipman",
    blog: "Blog",
    faq: "SSS",
    getApp: "Uygulamayı indirin",
    openMenu: "Menüyü aç",
    menu: "Menü",
    toggleTheme: "Temayı değiştir",
    skipToContent: "İçeriğe geç",
    language: "Dil",
  },
  navHints: {
    features: "Uygulamanın kaydettiği her şey",
    howItWorks: "Antrenmandan gelişime",
    faq: "Sık sorulan sorular",
    serves: "Servisler, falso, kurallar ve test",
    drills: "Yazdırılabilir antrenman planları",
    equipment: "Raket, lastik ve profesyonel ekipman (İngilizce)",
    blog: "Masa tenisi haberleri (İngilizce)",
  },
  store: {
    appStore: "App Store'dan indirin",
    googlePlay: "Google Play'den alın",
  },
  hero: {
    badge: "Yeni: maç ve rakip takibi",
    titleLead: "Her antrenmanı kaydedin.",
    titleHighlight: "Oyununuzun gelişimini izleyin.",
    subtitleBefore: "",
    subtitleStrong: "Ping pong ve masa tenisi antrenman günlüğü",
    subtitleAfter:
      ". Antrenmanınızı 30 saniyeden kısa sürede kaydedin, kayıtlı rakiplere karşı maçlarınızı girin ve bir yıllık gelişiminizi tek bakışta görün.",
    trustPoints: ["Ücretsiz", "Hesap gerekmez", "Çevrimdışı çalışır", "15 dil"],
  },
  mockup: {
    tryIt: "Deneyin — dokunarak keşfedin",
    weekdays: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
    today: "Bugün",
    yesterday: "Dün",
    tomorrow: "Yarın",
    noSessions: "Antrenman yok",
    minutes: "{n} dk",
    hours: "{n} sa",
    addSession: "Antrenman ekle",
    save: "Kaydet",
    cancel: "İptal",
    duration: "Süre",
    sessionType: "Antrenman türü",
    intensity: "Yoğunluk (RPE)",
    summary: "Özet",
    totalSessions: "Antrenmanlar",
    totalTime: "Antrenman süresi",
    winLoss: "Galibiyet / Mağlubiyet",
    heatmapTitle: "Antrenman seansları ısı haritası",
    weeklyTraining: "Haftalık antrenman süresi",
    notes: ["Ayak çalışması, çoklu top", "Lig · Rakip: Alex K."],
    tabs: ["Antrenmanlar", "Analiz"],
    heatmapLabel: "Son 14 hafta",
    heatmapStat: "42 antrenman",
    heatmapHours: "51 sa",
    winRate: "Galibiyet oranı",
  },
  sessionTypes: {
    technique: "Teknik",
    match: "Maç",
    tournament: "Turnuva",
    serve: "Servis antrenmanı",
    physical: "Fiziksel",
    freeplay: "Serbest oyun",
    other: "Diğer",
  },
  features: {
    eyebrow: "Özellikler",
    title: "Antrenman günlüğünüzün ihtiyaç duyduğu her şey",
    subtitle:
      "Antrenman, maç ve gelişim; ilk rallinizden lig gecesine kadar. Bir oyuncu tarafından, oyuncular için yapıldı.",
    sessionTypesTitle: "7 antrenman türü, her yerde kendi rengiyle",
    items: [
      {
        icon: "sessions",
        title: "Saniyeler içinde antrenman kaydı",
        body: "Bir antrenmanı 30 saniyeden kısa sürede kaydedin: ne kadar sürdü, türü neydi, ne kadar zorladı.",
        bullets: ["7 antrenman türü", "Süre ve RPE 1–10", "Notlar ve geriye dönük kayıt"],
      },
      {
        icon: "matches",
        title: "Maçlar ve rakipler",
        body: "Her maçı set set kaydedin ve karşılaştığınız her rakip için bir profil tutun.",
        bullets: ["Tekler veya çiftler", "Antrenman, lig, turnuva", "Oyun tarzı, rating, el tercihi"],
      },
      {
        icon: "analytics",
        title: "Sorularınızı yanıtlayan analizler",
        body: "Galibiyet oranınızı, haftada gerçekte ne kadar antrenman yaptığınızı ve koca bir yılı tek bakışta görün.",
        bullets: ["Galibiyet/mağlubiyet grafiği", "Haftalık antrenman süresi", "12 aylık ısı haritası"],
      },
      {
        icon: "calendar",
        title: "Akıllı takvim",
        body: "Yoğunluk noktalı ay ve hafta görünümleri en dolu haftalarınızı gösterir. Ne yaptığınızı görmek için bir güne dokunun.",
        bullets: ["Ay ve hafta görünümü", "Antrenman yoğunluğu", "Haftanın ilk gününü seçme"],
      },
      {
        icon: "widgets",
        title: "Ana Ekran ve Kilitli Ekran widget'ları",
        body: "Isı haritanızı ve son antrenmanınızı Ana Ekran'da tutun, yeni antrenmanları Denetim Merkezi'nden ekleyin.",
        bullets: ["Özet ve ısı haritası widget'ları", "Kilitli Ekran'da istatistikler", "Hızlı antrenman ekleme kontrolü"],
      },
      {
        icon: "simple",
        title: "Bilinçli olarak sade",
        body: "Üyelik yok, karmaşa yok, bulut gerekmez. Her şey cihazınızda kalır.",
        bullets: ["Tamamen çevrimdışı çalışır", "Açık ve koyu tema", "15 dilde kullanılabilir"],
      },
    ],
  },
  steps: {
    eyebrow: "Nasıl çalışır",
    title: "Üç adım. Sonrası alışkanlık.",
    items: [
      {
        title: "Antrenmanı kaydedin",
        body: "Bir tür seçin (teknik, maç, servis antrenmanı…), süreyi ve yoğunluğu belirleyin, bir not ekleyin. 30 saniyeden kısa sürede biter.",
      },
      {
        title: "Maçlarınızı girin",
        body: "Kayıtlı rakiplere karşı set skorlarını ekleyin; ister dostluk maçı olsun, ister lig gecesi, ister turnuva.",
      },
      {
        title: "Gelişiminizi görün",
        body: "Isı haritanız dolar, haftalık toplamlar artar ve galibiyet oranınız emeğinizin karşılığını alıp almadığınızı söyler.",
      },
    ],
  },
  screenshots: {
    eyebrow: "Ekran görüntüleri",
    title: "İçeriye bir göz atın",
    subtitle: "Açık ya da koyu temada telefonunuza tam uyan, sade ve Material tarzı bir uygulama.",
    previous: "Önceki ekran görüntüleri",
    next: "Sonraki ekran görüntüleri",
    previousOne: "Önceki ekran görüntüsü",
    nextOne: "Sonraki ekran görüntüsü",
    enlarge: "Ekran görüntüsünü büyüt: {alt}",
    alts: [
      "Kaydedilmiş masa tenisi antrenmanlarını gösteren haftalık takvim",
      "Süre, tür ve yoğunlukla yeni antrenman ekleme",
      "Varsayılan antrenman süresi, yoğunluğu ve türü ayarları",
      "Süre ve RPE değerini gösteren antrenman ayrıntıları ekranı",
      "Mevcut bir antrenmanı düzenleme veya silme",
      "Antrenman yoğunluğunu gösteren aylık takvim görünümü",
      "Antrenmanların analiz ısı haritası",
      "Koyu temada takvim",
    ],
  },
  drillsTeaser: {
    eyebrow: "Ücretsiz antrenman programları",
    title: "Ne çalışacağınızdan emin değil misiniz?",
    subtitle:
      "Süreleri, ipuçları ve SSS'leriyle hazır masa tenisi antrenmanları. Birini yazdırın, kulübe götürün, ardından uygulamaya kaydedin.",
    browseAll: "Tüm antrenman programlarına göz atın",
  },
  servesTeaser: {
    eyebrow: "Servis ansiklopedisi",
    title: "Bilinen her servisi öğrenin",
    subtitle:
      "29 masa tenisi servis çeşidi tek tek açıklandı: falso, sekme, yerleşim ve nasıl karşılanacağı. Ücretsiz ve şemalı.",
    cta: "Servisleri keşfedin",
  },
  faq: {
    eyebrow: "SSS",
    title: "Sorular ve yanıtlar",
    items: [
      {
        q: "TT Tracker ücretsiz mi?",
        a: "Evet. App Store ve Google Play'den ücretsiz indirebilir, dilediğiniz kadar antrenman ve maç kaydedebilirsiniz.",
      },
      {
        q: "Hangi cihazlarda çalışır?",
        a: "iPhone ve iPad (iOS) ile Android telefon ve tabletlerde. Ana Ekran ve Kilitli Ekran widget'ları iOS'ta kullanılabilir.",
      },
      {
        q: "Hesap açmam gerekiyor mu?",
        a: "Hayır. Uygulamayı açın ve kaydetmeye başlayın. Üyelik, e-posta ya da şifre yok.",
      },
      {
        q: "Çevrimdışı çalışır mı? Verilerim nerede saklanıyor?",
        a: "Tamamen çevrimdışı çalışır. Antrenmanlarınız, maçlarınız ve rakipleriniz sunucularımızda değil, kendi cihazınızda saklanır.",
      },
      {
        q: "Ping pong için mi, masa tenisi için mi?",
        a: "İkisi için de, sonuçta aynı spor! İster garajda keyfine pinpon oynayın ister ligde mücadele edin, uygulama antrenmanlarınızı ve maçlarınızı aynı şekilde takip eder.",
      },
      {
        q: "Hangi dillerde kullanılabilir?",
        a: "15 dilde: İngilizce, Arapça, Çince (Basitleştirilmiş ve Geleneksel), Fransızca, Almanca, Hintçe, Endonezce, İtalyanca, Japonca, Korece, Portekizce, İspanyolca, Türkçe ve Ukraynaca.",
      },
    ],
  },
  cta: {
    homeTitle: "Ne kadar antrenman yaptığınızı tahmin etmeyi bırakın.",
    homeSubtitle:
      "iPhone, iPad ve Android'de ücretsiz. Hesap yok, kurulum yok; uygulamayı açın ve ilk antrenmanınızı kaydedin.",
    drillsTitle: "Yaptığınız her alıştırmayı takip edin.",
    drillsSubtitle: "Her antrenmanı türü, süresi ve yoğunluğuyla kaydedin, antrenman ısı haritanızın dolmasını izleyin.",
    drillTitle: "Antrenmanı bitirdiniz mi? 30 saniyede kaydedin.",
    drillSubtitle: "Türü {type} olarak seçip süresi ve yoğunluğuyla kaydedin, serinizin uzamasını izleyin.",
    servesTitle: "Servis mi çalışıyorsunuz? Her antrenmanı kaydedin.",
    servesSubtitle: "iPhone, iPad ve Android için ücretsiz masa tenisi günlüğünde servis çalışmalarınızı, maçlarınızı ve rakiplerinizi takip edin; neyin işe yaradığını görün.",
  },
  footer: {
    tagline:
      "Ping pong ve masa tenisi oyuncuları için antrenman günlüğü. Antrenmanlarınızı kaydedin, maçlarınızı girin, gelişiminizi görün.",
    product: "Ürün",
    download: "İndir",
    company: "Şirket",
    contact: "Bize ulaşın",
    privacy: "Gizlilik Politikası",
    terms: "Kullanım Koşulları",
    encyclopedia: "Servis ansiklopedisi",
    allServes: "Tüm servisler",
    motions: "Hareketler",
    spins: "Falsolar",
    rules: "Kurallar",
    quiz: "Test",
    about: "Hakkında",
    language: "Dil",
    legal: "App Store, Apple Inc.'in hizmet markasıdır. Google Play, Google LLC'nin ticari markasıdır.",
    blog: "Blog",
  },
  blog: {
    title: "Masa Tenisi Haberleri ve İpuçları Blogu",
    description: "Masa Tenisi Antrenman Günlüğü ekibinden en güncel masa tenisi haberleri, turnuva özetleri ve pratik antrenman ipuçları.",
    readMinutes: "{n} dk okuma",
    sources: "Kaynaklar",
    moreFromBlog: "Blogdan diğer yazılar",
    breadcrumb: "Blog",
  },
  legal: {
    lastUpdated: "Son güncelleme: {date}",
  },
  drillsPage: {
    eyebrow: "Antrenman programları",
    title: "Her antrenman için masa tenisi alıştırmaları",
    intro:
      "Isınma, ana bölüm ve soğumadan oluşan, dakikası dakikasına planlanmış antrenman programları. Kulüp için yazdırın, ardından gelişiminizi görmek için antrenmanı TT Tracker'a kaydedin.",
    back: "Tüm antrenman programları",
    minutes: "{n} dk",
    minutesLong: "{n} dakika",
    drillCount: "{n} alıştırma",
    print: "Yazdır",
    tipsTitle: "Daha fazla verim almak için ipuçları",
    faqTitle: "Sık sorulan sorular",
    moreTitle: "Diğer antrenman programları",
    progressDone: "{done}/{total} tamamlandı",
    progressLeft: "{n} dk kaldı",
    complete: "Antrenman tamamlandı. Eline sağlık! 🏓",
    reset: "Sıfırla",
    levels: { Beginner: "Başlangıç", Intermediate: "Orta seviye", "All levels": "Tüm seviyeler" },
  },
  errors: {
    notFoundTitle: "Bu top masanın dışına gitti",
    notFoundBody: "Bu sayfayı bulamadık.",
    errorTitle: "Bir şeyler ters gitti",
    errorBody: "Lütfen biraz sonra tekrar deneyin.",
    backHome: "Ana sayfaya dön",
    drillNotFound: "Alıştırma bulunamadı",
  },
  drills: [
    {
      slug: "beginner-fundamentals",
      emoji: "🏓",
      title: "Yeni başlayanlar için temel vuruşlar",
      short: "Dört temel vuruş, antrenörlerin öğrettiği sırayla.",
      metaTitle: "Yeni Başlayanlar İçin Masa Tenisi Antrenman Programı (60 dk)",
      metaDescription:
        "Yeni başlayanlara 60 dakikalık masa tenisi antrenman programı: ısınma, forehand ve backhand düz vuruş, kesme, ayak çalışması, soğuma. Ücretsiz, yazdırılabilir.",
      level: "Beginner",
      sessionType: "technique",
      intro:
        "Masa tenisinde yeniyseniz (ya da yıllarca garajda pinpon oynadıktan sonra geri dönüyorsanız), bu antrenman her şeyin üzerine kurulduğu dört temel vuruşu oturtur. Haftada iki üç kez yapın ve her antrenmanı kaydedin; böylece istikrarınızın nasıl arttığını görürsünüz.",
      blocks: [
        {
          title: "Isınma",
          items: [
            { name: "Hafif koşu ve kol çevirme", minutes: 3 },
            { name: "Gölge vuruşlar: forehand ve backhand", minutes: 3, note: "Topsuz, yavaş ve tam vuruşlar" },
            { name: "Rahat ralli, serbest vuruş", minutes: 4 },
          ],
        },
        {
          title: "Ana bölüm",
          items: [
            { name: "Forehand düz vuruş, çapraz", minutes: 10, note: "Hızlanmadan önce arka arkaya 20 vuruş hedefleyin" },
            { name: "Backhand düz vuruş, çapraz", minutes: 10 },
            { name: "Backhand'e backhand kesme", minutes: 8, note: "Topu filenin hemen üzerinden alçak geçirin" },
            { name: "Forehand – backhand sırayla (1-1)", minutes: 8 },
          ],
        },
        {
          title: "Oyun ve soğuma",
          items: [
            { name: "11'lik setler, yalnızca servis ve ilk top atağı", minutes: 10 },
            { name: "Omuz, bilek ve baldır esnetme", minutes: 4 },
          ],
        },
      ],
      tips: [
        { title: "Rallinizi sayın", body: "Sayıyı yüksek sesle söyleyin. Belirsiz bir alıştırma böylece ölçülebilir bir hedefe dönüşür." },
        { title: "Önce hazır pozisyon", body: "Dizler bükük, ağırlık önde, raket önünüzde. Yeni başlayanların hatalarının çoğu vuruştan önce başlar." },
        { title: "RPE ile kaydedin", body: "Ne kadar zorlandığınızı puanlayın. Temeller oturdukça aynı antrenman daha kolay gelmeye başlar." },
      ],
      faqs: [
        { q: "Yeni başlayan biri ne sıklıkla antrenman yapmalı?", a: "Haftada iki üç kez, yaklaşık birer saatlik antrenman, tükenmeden düzenli gelişmek için yeterlidir." },
        { q: "Yeni başlayanlar hemen topspin öğrenmeli mi?", a: "Önce istikrarlı bir düz vuruş ve kesme öğrenin. Vuruşunuz ve ayak çalışmanız oturduğunda topspin kendiliğinden gelir." },
        { q: "Bunu tek başıma yapabilir miyim?", a: "Çoğu için bir partnere ya da robota ihtiyacınız var. Tek başınızaysanız bunun yerine gölge vuruş ve servis antrenmanı yapın." },
      ],
    },
    {
      slug: "footwork-drills",
      emoji: "👟",
      title: "Ayak çalışması alıştırmaları",
      short: "Falkenberg, yan yana ve ileri-geri hareket.",
      metaTitle: "Masa Tenisi Ayak Çalışması Alıştırmaları: 50 Dakikalık Antrenman",
      metaDescription:
        "50 dakikalık bu antrenmanla masa tenisinde ayak çalışmanızı geliştirin: yan yana hareket, Falkenberg, rastgele ayak çalışması ve ileri-geri alıştırmaları.",
      level: "Intermediate",
      sessionType: "technique",
      intro:
        "Sayıların çoğu ellerden değil, ayaklardan kaybedilir. Bu antrenman, her topa dengeli bir pozisyondan vurmanızı sağlayan hareket kalıplarını çalıştırır. Setleri kısa ve yoğun tutun, aralarında dinlenin.",
      blocks: [
        {
          title: "Isınma",
          items: [
            { name: "İp atlama ya da hafif koşu", minutes: 3 },
            { name: "Vuruşlarla birlikte gölge yan adımlar", minutes: 4 },
            { name: "Forehand ve backhand çapraz ralli", minutes: 5 },
          ],
        },
        {
          title: "Ana bölüm",
          items: [
            { name: "İki noktalı forehand: orta ve geniş forehand", minutes: 8, note: "Setler: 60 sn çalışma, 30 sn dinlenme" },
            { name: "Falkenberg (BH – BH köşesinden FH – geniş FH)", minutes: 10 },
            { name: "İleri-geri: kısa kesme, ardından uzun topspin", minutes: 8 },
            { name: "Forehand yarısına rastgele toplar", minutes: 7 },
          ],
        },
        {
          title: "Soğuma",
          items: [{ name: "Rahat ralli ve esneme", minutes: 5 }],
        },
      ],
      tips: [
        { title: "Küçük adımlar, sonra büyük bir adım", body: "Küçük kaydırma adımlarıyla ayar yapın. Büyük adımı yalnızca geniş toplara saklayın." },
        { title: "Merkeze dönün", body: "Her vuruştan sonra ortaya dönün. Alıştırmanın asıl kendisi o dönüş adımıdır." },
        { title: "Yoğunluğu takip edin", body: "Ayak çalışması antrenmanları yorucudur. Yüksek RPE ile kaydedin ve haftanızı bunlara göre dengeleyin." },
      ],
      faqs: [
        { q: "Falkenberg alıştırması nedir?", a: "Üç topluk bir kalıp: backhand köşesinden backhand, aynı köşeden dönerek forehand, ardından geniş forehand. Adını İsveçli antrenör Karl-Olof Falkenberg'den alır." },
        { q: "Ayak çalışması setleri ne kadar sürmeli?", a: "30–60 saniye çalışma, ardından eşit ya da daha uzun dinlenme. Yorulunca kalite hızla düşer." },
        { q: "Masa olmadan ayak çalışması yapabilir miyim?", a: "Evet. Ayna karşısında elde raketle gölge ayak çalışması, her gün 10 dakikalık harika bir alışkanlıktır." },
      ],
    },
    {
      slug: "serve-and-receive",
      emoji: "🎯",
      title: "Servis ve karşılama",
      short: "Kısa alt falso, uzun hızlı servisler ve falsoyu okuma.",
      metaTitle: "Masa Tenisi Servis Antrenmanı: Servis ve Karşılama (50 dk)",
      metaDescription:
        "50 dakikalık masa tenisi servis ve karşılama antrenmanı: kısa alt falso, uzun servisler, yan falsolu servis çeşitleri ve servis karşılama alıştırmaları.",
      level: "All levels",
      sessionType: "serve",
      intro:
        "Her sayı servisle başlar, ama en az çalışılan vuruş da odur. Servis bölümü için yalnızca bir kova top, karşılama için bir partner yeterli. Her servisin teknik ayrıntıları için servis ansiklopedimizle birlikte kullanın.",
      blocks: [
        {
          title: "Isınma",
          items: [
            { name: "Bilek ve omuz mobilitesi", minutes: 3 },
            { name: "Rahat ralli", minutes: 4 },
          ],
        },
        {
          title: "Servis (bir kova top)",
          items: [
            { name: "Kısa alt falso, rakip sahada iki kez seksin", minutes: 8, note: "Hedef: fileye yakın bir havlu" },
            { name: "Köşelere uzun ve hızlı servis", minutes: 6 },
            { name: "Aynı hareketle yan falso / yan-alt falso", minutes: 8 },
          ],
        },
        {
          title: "Karşılama (partnerle)",
          items: [
            { name: "Kısa servislere kesme ya da flick", minutes: 8 },
            { name: "Uzun servislere atak", minutes: 6 },
            { name: "Servis + üçüncü top, sayıyı sonuna kadar oynayın", minutes: 7 },
          ],
        },
      ],
      tips: [
        { title: "Aynı hareket, farklı falso", body: "En iyi servisler temas anına kadar birbirinin aynısı görünür. Sadece falsoyu değil, gizlemeyi de çalışın." },
        { title: "İyi servisleri sayın", body: "20 servisten kaçı istediğiniz yere düştü? Sayıyı antrenman notlarınıza yazın." },
        { title: "Kuralları kontrol edin", body: "Topu açık avuçtan en az 16 cm yukarı atın ve top her zaman görünür kalsın." },
      ],
      faqs: [
        { q: "Kaç servis çalışmalıyım?", a: "Antrenman başına 50–100 topluk bir kova fazlasıyla yeterli. Kaliteye ve yerleşime odaklanın." },
        { q: "İlk öğrenilmesi gereken en önemli servis hangisi?", a: "Kısa alt falso servis. Rakibin atak yapmasını engeller ve üçüncü topunuzu hazırlar." },
        { q: "Daha fazla servis tekniğini nereden öğrenebilirim?", a: "Ücretsiz servis ansiklopedimiz, pendulumdan ters pendulum ve tomahawk servisine kadar 29 servisi anlatır: nasıl atılır ve nasıl karşılanır." },
      ],
    },
    {
      slug: "multiball-training",
      emoji: "🧺",
      title: "Çoklu top antrenmanı",
      short: "Vuruşları hızla oturtmak için yüksek tekrarlı top besleme.",
      metaTitle: "Masa Tenisi Çoklu Top (Multiball) Alıştırmaları: 40 Dakika",
      metaDescription:
        "40 dakikalık çoklu top (multiball) masa tenisi antrenmanı: besleyiciyle topspin, ayak çalışması ve alt falsoya topspin alıştırmaları. İstikrar için ideal.",
      level: "Intermediate",
      sessionType: "technique",
      intro:
        "Çoklu top, kısa bir antrenmana yüzlerce tekrar sığdırır. Bir oyuncu sepetten top besler, diğeri vurur. Her sette rolleri değiştirin; böylece ikiniz de hem vurmayı hem de beslemeyi çalışırsınız.",
      blocks: [
        {
          title: "Isınma",
          items: [{ name: "Rahat ralli ve gölge vuruşlar", minutes: 6 }],
        },
        {
          title: "Ana bölüm (20–30 topluk setler)",
          items: [
            { name: "Forehand topspin, sabit nokta", minutes: 6 },
            { name: "Backhand topspin, sabit nokta", minutes: 6 },
            { name: "Alt falsoya karşı topspin, forehand ve backhand sırayla", minutes: 8 },
            { name: "Rastgele yerleşim, tüm masa", minutes: 8 },
          ],
        },
        {
          title: "Soğuma",
          items: [{ name: "Topları toplayın, esneyin", minutes: 6 }],
        },
      ],
      tips: [
        { title: "Tempoyu besleyen belirler", body: "Yavaş başlayın; ancak oyuncu 10 toptan 8'ini hedefe gönderdiğinde hızlanın." },
        { title: "Kısa setler", body: "Set başına 20–30 top tekniği keskin tutar. Yorgunluk kötü alışkanlıkları kalıcı hale getirir." },
        { title: "İki rolü de kaydedin", body: "Teknik antrenmanı olarak kaydedin; neyi beslediğinizi ve neye vurduğunuzu not edin." },
      ],
      faqs: [
        { q: "Çoklu top için kaç topa ihtiyacım var?", a: "Sürekli top toplamamak için en az 60–100. Antrenman topları ucuzdur." },
        { q: "Çoklu top normal alıştırmalardan daha mı iyi?", a: "Tekrar ve ayak çalışması için daha iyidir; gerçek bir topa karşı zamanlama için normal ralliler daha iyidir. İkisini de kullanın." },
        { q: "Yeni başlayanlar çoklu top çalışabilir mi?", a: "Evet, tek noktaya yavaş ve tahmin edilebilir beslemelerle. Bir vuruşu öğrenmenin en hızlı yollarından biridir." },
      ],
    },
    {
      slug: "forehand-backhand-consistency",
      emoji: "🔁",
      title: "Forehand ve backhand istikrarı",
      short: "Uzun ralliler, hedefler ve geçiş çalışması.",
      metaTitle: "Masa Tenisi İçin Forehand ve Backhand İstikrar Alıştırmaları",
      metaDescription:
        "55 dakikalık masa tenisi istikrar antrenmanı: hedefli ralliler, paralel vuruşlar, forehand-backhand geçişi ve karşı vuruş alıştırmaları. Yazdırılabilir.",
      level: "All levels",
      sessionType: "technique",
      intro:
        "İstikrar, bitirici vuruşlardan daha çok maç kazandırır. Bu antrenman ralli sayısı hedefleri üzerine kurulu; böylece her alıştırmanın net bir bitiş çizgisi olur. En iyi sayınızı notlarınıza yazın ve gelecek hafta geçmeye çalışın.",
      blocks: [
        {
          title: "Isınma",
          items: [
            { name: "Mobilite ve gölge vuruşlar", minutes: 4 },
            { name: "Forehand ve backhand çapraz", minutes: 6 },
          ],
        },
        {
          title: "Ana bölüm",
          items: [
            { name: "Forehand çapraz, hedef: arka arkaya 50", minutes: 10 },
            { name: "Backhand çapraz, hedef: arka arkaya 50", minutes: 10 },
            { name: "Paralel: FH'den BH'ye", minutes: 8 },
            { name: "Geçiş: 2 BH – 1 FH", minutes: 10 },
          ],
        },
        {
          title: "Oyun",
          items: [{ name: "Ralli oyunları: sayı ancak 5. toptan sonra geçerli", minutes: 7 }],
        },
      ],
      tips: [
        { title: "%70 güç", body: "İstikrar alıştırmaları hızla ilgili değildir. Gevşek kalın ve ritminizi bulun." },
        { title: "Bir hedef seçin", body: "Masaya küçük bir nesne koyun. Topu sadece 'masaya' değil, onun yakınına düşürmeye çalışın." },
        { title: "Rekorunuzu takip edin", body: "Antrenmandaki en iyi ralli sayınızı not edin. Arttığını görmek motive eder." },
      ],
      faqs: [
        { q: "Arka arkaya kaç top iyi sayılır?", a: "Hatasız 50 çapraz düz vuruş sağlam bir kulüp seviyesi ölçütüdür; 100 ise mükemmeldir." },
        { q: "Backhand'im neden daha az istikrarlı?", a: "Genellikle dirsek geriye kayar ya da raket açısı açılır. Dirseği önde tutun ve kısa bir vuruş yapın." },
        { q: "Oyun mu oynamalıyım, alıştırma mı yapmalıyım?", a: "İkisini de. Antrenmanın %70–80'ini alıştırmaya ayırın, sonunda öğrendiklerinizi oyunlarda test edin." },
      ],
    },
    {
      slug: "match-play-prep",
      emoji: "🏆",
      title: "Maça hazırlık",
      short: "Turnuva öncesi servis-karşılama kalıpları ve baskı altında oyunlar.",
      metaTitle: "Masa Tenisi Maç Hazırlık Antrenmanı (Turnuva Öncesi)",
      metaDescription:
        "60 dakikalık masa tenisi maç hazırlık antrenmanı: servis ve üçüncü top kalıpları, baskı oyunları ve lig maçı ya da turnuva öncesi taktik oyun.",
      level: "Intermediate",
      sessionType: "match",
      intro:
        "Lig maçından ya da turnuvadan önceki hafta odağınızı teknikten karar vermeye kaydırın. Bu antrenman favori kalıplarınızı çalıştırır ve üzerine baskı ekler; böylece maç günü size tanıdık gelir. Galibiyet oranınızı görmek için antrenman maçlarını maç olarak kaydedin.",
      blocks: [
        {
          title: "Isınma",
          items: [
            { name: "Koşu, dinamik esneme", minutes: 4 },
            { name: "FH / BH ralli ve kısa oyun", minutes: 6 },
          ],
        },
        {
          title: "Kalıplar",
          items: [
            { name: "En iyi servisiniz + üçüncü top atağı", minutes: 10 },
            { name: "Karşılama + dördüncü top", minutes: 8 },
            { name: "8–8, 9–9 ve 10–10'dan başlayın (baskı oyunları)", minutes: 10 },
          ],
        },
        {
          title: "Maç",
          items: [
            { name: "Antrenman partnerine karşı 3 set alan kazanır", minutes: 18, note: "Set skorlarıyla maç olarak kaydedin" },
            { name: "Soğuma ve değerlendirme", minutes: 4 },
          ],
        },
      ],
      tips: [
        { title: "İki servis yeter", body: "Güvendiğiniz iki servis seçin. Maç günü deneme yapma günü değildir." },
        { title: "Rakip notlarıyla analiz yapın", body: "Bir dahaki sefere plan yapabilmek için her rakibin oyun tarzını ve el tercihini kaydedin." },
        { title: "Yükü azaltın", body: "Turnuvadan önceki günü kısa ve hafif tutun. Isı haritanız seriyi yine de gösterecek." },
      ],
      faqs: [
        { q: "Turnuvadan önceki hafta nasıl antrenman yapmalıyım?", a: "Hacmi azaltın, yoğunluğu koruyun; servis-karşılama kalıplarına ve baskı anlarına odaklanın." },
        { q: "Baskı oyunları nedir?", a: "8–8 ya da 9–9 gibi başa baş bir skorla başlayan setler; böylece ilk servisten itibaren her sayı önem taşır." },
        { q: "Antrenman maçlarını kaydetmeli miyim?", a: "Evet. Antrenman ve turnuva maçlarını ayrı kaydetmek, antrenmandaki formunuzun maçlara yansıyıp yansımadığını gösterir." },
      ],
    },
  ],
};
