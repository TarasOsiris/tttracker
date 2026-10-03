/**
 * Turkish translations for all data entities.
 * Keyed by entity ID, each value contains the translatable text fields.
 * Non-text fields (numbers, IDs, booleans, coordinates) are NOT included.
 */

import type { DataTranslations } from "./es-data";

export const trData: DataTranslations = {
  serves: {
    "pendulum-backspin-short": {
      name: "Pendulum Alt Falso Kısa",
      description: "Temel servis. Backhand tarafına ya da ortaya atılan, sol yan falsolu kısa alt falso. Çoğu zaman itmeyle karşılanır ve üçüncü top atağına zemin hazırlar.",
      contactPoint: "Topa alt-arka kısmından açık raket yüzeyiyle temas edin. Bileğin sarkaç yayı boyunca doğal şekilde salınmasına izin vererek aşağı ve hafifçe sağa doğru sürtün. İnce temas alt falsoyu en üst düzeye çıkarır, yana doğru devam eden vuruş ise yan falso ekler.",
      returnAdvice: "Topu sektikten hemen sonra erken noktada, açık raketle ve alt falso ekleyen kısa, sürtmeli bir itmeyle karşılayın. Kısa tutun ya da yan falsoya hafifçe karşı nişan alarak servis atanın backhand tarafına veya dirseğine derin itin. Top yüksek kalırsa kontrollü bir flip, topu kaldırmaktan daha güvenlidir.",
    },
    "pendulum-sidespin-long": {
      name: "Pendulum Yan Falso Uzun",
      description: "Köşelere atılan, yan falsolu ve alt falsolu hızlı pendulum servis. Topun çizdiği kavis kaliteli karşılamayı zorlaştırabilir ve üçüncü top fırsatı yaratır.",
      contactPoint: "Topa arka-sol kısmından hafif kapalı raket yüzeyiyle temas edin. Kısa versiyona göre daha hızlı ve daha kalın bir temasla topun içinden ileri ve yana doğru sürtün. Ekstra hız için bilek temas anında hızlanır.",
      returnAdvice: "Uzun gelirse geri çekilin ve alt falsoyu karşılamak için ekstra yukarı kaldırma içeren kontrollü bir topspin/drive kullanın. Yan falsoyu dengelemek ve topu alçak tutmak için hafifçe servis atanın backhand tarafına nişan alın. Atak yapamıyorsanız hızlı ve falsolu bir itme daha güvenli bir alternatiftir.",
    },
    "pendulum-no-spin": {
      name: "Pendulum Falsosuz",
      description: "Alt falsolu pendulum gibi görünür ama top falsosuz süzülür. Alt falso bekleyip iten rakipler genellikle topu havalandırır.",
      contactPoint: "Topa arka-orta kısmından neredeyse düz bir raket yüzeyiyle temas edin. Raket topun altından sürtmek yerine arkasından kayar ve yalnızca kısa, kalın bir temas kurar. Kol ve bilek falso veriyormuş gibi hareketi sürdürür, ancak düz açı dönüşü öldürür.",
      returnAdvice: "Kontrol için kendi falsonuzu ekleyin: kompakt bir itme ya da hafif kapalı raketle kontrollü bir flip/drive kullanın. Ölü (pasif) dokunuştan kaçının; top genellikle havalanır. Alçak tutun ve köşelere yerleştirin.",
    },
    "pendulum-topspin": {
      name: "Pendulum Üst Falso",
      description: "Alt falso gibi gizlenir ama aslında üst falsoludur. Top sekişte ileri fırlar ve onu itmeye çalışan rakipleri yakalar.",
      contactPoint: "Topa arka-üst kısmından hafif kapalı raket yüzeyiyle temas edin. Topun üst yarısını yakalayarak topun içinden yukarı ve ileri doğru sürtün. Sarkaç hareketi yukarı doğru sürtmeyi gizler — kol yana doğru devam ederken bilek temas anında topun üzerinden dönerek üst falso üretir.",
      returnAdvice: "İtmeyin. Raketi kapatın ve top ileri fırlamadan önce erken noktada blok yapın ya da karşı topspin atın. Yan falsoyu dengelemek için hafifçe servis atanın backhand tarafına nişan alın ve topu alçak tutun.",
    },
    "reverse-pendulum-sidespin-short": {
      name: "Ters Pendulum Kısa",
      description: "Sağ yan falsolu ve alt falsolu kısa servis. Normal pendulumun tersi yönde kavis çizmesi, özellikle standart servislere alışkın rakipler için okunmasını zorlaştırabilir.",
      contactPoint: "Topa alt-arka kısmından açık raket yüzeyiyle temas edin. Bileğin ters yöndeki hareketini kullanarak aşağı ve sola doğru (normal pendulumun tersine) sürtün. Temas anında raket gövdenin önünden soldan sağa hareket eder.",
      returnAdvice: "Erken noktada açık raketle ve alt falso ekleyen kısa, sürtmeli bir itmeyle karşılayın. Sağ yan falsoyu dengelemek için hafifçe servis atanın forehand tarafına nişan alın ve topu alçak tutun. Top yüksek kalırsa yumuşak bir flip, topu kaldırmaktan daha güvenlidir.",
    },
    "reverse-pendulum-topspin-long": {
      name: "Ters Pendulum Üst Falso Uzun",
      description: "Sağ yan falsolu ve üst falsolu uzun servis. Top servis atanın soluna doğru kavis çizer ve sekişte yana fırlar; kaliteli atak yapmayı zorlaştırır.",
      contactPoint: "Topa arka-sağ kısmından hafif kapalı raket yüzeyiyle temas edin. Topun içinden yukarı ve sola doğru sürtün. Ters pendulum hareketi sağ yan falso üretirken yukarı yönlü bileşen üst falso ekler.",
      returnAdvice: "Raketi kapatın ve topu erken alarak blok, drive ya da karşı topspin yapın. Yan falsoyu dengelemek için hafifçe servis atanın forehand tarafına nişan alın. Topspin çekerseniz topun üstünden sürtün ve yayı alçak tutun.",
    },
    "tomahawk-sidespin-long": {
      name: "Tomahawk Uzun",
      description: "Güçlü sağ yan falso ve üst falso taşıyan agresif uzun servis. Top sektikten sonra sertçe yana fırlar ve rakibi zamana karşı zorlar.",
      contactPoint: "Topa arka-sağ kısmından neredeyse dikey raket yüzeyiyle temas edin. Fırlatma hareketiyle ileri ve keskin biçimde sola doğru sürtün. Bilek temas anında dışa doğru kırılır; güçlü bir sağ yan falso üretirken salınımın yukarı yönlü yayı üst falso ekler.",
      returnAdvice: "Erken noktada kapalı raketle kompakt bir blok ya da drive ile karşılayın. Yan falsoyu dengelemek için hafifçe servis atanın forehand tarafına nişan alın ve topu alçak tutun. Zamanınız varsa kontrollü bir topspin en iyi seçenektir.",
    },
    "tomahawk-backspin-short": {
      name: "Tomahawk Alt Falso Kısa",
      description: "Alt falsolu, nadir görülen kısa bir tomahawk. Alışılmadık hareket ile kısa yerleşimin birleşimi, rakiplerin bu servisi okumasını ve agresif karşılamasını çok zorlaştırır.",
      contactPoint: "Topa alt kısmından açık ve yana açılı bir raket yüzeyiyle temas edin. Tomahawk yayı içinde aşağı ve sola doğru sürtün. Topun altındaki ince temas alt falso üretirken yana hareket yan falso ekler. Daha yumuşak ve yavaş bir bilek kırma topu kısa tutar.",
      returnAdvice: "Topu alçak tutmak için açık raket ve kısa, sürtmeli bir itme kullanın. Yan falsoyu dengelemek için hafifçe servis atanın forehand tarafına nişan alın. İyi bir falsoyla derin itemiyorsanız kısa tutun.",
    },
    "reverse-tomahawk-topspin-long": {
      name: "Ters Tomahawk Uzun",
      description: "Ding Ning'in imza servisi. Normal bir tomahawk ile birebir aynı başlar ama son anda backhand yüzüyle temasa geçer ve beklenen sağ yan falso yerine üst falsolu sol yan falso üretir. Top üst falso nedeniyle hızla düşer ve sektikten sonra sertçe ters yöne fırlar. Derin bir çömelme ve hassas zamanlama gerektirir. Normal tomahawk servislerle karıştırıldığında en aldatıcıdır.",
      contactPoint: "Topa arka-sol kısmından backhand lastiğiyle, raket yüzeyi neredeyse dikey olacak şekilde temas edin. Tomahawk salınımının son anında, ileri ve sağa doğru sürtmek için bileği içe çevirin. Bu, normal tomahawka göre yan falso yönünü tersine çevirir ve üst falsolu sol yan falso üretir.",
      returnAdvice: "Raketi kapatın ve topu erken noktada kompakt bir blok ya da karşı topspin ile karşılayın. Sol yan falsoyu dengelemek için hafifçe servis atanın backhand tarafına nişan alın. İtmeyin — üst falso topu uzun gönderir. Yan falsonun yönü belirsizse riski azaltmak için ortaya nişan alın.",
    },
    "backhand-backspin-short": {
      name: "Backhand Alt Falso Kısa",
      description: "Kısa yerleştirilen, saf alt falsolu kompakt bir backhand servis. Hızlı uygulanır ve bir sonraki topa hemen hazır olmayı sağlar. Birçok seviyede yaygındır.",
      contactPoint: "Topa alt kısmından açık raket yüzeyiyle temas edin. Kompakt bir bilek hareketiyle doğrudan aşağı doğru sürtün; vuruşu kısa ve kontrollü tutun. Raket neredeyse hiç ileri gitmez — saf alt falso üretmek için hareketin neredeyse tamamı aşağı doğrudur.",
      returnAdvice: "Raketi açın ve kısa bir itmeyle topun altından sürtün, erken noktada temas edin. Kısa tutun ya da uzatmak isterseniz köşelere derin itin. Topu kaldırmak yerine alçak tutmaya odaklanın.",
    },
    "backhand-no-spin-long": {
      name: "Backhand Hızlı Uzun",
      description: "Köşelere atılan, çok az falsolu hızlı bir backhand servis. Saf hız, özellikle kısa alt falsolu servislerle karıştırıldığında rakibi hazırlıksız yakalar.",
      contactPoint: "Topa arka-orta kısmından neredeyse düz bir raket yüzeyiyle temas edin. Sürtmek yerine hızlı, yumruk atar gibi bir hareketle topun içinden itin. Kalın ve düz temas falsoyu en aza indirirken hızı en üst düzeye çıkarır. Kol hedefe doğru tamamen uzanır.",
      returnAdvice: "Topu sekişin en yüksek noktası civarında kompakt bir blok ya da kontrollü bir drive ile karşılayın, kontrol için biraz üst falso ekleyin. Raketi sadece öne uzatmakla yetinmeyin; falsosuz servisler sizin kendi falsonuzu ister. Topu köşelere derin ya da dirseğe yerleştirin.",
    },
    "backhand-sidespin": {
      name: "Backhand Yan Falso",
      description: "Sağ yan falsolu ve alt falsolu backhand servis. Kompakt hareket falsoyu okumayı zorlaştırır ve servis atan, backhand ile devam vuruşu için zaten pozisyondadır.",
      contactPoint: "Topa alt-sağ kısmından açık raket yüzeyiyle temas edin. Kompakt bir bilek hareketiyle topun üzerinden aşağı ve sola doğru sürtün. Yan falso bileğin yana hareketinden gelir, açık yüzey ise alt falso üretir.",
      returnAdvice: "Erken noktada açık raketle ve alt falso ekleyen kısa, sürtmeli bir itmeyle karşılayın. Yan falsoyu dengelemek için hafifçe servis atanın forehand tarafına nişan alın. Top yükselirse kompakt bir flip iyi sonuç verir.",
    },
    "hook-heavy-side-short": {
      name: "Hook Ağır Yan Falso Kısa",
      description: "Topun altından kepçe gibi alan, aşırı yan falso üreten bir hareket. Top sekişte yana sıçrar. Alışılmadık raket açısı nedeniyle okunması çok zordur.",
      contactPoint: "Topa sol kısmından, raket yüzeyi neredeyse yatay olacak şekilde, altından ve çevresinden kepçe gibi alarak temas edin. Hook hareketi topun ekvatoru boyunca yana doğru sürter. Yan falso bileşenini en üst düzeye çıkarmak için bilek keskin biçimde içe kıvrılır.",
      returnAdvice: "Ağır yan falsoyu dengelemek için raketi açılandırın ve topa arkasından değil yanından temas edin. Yumuşak bir dokunuş ya da muz (banana) flip, sert vuruştan daha güvenlidir. Hafifçe servis atanın backhand tarafına nişan alın ve topu alçak tutun.",
    },
    "hook-backspin-short": {
      name: "Hook Alt Falso Kısa",
      description: "Ağır yan falso ile alt falsoyu birleştiren hook servis. İki falso bileşeni isabetli karşılamayı çok zorlaştırır.",
      contactPoint: "Topa alt-sol kısmından açık ve yana açılı bir raket yüzeyiyle temas edin. Kepçe gibi bir yay içinde aşağı ve sağa doğru sürterek topun hem altını hem yanını aynı anda yakalayın. Bu çift açılı sürtme, alt falso ile yan falsoyu birlikte üretir.",
      returnAdvice: "Ağır alt falsoyla başa çıkmak için raketi daha fazla açın ve sürtmeli bir itmeyle topu kaldırın. Yan falsoyu dengelemek için hafifçe servis atanın backhand tarafına nişan alın ve topu alçak tutun. Düz vurmaktan kaçının.",
    },
    "hook-fast-long-topspin": {
      name: "Hook Hızlı Uzun",
      description: "Sağ yan falsoyu üst falsoyla birleştiren, hızlı ve derin atılan agresif bir hook servis varyasyonu. Kepçe gibi hook hareketi alt falso üretiyormuş izlenimi verir, ama top sektikten sonra yan falsoyla ileri fırlar. Aldatmayı en üst düzeye çıkarmak için klasik hook alt falso servisleriyle karıştırıldığında en etkilidir.",
      contactPoint: "Topa arka-sağ kısmından hafif kapalı raket yüzeyiyle temas edin. Hızlı, kepçe gibi bir yay içinde ileri ve sola doğru sürterek topun üst-yan kısmını yakalayın. Hook hareketi üst falso üreten yukarı yönlü teması gizlerken yana devam eden vuruş sağ yan falso ekler.",
      returnAdvice: "Raketi kapatın ve topu çok erken alarak kompakt bir blok ya da karşı topspin kullanın. İtmeyin — üst falso topu uzun gönderir. Sağ yan falsoyu dengelemek için raketi hafifçe sola açılandırın. Ortaya kontrollü bir topspin en güvenli atak seçeneğidir.",
    },
    "high-toss-backspin": {
      name: "Yüksek Atış Ağır Alt Falso",
      description: "Yüksek atış, ağır falso için zaman ve enerji kazandırabilir. Top sektikten sonra gözle görülür biçimde geriye dönebilir. Rakibi zayıf itmeye zorlamak için birçok üst düzey oyuncu tarafından kullanılır.",
      contactPoint: "Yüksek atıştan düşen topa en alt noktasından tamamen açık bir raket yüzeyiyle temas edin. Düşen topun yer çekiminden gelen enerjisini kullanarak alt falsoyu artırmak için keskin biçimde aşağı doğru sürtün. En fazla falso için bilek, salınımın en alçak noktasında aşağı doğru kırılır.",
      returnAdvice: "Çok açık bir raket ve ekstra kaldırma içeren daha uzun, sürtmeli bir itme kullanın. Top uzunsa düz vuruş yerine kontrollü bir topspin ile açın. Karşılamada ağır alt falsoya ve alçak yüksekliğe öncelik verin.",
    },
    "high-toss-sidespin": {
      name: "Yüksek Atış Yan Falso",
      description: "Yüksek atışı yan falso ve alt falsoyla birleştirerek ağır bileşik falso üretir. Top çarpıcı biçimde kavis çizebilir ve masada frenlenir. Olağanüstü zamanlama gerektirir.",
      contactPoint: "Yüksek atıştan düşen topa alt-sol kısmından açık raket yüzeyiyle temas edin. Sarkaç yayı içinde aşağı ve sağa doğru sürterek topun hem altını hem sol yanını yakalayın. Yer çekimi enerjisi ile bilek kırmanın birleşimi, sol yan falsolu son derece ağır bir alt falso üretir.",
      returnAdvice: "Raketi açın ve yukarı doğru, hafifçe yan falsoya karşı sürtün. Kavsi dengelemek için hafifçe servis atanın backhand tarafına nişan alın ve topu alçak tutun. Yumuşak, falsolu bir itme sert vuruştan daha güvenlidir.",
    },
    "ghost-serve": {
      name: "Hayalet Servis",
      description: "Ma Lin'in kullanmasıyla ünlenen, efsanevi ultra kısa alt falsolu servis. Top fileyi zar zor geçer, rakibin alanında seker ve fileye doğru geri döner (bazen fileyi bile geri geçer). Gevşek bir bilek ve topun altına ince temasla üretilen en yüksek alt falsoyu gerektirir.",
      contactPoint: "Topa en alt noktasından tamamen açık (neredeyse yatay) bir raket yüzeyiyle temas edin. Son derece ince, sıyırır bir dokunuşla keskin biçimde aşağı sürtün — raket topa zar zor değer. Topun geri dönmesini sağlayan en yüksek alt falsoyu üretmek için gevşek, rahat bir bilek şarttır.",
      returnAdvice: "Öne adım atın ve topu sektiği anda çok açık bir raket ve hassas, sürtmeli bir dokunuşla karşılayın. Kısa tutun ya da ağır alt falsoyla derin itin. Beklemeyin, yoksa top geri dönüp fileye gider.",
    },
    "fast-long-surprise-fh": {
      name: "Forehand'e Hızlı Uzun",
      description: "Rakibin forehand köşesine üst falsolu, drive benzeri bir temasla atılan ani, hızlı servis. Bir dizi kısa servisin ardından araya karıştırıldığında en etkilidir. Asıl silah sürpriz unsurudur.",
      contactPoint: "Topa arka kısmından hafif kapalı raket yüzeyiyle temas edin. Hızlı, düz bir vuruşla topun içinden geçin ve üst falso eklemek için hafifçe yukarı sürtün. Odak falsoda değil hız ve ileri enerjidedir — kalın temas ve hızlı kol uzatması.",
      returnAdvice: "Raketi kapatın ve topu erken alarak kompakt bir blok ya da karşı topspin kullanın. İtmeyin. Açıyı daraltmak için topu backhand tarafına ya da ortaya derin yerleştirin.",
    },
    "fast-long-surprise-bh": {
      name: "Backhand'e Hızlı Uzun",
      description: "Backhand köşesine üst falsolu, drive benzeri bir temasla atılan hızlı servis. Masaya çok yakın duran ya da kısa karşılamaya hazırlanmış rakiplere karşı etkilidir.",
      contactPoint: "Backhand tarafından topa arka kısmından hafif kapalı raket yüzeyiyle temas edin. Hızlı, kompakt bir yumruk vuruşuyla topun içinden geçin ve hafifçe yukarı sürtün. Backhand tutuşu raketi doğal olarak kapatır ve hızlı, düz yörüngeye bir miktar üst falso ekler.",
      returnAdvice: "Hafif kapalı raketle kompakt bir backhand blok/drive kullanın. Topu erken alın ve alçak tutun. Açıyı etkisizleştirmek için topu ortaya derin ya da geniş forehand tarafına yerleştirin.",
    },
    "pendulum-corkspin": {
      name: "Pendulum Tirbuşon",
      description: "Jiroskopik, tirbuşon gibi bir falso eksenine sahip pendulum servis. Top havada yalpalayabilir ve daha öngörülemez sekebilir; bu da temiz karşılamayı zorlaştırır.",
      contactPoint: "Topa arka-sol kısmından kapalı raket yüzeyiyle temas edin. Raketi topun etrafına sarıyormuş gibi kanca hareketiyle ileri ve topun çevresinden sürtün. Jiroskopik ekseni oluşturmak için bilek temas anında içe kırılır — falso tamamen yana ya da aşağı değil, topun içine doğru gider.",
      returnAdvice: "Sekişi izleyin ve erken temas edin; yalpalamayı emmek için nötr bir raket açısı kullanın. Ortaya kontrollü bir blok ya da roll en güvenli seçenektir. Geniş bir açıyı zorlamak yerine ilk sıçramadan sonra ayarlama yapın.",
    },
    "backhand-elbow": {
      name: "Backhand ile Dirseğe",
      description: "Doğrudan rakibin dirseğine nişan alan orta hızda bir backhand servis. Sağ yan falso kavis ekler ve forehand mı backhand mi kullanılacağı konusunda kararsızlık yaratır.",
      contactPoint: "Backhand pozisyonundan topa arka-sağ kısmından hafif açık raket yüzeyiyle temas edin. Yana, sola ve hafifçe aşağı doğru sürtün. Yan falso bileğin yana hareketinden gelir; hafif aşağı açı ise topu alçak tutmaya yetecek kadar alt falso ekler.",
      returnAdvice: "Ayaklarınızı hareket ettirin ve erken karar verin; uzanmayın. Top uzunsa alt falso için ekstra kaldırma içeren kontrollü bir topspin/drive kullanın. Yan falsoyu dengelemek için dirseğe derin ya da hafifçe servis atanın forehand tarafına nişan alın.",
    },
    "high-toss-no-spin": {
      name: "Yüksek Atış Falsosuz",
      description: "Yüksek atışlı ağır alt falso servisini yakından taklit eder ama falso taşımaz. Aşırı alt falso bekleyen rakipler topu uzun ya da yüksek itebilir. Çok iyi bir top hissi gerektirir.",
      contactPoint: "Açık görünmesine rağmen topa arka-orta kısmından neredeyse düz bir raket yüzeyiyle temas edin. Raket ağır alt falso üretiyormuş gibi aşağı hareket eder, ancak sürtmek yerine lastiğin düz orta kısmıyla topa temas eder. Kalın ve kısa temas falsoyu öldürürken kol aldatıcı biçimde hareketini sürdürür.",
      returnAdvice: "Kontrol için kendi falsonuzu ekleyin: hafif kapalı raketle kompakt bir flip ya da itme kullanın. Topun biraz yükselmesine izin verin ve temasınızı temiz tutun. Topu havalandıran ölü (pasif) dokunuştan kaçının.",
    },
    "chop-backspin-short": {
      name: "Forehand Kesme Alt Falso Kısa",
      description: "Masa tenisinin en temel servisi. Yan falsosuz, saf alt falso; kısa yerleştirilir. Alçak ve kısa tutmak için en güvenli servistir ve rakibin atak yapmasını çok zorlaştırır. Agresif topspinci oyunculara karşı ideal bir tercihtir.",
      contactPoint: "Topa alt kısmından tamamen açık bir raket yüzeyiyle temas edin. Basit, temiz bir vuruşla doğrudan aşağı doğru kesin. Raket hiçbir yana hareket olmadan topun altından sürter ve saf alt falso üretir. En fazla falso için teması ince, yerleşimi kontrol etmek için ise biraz daha kalın tutun.",
      returnAdvice: "Raketi açın ve kısa bir itmeyle topun altından sürtün, erken noktada temas edin. Kısa tutun ya da iyi bir alt falsoyla derin itin. Topu kaldırmak yerine alçak tutun.",
    },
    "chop-no-spin": {
      name: "Forehand Kesme Falsosuz",
      description: "Alt falsolu versiyonla aynı kesme hareketini kullanır ama topa çok az falsoyla temas eder. Ağır alt falso bekleyen rakipler genellikle topu uzun iter ya da havalandırır ve kolay bir üçüncü top verir.",
      contactPoint: "Topa arka-orta kısmından, açık görünen ama aslında alt falsolu versiyondan daha dik olan bir raket yüzeyiyle temas edin. Kesme hareketi devam eder, ancak raket topun altından değil arkasından kayar ve çok az falso üretir. Aldatmak için vuruşun devamı alt falsolu versiyonu taklit eder.",
      returnAdvice: "Kompakt bir itme ya da kontrollü bir flip/drive ile kendi falsonuzu ekleyin. Raketi hafif kapalı, yörüngeyi alçak tutun. Ölü (pasif) dokunuştan kaçının.",
    },
    "windshield-wiper-sidespin-short": {
      name: "Silecek Yan Falso Kısa",
      description: "Raket topun üzerinden yatay olarak süpürülür ve alt falsolu sol yan falso üretir. Aynı hareket, yay üzerindeki temas noktasına bağlı olarak her tür falsoyu üretebilir; bu da okunmasını çok zorlaştırır. Filenin hemen üzerinden alçak tutulduğunda en etkilidir.",
      contactPoint: "Raket yatay bir yay içinde sağdan sola süpürülürken topa alt-sol kısmından temas edin. Silecek yayının ortasında topun altını yakalayarak topun içinden aşağı ve sağa doğru sürtün. Açık raket yüzeyi ve alçak temas noktası, alt falsoyu sol yan falsoyla birleştirir.",
      returnAdvice: "Teması okuyun ve açık raketle kısa, sürtmeli bir itme kullanın. Yan falsoyu dengelemek için hafifçe servis atanın backhand tarafına nişan alın. Ağır falsoyla derin itemiyorsanız alçak ve kısa tutun.",
    },
    "windshield-wiper-topspin": {
      name: "Silecek Üst Falso",
      description: "Aynı silecek hareketi, ancak alt falso yerine üst falso üretmek için yayın farklı bir noktasında temas edilir. Alt falso olarak okuyup iten rakipler topu uzun ya da yüksek gönderir.",
      contactPoint: "Topa yayın ortasında değil sonunda, arka-üst kısmından temas edin. Raket topu süpürmenin daha geç bir anında, hareketin yukarı ve ileri yöneldiği noktada yakalar. Hafif kapalı bir raket yüzeyi topun üstünden yukarı ve öne doğru sürterek üst falso üretir, yana hareket ise yan falso ekler.",
      returnAdvice: "İtmeyin. Raketi kapatın ve erken noktada blok yapın ya da karşı topspin atın. Yan falsoyu dengelemek için hafifçe servis atanın backhand tarafına nişan alın ve topu alçak tutun.",
    },
    "hidden-serve": {
      name: "Gizli Servis (Kural Dışı)",
      description: "Temas noktasının kasıtlı olarak gövdenin ya da serbest kolun arkasına gizlendiği servis. 1 Eylül 2002'deki servis kuralı değişikliğinden önce kurallara uygundu ve amatör oyunda hâlâ zaman zaman görülür.",
      contactPoint: "Temas değişkendir — temas gizlendiği için servis atan her tür falsoyu üretebilir. Ağır yan falso-alt falso için genellikle topun alt-sol kısmına açık raket yüzeyiyle vurulur, ancak gizleme nedeniyle karşılayan oyuncu tam temas açısını ya da sürtme yönünü göremez.",
      returnAdvice: "Kontrole öncelik verin: yan falso-alt falso olduğunu varsayın ve açık raketle falsolu, alçak bir itme kullanın. Hafifçe falsoya karşı nişan alın ve topu köşelere alçak gönderin. Temas gizlendiyse uyarı verilmesini isteyin.",
      legalityNotes: "1 Eylül 2002'den bu yana ITTF kurallarına göre kural dışıdır. Servisin başlangıcından topa vurulana kadar top karşılayan oyuncudan gizlenmemeli ve serbest kol, top ile file arasındaki alandan çekilmelidir. Şüpheli bir servis ilk seferde uyarıyla sonuçlanabilir; sonraki şüpheli servisler sayı kaybettirebilir.",
    },
    "finger-spin-serve": {
      name: "Parmakla Falso Servisi (Kural Dışı)",
      description: "Servis atan, falsoyu raketle üretmek yerine atış sırasında parmaklarıyla topa falso verir. Basit görünen bir hareketten aldatıcı bir falso çıkar.",
      contactPoint: "Falso raket temasında değil, atış sırasında parmaklarla üretilir. Parmaklar topu bırakırken döndürür ve raket topa değmeden önce alt falso ya da yan falso verir. Raket temasının kendisi neredeyse düz olabilir; bu yüzden falso sanki hiçbir yerden gelmiyormuş gibi görünür.",
      returnAdvice: "Atış sırasında topun dönüşünü izleyin ve raket açınızı bu falsoya göre ayarlayın. Açık raketle yumuşak, falsolu bir itme kullanın ya da top uzunsa kontrollü bir topspin çekin. Karşılamayı alçak tutun.",
      legalityNotes: "Kural dışıdır. Servis, top açık avuç içinde serbestçe dururken başlamalı ve atış, topa falso verilmeden neredeyse dikey olmalıdır. Atış sırasında topu parmaklarla döndürmek bu kuralı ihlal eder.",
    },
  },

  motions: {
    pendulum: {
      name: "Pendulum",
      description: "Masa tenisinde en yaygın servis. Raket (sağ elini kullananlar için) sağdan sola sarkaç gibi salınır ve alt falso ya da üst falsoyla birleşen yan falso üretir. Çok yönlüdür; aynı hareketten birçok falso varyasyonu çıkarılabilir.",
    },
    "reverse-pendulum": {
      name: "Ters Pendulum",
      description: "Raket (sağ elini kullananlar için) soldan sağa salınır ve standart pendulumun tersi yönde yan falso üretir. Daha az yaygın olduğundan rakiplerin okuması daha zordur.",
    },
    tomahawk: {
      name: "Tomahawk",
      description: "Raketin bir tomahawk baltası gibi fırlatma hareketiyle dışa doğru savrulduğu servis. Güçlü yan falso üretir ve sekişte ileri fırlama etkisi için üst falsoyla birleştirilebilir. Asya oyun stilinde popülerdir. Not: El sınıflandırması değişir — Çin antrenörlüğünde genellikle forehand servis kabul edilir (temas forehand lastiğiyledir), bazı Batılı antrenörler ise duruşa dayanarak backhand olarak sınıflandırır.",
    },
    "reverse-tomahawk": {
      name: "Ters Tomahawk",
      description: "Normal tomahawk ile aynı dışa fırlatma hareketiyle başlar ama son anda topa raketin backhand yüzüyle temas edecek şekilde değişir ve sağ yerine sol yan falso üretir. Başlangıç hareketinin aynı olması onu son derece aldatıcı kılar. Ding Ning ile yaygınlaştı; Kenta Matsudaira da kullanır.",
    },
    backhand: {
      name: "Backhand Servis",
      description: "Backhand tarafından yapılan kompakt bir servis. Bir sonraki topa hızlı geçiş sağlar ve bilek pozisyonu sayesinde doğal olarak aldatıcıdır. Birçok Avrupalı oyuncu tarafından etkili biçimde kullanılır.",
    },
    "hook-shovel": {
      name: "Hook / Kürek",
      description: "Raketin kanca hareketiyle topun altından kepçe gibi aldığı, alışılmadık bir servis. Alt falsolu ağır yan falso üretir. Alışılmadık temas noktası okunmasını çok zorlaştırır.",
    },
    chop: {
      name: "Forehand Kesme",
      description: "Açık raket yüzeyiyle yapılan basit, aşağı doğru kesme hareketi; yan falsosuz, saf alt falso üretir. Masa tenisinin en temel servisi — öğrenmesi kolay, kısa tutması kolay ve agresif karşılamaları önlemede etkili. Genellikle yeni başlayanlara öğretilen ilk servistir.",
    },
    "windshield-wiper": {
      name: "Silecek",
      description: "Raket bir cam sileceği gibi yatay bir yay çizerek topun arkasından süpürülür. Topa yayın neresinde temas edildiğine bağlı olarak aynı hareket yan falso, üst falso ya da alt falso üretebilir. Falso ne olursa olsun görünümün aynı kalması onu son derece aldatıcı kılar. Doğru uygulama için geniş ve alçak bir duruş gerektirir.",
    },
    "high-toss": {
      name: "Yüksek Atış Pendulum",
      description: "Yüksek top atışıyla (genellikle 2-5 metre) yapılan pendulum servis. Ek düşüş yüksekliği yer çekimi enerjisi katarak falso potansiyelini artırır. Mükemmel zamanlama gerektirir ama olağanüstü ağır falso üretir.",
    },
  },

  spins: {
    "pure-backspin": {
      name: "Saf Alt Falso",
      description: "Topun alçak kaymasını ve rakibin alanında frenlenmesini sağlayan temiz alt falso. Telafi etmeden itilen karşılamalar genellikle fileye gider.",
    },
    "heavy-backspin": {
      name: "Ağır Alt Falso",
      description: "En yüksek alt falso. Top masa yüzeyini kavrar ve hatta fileye doğru geri sekebilir. Flip ya da agresif topspin ile karşılamak son derece zordur.",
    },
    "pure-topspin": {
      name: "Saf Üst Falso",
      description: "Topun sektikten sonra ileri fırlamasına neden olan ileri yönlü dönüş. Rakibi zamana karşı zorlamak için genellikle hızlı uzun servislerde kullanılır.",
    },
    "left-side-backspin": {
      name: "Sol Yan Falso + Alt Falso",
      description: "Klasik pendulum kombinasyonu. Top servis atanın bakış açısından sağa doğru kavis çizer ve alt falsoyla seker. Rekabetçi oyunda çok yaygındır.",
    },
    "right-side-backspin": {
      name: "Sağ Yan Falso + Alt Falso",
      description: "Ters pendulum ya da tomahawk kombinasyonu. Top servis atanın bakış açısından sola doğru kavis çizer. Daha az yaygın olduğu için rakiplerin okuması daha zordur.",
    },
    "left-side-topspin": {
      name: "Sol Yan Falso + Üst Falso",
      description: "Topun alt falsolu gibi görünüp ileri fırladığı aldatıcı bir kombinasyon. Alt falso bekleyen rakipleri hazırlıksız yakalamak için kullanılır.",
    },
    "right-side-topspin": {
      name: "Sağ Yan Falso + Üst Falso",
      description: "Sekişte yana doğru güçlü bir fırlama üreten tomahawk tarzı kombinasyon. Forehand ataklarını hazırlamada etkilidir.",
    },
    "no-spin": {
      name: "Falsosuz Süzülen Top",
      description: "Çok az dönüşe sahip ölü bir top. Falsolu servis hareketini taklit eder ama süzülme etkisi yaratır. Falso bekleyen rakipler topu tamamen yanlış okur.",
    },
    "pure-left-sidespin": {
      name: "Saf Sol Yan Falso",
      description: "Belirgin üst ya da alt falso olmadan güçlü yana dönüş. Top havada çarpıcı biçimde kavis çizer ve sekişte yana fırlar.",
    },
    "pure-right-sidespin": {
      name: "Saf Sağ Yan Falso",
      description: "Ters yönde güçlü yana dönüş. Ters pendulum ve tomahawk hareketleriyle etkilidir.",
    },
    "light-backspin": {
      name: "Hafif Alt Falso",
      description: "Falsosuzdan ayırt etmesi zor, hafif alt falso. Top ölü bir topa göre biraz daha uzun süzülür ve rakibi itme ile flip arasında kararsız bırakır.",
    },
    "heavy-left-side-backspin": {
      name: "Ağır Sol Yan Falso + Alt Falso",
      description: "Pendulum hareketinden elde edilen en yüksek bileşik falso. Top kavis çizer, düşer ve sertçe frenlenir. Birçok elit oyuncunun imza servisi.",
    },
    corkspin: {
      name: "Tirbuşon Falso",
      description: "Öngörülemez sekme davranışı üreten jiroskopik bir falso ekseni. Top havada yalpalıyor ve yön değiştiriyormuş gibi görünür.",
    },
  },

  bounces: {
    "short-low": {
      label: "Kısa (2. sekme masada)",
      secondBouncePosition: "Masada, fileye yakın",
    },
    "short-medium": {
      label: "Kısa (2. sekme dip çizgiye yakın)",
      secondBouncePosition: "Masanın dip çizgisine yakın",
    },
    "half-long": {
      label: "Yarı Uzun",
      secondBouncePosition: "Tam dip çizgide — belirsiz uzunluk",
    },
    "long-medium": {
      label: "Uzun (derin)",
      secondBouncePosition: "Masanın epey dışına düşer",
    },
    "long-high": {
      label: "Uzun (hızlı ve derin)",
      secondBouncePosition: "Masanın çok dışında",
    },
    "deep-long": {
      label: "Derin Uzun (dip çizgi)",
      secondBouncePosition: "Tam rakibin dip çizgisinde. Uzun olmasına rağmen iyi yerleştirilmiş derin bir servis rakibi sıkıştırır ve kaliteli bir atak yapmasını zorlaştırır.",
    },
  },

  speeds: {
    slow: {
      tacticalNote: "Falso potansiyelini en üst düzeye çıkarır. Servis atana bir sonraki topa hazırlanmak için daha fazla zaman kazandırır.",
    },
    medium: {
      tacticalNote: "Falso ile hızı dengeler. Kontrolü korurken rakibin tepki süresini kısaltır.",
    },
    fast: {
      tacticalNote: "Rakibi zamana karşı zorlar. Zayıf bir karşılamaya ya da doğrudan sayıya (as) zorlamak için falsoyu saf hıza feda eder.",
    },
  },

  trajectories: {
    flat: {
      netClearance: "Filenin hemen üzerinden (1-3 cm)",
    },
    "low-arc": {
      netClearance: "Filenin üzerinden alçak yay (5-15 cm)",
    },
    "high-arc": {
      netClearance: "Filenin üzerinden yüksek yay (20+ cm)",
    },
  },

  tosses: {
    "low-legal": {
      position: "Açık avuç, top görünür, ~16 cm yukarı atılır",
    },
    "medium-legal": {
      position: "Açık avuç, top görünür, ~30-50 cm yukarı atılır",
    },
    "high-legal": {
      position: "Açık avuç, top görünür, 2-5 metre yukarı atılır",
    },
    "hidden-illegal": {
      position: "Atış sırasında top gövdenin ya da kolun arkasına gizlenir — ITTF kurallarına göre kural dışı",
    },
  },

  deceptions: {
    "fake-backspin": {
      name: "Sahte Alt Falso",
      description: "Servis atan ağır alt falso hareketini taklit eder ama topa çok az falsoyla ya da üst falsoyla temas eder. Rakip alt falso bekler ve topu uzun ya da fileye iter.",
      counterplay: "Temas noktasını dikkatle izleyin. Raket topun altından kayıyorsa alt falsodur. Topun arkasından sürtüyorsa büyük olasılıkla falsosuz ya da üst falsodur.",
    },
    "same-motion": {
      name: "Aynı Hareketle Varyasyon",
      description: "Farklı falso türleri birebir aynı servis hareketiyle atılır. Rakip alt falso, falsosuz ve yan falso varyasyonlarını birbirinden ayıramaz.",
      counterplay: "Kol hareketine değil, temas sesine ve topun yörüngesine odaklanın. Topun uçuş çizgisini okumayı çalışın.",
    },
    "contact-hiding": {
      name: "Temas Noktasını Gizleme",
      description: "Servis atan, raket-top temasının tam anını ve açısını gizlemek için vücut pozisyonunu ya da kol açısını kullanır.",
      counterplay: "Servis atanın vücut açısının ötesini görebileceğiniz şekilde konumlanın. Temas tamamen gizleniyorsa hakemden görünürlük kurallarını uygulamasını isteyin.",
    },
    "wrist-snap": {
      name: "Bilek Kırma Aldatması",
      description: "Hızlı bir bilek kırma ağır falso izlenimi verir, ancak temas anındaki raket yüzeyi açısı beklenenden çok daha az falso üretir.",
      counterplay: "Yalnızca bilek hızına tepki vermeyin. Topun sektikten hemen sonraki davranışına odaklanın.",
    },
    "speed-variation": {
      name: "Hız Varyasyonu",
      description: "Rakibin zamanlamasını ve ayak hareketlerini bozmak için aynı hareketle hızlı ve yavaş servisler arasında geçiş yapılır.",
      counterplay: "Nötr bir hazır pozisyonda, parmak uçlarınızda durun. Topun hızını erken okuyun ve geri çekişinizi buna göre ayarlayın.",
    },
    "body-feint": {
      name: "Vücut Çalımı",
      description: "Servis atan omuz, kalça ya da baş hareketiyle, gerçekte atılandan farklı bir yerleşim ya da falso yönü izlenimi verir.",
      counterplay: "Beden dilini görmezden gelin; rakete ve topa odaklanın. Falsoyu servis atanın vücut hareketinden değil, topun dönüşünden okumayı çalışın.",
    },
  },

  tacticalPurposes: {
    "force-weak-return": {
      name: "Zayıf Karşılamaya Zorla",
      goal: "Rakibin üçüncü topta atak yapılabilecek yüksek ya da uzun bir karşılama yapmasını sağlamak.",
    },
    "set-up-fh-attack": {
      name: "Forehand Atağı Hazırla",
      goal: "Servisi, karşılama agresif bir topspin ya da smaç için forehand tarafına gelecek şekilde yerleştirmek.",
    },
    "prevent-flip": {
      name: "Flip'i Önle",
      goal: "Servisi, rakibin flip ya da agresif atak yapamayacağı kadar kısa ve alçak tutmak.",
    },
    "force-push": {
      name: "İtmeye Zorla",
      goal: "Rakibi itmeye zorlayan ve servis atana üçüncü topta inisiyatif veren ağır alt falso.",
    },
    "target-elbow": {
      name: "Dirseği Hedefle",
      goal: "Forehand ile backhand arasında kararsızlık yaratmak için rakibin dirseğine (geçiş noktasına) nişan almak.",
    },
    "go-for-ace": {
      name: "Doğrudan Sayı (As)",
      goal: "Hız, yerleşim ya da aldatma yoluyla sayıyı doğrudan kazanmak için tasarlanmış yüksek riskli servis.",
    },
    "serve-plus-one-fh": {
      name: "Servis+1 Forehand",
      goal: "Beklenen karşılamaya hazır bir pozisyondan forehand ile atak yapılabilecek şekilde tasarlanmış servis kalıbı.",
    },
    "serve-plus-one-bh": {
      name: "Servis+1 Backhand",
      goal: "Beklenen karşılamaya sert bir backhand vuruş (punch) ya da topspin ile atak yapılabilecek şekilde tasarlanmış servis kalıbı.",
    },
  },

  placements: {
    "fh-short": {
      label: "Forehand Kısa",
    },
    "bh-short": {
      label: "Backhand Kısa",
    },
    "fh-long": {
      label: "Forehand Uzun",
    },
    "bh-long": {
      label: "Backhand Uzun",
    },
    "middle-short": {
      label: "Orta Kısa (Dirsek)",
    },
    "middle-long": {
      label: "Orta Uzun (Dirsek)",
    },
  },
};
