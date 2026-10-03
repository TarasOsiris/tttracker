/**
 * Indonesian translations for all data entities.
 * Keyed by entity ID, each value contains the translatable text fields.
 * Non-text fields (numbers, IDs, booleans, coordinates) are NOT included.
 */

import type { DataTranslations } from "./es-data";

export const idData: DataTranslations = {
  serves: {
    "pendulum-backspin-short": {
      name: "Pendulum Backspin Pendek",
      description: "Servis andalan sehari-hari. Backspin pendek dengan sidespin kiri ke backhand atau tengah. Sering memancing pengembalian push dan menyiapkan serangan bola ketiga.",
      contactPoint: "Sentuh bagian bawah-belakang bola dengan sudut bet terbuka. Gesek ke bawah dan sedikit ke kanan, biarkan pergelangan tangan berayun alami mengikuti busur pendulum. Sentuhan tipis memaksimalkan backspin, sementara gerak lanjutan ke samping menambahkan sidespin.",
      returnAdvice: "Ambil lebih awal setelah bola memantul dengan bet terbuka dan push pendek yang menggesek untuk menambah backspin. Kembalikan pendek, atau push panjang ke backhand atau siku pelaku servis, sedikit melawan arah sidespin. Jika bola naik, flick yang terkontrol lebih aman daripada mengangkat bola.",
    },
    "pendulum-sidespin-long": {
      name: "Pendulum Sidespin Panjang",
      description: "Pendulum cepat ke sudut-sudut meja dengan sidespin dan backspin. Lengkungannya bisa menyulitkan pengembalian yang berkualitas dan membuka peluang bola ketiga.",
      contactPoint: "Sentuh sisi belakang-kiri bola dengan sudut bet sedikit tertutup. Gesek ke depan dan ke samping melewati bola dengan kecepatan lebih tinggi dan sentuhan lebih tebal daripada versi pendek. Pergelangan tangan berakselerasi saat kontak untuk menambah laju bola.",
      returnAdvice: "Jika bola datang panjang, mundur dan gunakan topspin/drive terkontrol dengan angkatan ekstra untuk melawan backspin. Arahkan sedikit ke backhand pelaku servis untuk menetralkan sidespin dan jaga bola tetap rendah. Push cepat yang penuh putaran adalah pilihan aman jika kamu tidak bisa menyerang.",
    },
    "pendulum-no-spin": {
      name: "Pendulum Tanpa Putaran",
      description: "Terlihat seperti pendulum backspin, tetapi bola melayang tanpa putaran. Lawan yang melakukan push karena mengira backspin sering membuat bola melambung.",
      contactPoint: "Sentuh bagian belakang-tengah bola dengan permukaan bet hampir datar. Bet meluncur di belakang bola, bukan menggesek di bawahnya, sehingga kontaknya singkat dan tebal. Lengan dan pergelangan tangan tetap melanjutkan gerakan seolah menghasilkan putaran, tetapi sudut datar mematikan rotasi.",
      returnAdvice: "Tambahkan putaran sendiri agar terkontrol: gunakan push yang ringkas atau flick/drive terkontrol dengan bet sedikit tertutup. Hindari sentuhan mati karena bola cenderung melambung. Jaga bola tetap rendah dan arahkan ke sudut-sudut.",
    },
    "pendulum-topspin": {
      name: "Pendulum Topspin",
      description: "Disamarkan sebagai backspin, padahal sebenarnya topspin. Bola melonjak ke depan saat memantul dan menjebak lawan yang mencoba mengembalikannya dengan push.",
      contactPoint: "Sentuh bagian belakang-atas bola dengan sudut bet sedikit tertutup. Gesek ke atas dan ke depan melewati bola, mengenai bagian atasnya. Gerakan pendulum menyamarkan gesekan ke atas — pergelangan tangan berputar menutup saat kontak untuk menghasilkan topspin, sementara lengan terus bergerak ke samping.",
      returnAdvice: "Jangan push. Tutup bet lalu blok atau counter-topspin lebih awal sebelum bola melonjak. Arahkan sedikit ke backhand pelaku servis untuk menetralkan sidespin dan jaga bola tetap rendah.",
    },
    "reverse-pendulum-sidespin-short": {
      name: "Pendulum Terbalik Pendek",
      description: "Servis pendek dengan sidespin kanan dan backspin. Lengkungannya yang berlawanan dengan pendulum biasa bisa sulit dibaca, terutama oleh lawan yang terbiasa dengan servis standar.",
      contactPoint: "Sentuh bagian bawah-belakang bola dengan sudut bet terbuka. Gesek ke bawah dan ke kiri (kebalikan dari pendulum biasa) dengan gerakan punggung pergelangan tangan. Saat kontak, bet bergerak dari kiri ke kanan menyilang di depan badan.",
      returnAdvice: "Ambil lebih awal dengan bet terbuka dan push pendek yang menggesek untuk menambah backspin. Arahkan sedikit ke forehand pelaku servis untuk menetralkan sidespin kanan dan jaga bola tetap rendah. Jika bola naik, flick lembut lebih aman daripada mengangkat bola.",
    },
    "reverse-pendulum-topspin-long": {
      name: "Pendulum Terbalik Topspin Panjang",
      description: "Servis panjang dengan sidespin kanan dan topspin. Bola melengkung ke kiri pelaku servis dan melonjak ke samping saat memantul, sehingga sulit diserang dengan berkualitas.",
      contactPoint: "Sentuh sisi belakang-kanan bola dengan sudut bet sedikit tertutup. Gesek ke atas dan ke kiri melewati bola. Gerakan pendulum terbalik menghasilkan sidespin kanan, sementara komponen gerakan ke atas menambahkan topspin.",
      returnAdvice: "Tutup bet lalu blok, drive, atau counter-topspin, dan ambil bola lebih awal. Arahkan sedikit ke forehand pelaku servis untuk menetralkan sidespin. Jika kamu melakukan loop, gesek bagian atas bola dan jaga lengkungannya tetap rendah.",
    },
    "tomahawk-sidespin-long": {
      name: "Tomahawk Panjang",
      description: "Servis panjang agresif dengan sidespin kanan dan topspin yang kuat. Bola melonjak tajam ke samping setelah memantul dan membuat lawan terburu-buru.",
      contactPoint: "Sentuh sisi belakang-kanan bola dengan permukaan bet hampir tegak. Gesek ke depan dan tajam ke kiri dengan gerakan seperti melempar. Pergelangan tangan menghentak ke luar saat kontak, menghasilkan sidespin kanan yang kuat dengan topspin dari busur ayunan yang naik.",
      returnAdvice: "Ambil lebih awal dengan bet tertutup dan blok atau drive yang ringkas. Arahkan sedikit ke forehand pelaku servis untuk menetralkan sidespin, dan jaga bola tetap rendah. Jika ada waktu, topspin terkontrol adalah pilihan terbaik.",
    },
    "tomahawk-backspin-short": {
      name: "Tomahawk Backspin Pendek",
      description: "Tomahawk pendek dengan backspin yang jarang dipakai. Gerakan yang tidak biasa ditambah penempatan pendek membuat servis ini sangat sulit dibaca dan dikembalikan secara agresif oleh lawan.",
      contactPoint: "Sentuh bagian bawah bola dengan permukaan bet terbuka dan miring ke samping. Gesek ke bawah dan ke kiri mengikuti busur tomahawk. Sentuhan tipis di bawah bola menghasilkan backspin, sementara gerakan ke samping menambahkan sidespin. Hentakan pergelangan yang lebih lembut dan lambat menjaga bola tetap pendek.",
      returnAdvice: "Gunakan bet terbuka dan push pendek yang menggesek untuk menjaga bola tetap rendah. Arahkan sedikit ke forehand pelaku servis untuk menetralkan sidespin. Kembalikan pendek kecuali kamu bisa push panjang dengan putaran yang baik.",
    },
    "reverse-tomahawk-topspin-long": {
      name: "Tomahawk Terbalik Panjang",
      description: "Servis khas Ding Ning. Dimulai persis seperti tomahawk biasa, tetapi beralih ke kontak backhand pada detik terakhir, sehingga menghasilkan sidespin kiri dengan topspin, bukan sidespin kanan yang diharapkan. Bola cepat menukik karena topspin dan melonjak tajam ke sisi berlawanan setelah memantul. Membutuhkan posisi jongkok yang dalam dan timing yang presisi. Paling menipu bila dicampur dengan servis tomahawk biasa.",
      contactPoint: "Sentuh sisi belakang-kiri bola menggunakan karet backhand, dengan permukaan bet hampir tegak. Pada momen terakhir ayunan tomahawk, putar pergelangan tangan ke dalam untuk menggesek ke depan dan ke kanan. Ini membalik arah sidespin dibandingkan tomahawk biasa, sehingga menghasilkan sidespin kiri dengan topspin.",
      returnAdvice: "Tutup bet dan ambil lebih awal dengan blok ringkas atau counter-topspin. Arahkan sedikit ke backhand pelaku servis untuk menetralkan sidespin kiri. Jangan push — topspin akan membuat bola keluar panjang. Jika arah sidespin tidak jelas, arahkan ke tengah untuk mengurangi risiko.",
    },
    "backhand-backspin-short": {
      name: "Backhand Backspin Pendek",
      description: "Servis backhand ringkas dengan backspin murni, ditempatkan pendek. Cepat dilakukan dan memungkinkan kamu langsung siap untuk bola berikutnya. Umum di berbagai level permainan.",
      contactPoint: "Sentuh bagian bawah bola dengan permukaan bet terbuka. Gesek lurus ke bawah dengan jentikan pergelangan yang ringkas, jaga pukulan tetap pendek dan terkontrol. Bet nyaris tidak bergerak ke depan — hampir semua gerakan mengarah ke bawah untuk menghasilkan backspin murni.",
      returnAdvice: "Buka bet dan gesek bagian bawah bola dengan push pendek, sentuh lebih awal. Kembalikan pendek, atau push panjang ke sudut-sudut jika ingin memperpanjang. Fokus menjaga bola tetap rendah alih-alih mengangkatnya.",
    },
    "backhand-no-spin-long": {
      name: "Backhand Cepat Panjang",
      description: "Servis backhand cepat ke sudut-sudut dengan putaran minimal. Kecepatan murninya mengejutkan lawan, terutama bila dicampur dengan servis backspin pendek.",
      contactPoint: "Sentuh bagian belakang-tengah bola dengan permukaan bet hampir datar. Dorong melewati bola dengan gerakan menyodok yang cepat, bukan menggesek. Kontak yang tebal dan datar memaksimalkan kecepatan sekaligus meminimalkan putaran. Lengan memanjang penuh ke arah sasaran.",
      returnAdvice: "Sambut bola sekitar puncak pantulan dengan blok ringkas atau drive terkontrol, tambahkan sedikit topspin untuk kontrol. Jangan sekadar menyodorkan bet; servis tanpa putaran membutuhkan putaran darimu sendiri. Arahkan panjang ke sudut-sudut atau ke siku.",
    },
    "backhand-sidespin": {
      name: "Backhand Sidespin",
      description: "Servis backhand dengan sidespin kanan dan backspin. Gerakan yang ringkas membuat putarannya sulit dibaca, dan pelaku servis sudah dalam posisi untuk serangan backhand lanjutan.",
      contactPoint: "Sentuh bagian bawah-kanan bola dengan sudut bet terbuka. Gesek ke bawah dan ke kiri melintasi bola dengan gerakan pergelangan yang ringkas. Sidespin berasal dari gerakan pergelangan ke samping, sementara permukaan bet yang terbuka menghasilkan backspin.",
      returnAdvice: "Ambil lebih awal dengan bet terbuka dan push pendek yang menggesek untuk menambah backspin. Arahkan sedikit ke forehand pelaku servis untuk menetralkan sidespin. Jika bola naik, flick yang ringkas sangat efektif.",
    },
    "hook-heavy-side-short": {
      name: "Hook Sidespin Berat Pendek",
      description: "Gerakan menyendok di bawah bola yang menghasilkan sidespin ekstrem. Bola meloncat ke samping saat memantul. Sangat sulit dibaca karena sudut bet yang tidak biasa.",
      contactPoint: "Sentuh sisi kiri bola dengan permukaan bet hampir mendatar, menyendok ke bawah dan mengitari bola. Gerakan hook menggesek ke samping melintasi bagian tengah (khatulistiwa) bola. Pergelangan tangan melengkung tajam ke dalam untuk memaksimalkan komponen putaran samping.",
      returnAdvice: "Miringkan bet untuk melawan sidespin berat dan sentuh sisi bola, bukan bagian belakangnya. Sentuhan lembut atau flick ala banana lebih aman daripada pukulan keras. Arahkan sedikit ke backhand pelaku servis dan jaga bola tetap rendah.",
    },
    "hook-backspin-short": {
      name: "Hook Backspin Pendek",
      description: "Servis hook dengan gabungan sidespin berat dan backspin. Dua komponen putaran ini membuat pengembalian yang akurat sangat menantang.",
      contactPoint: "Sentuh bagian bawah-kiri bola dengan permukaan bet terbuka dan miring ke samping. Gesek ke bawah dan ke kanan dalam busur menyendok, mengenai bagian bawah dan sisi bola secara bersamaan. Gesekan dua arah ini menciptakan gabungan backspin dan sidespin.",
      returnAdvice: "Buka bet lebih lebar dan angkat dengan push yang menggesek untuk mengatasi backspin berat. Arahkan sedikit ke backhand pelaku servis untuk menetralkan sidespin dan jaga bola tetap rendah. Hindari pukulan datar.",
    },
    "hook-fast-long-topspin": {
      name: "Hook Cepat Panjang",
      description: "Variasi servis hook agresif yang menggabungkan sidespin kanan dengan topspin, dilakukan cepat dan panjang. Gerakan hook yang menyendok tampak menghasilkan backspin, tetapi bola melonjak ke depan dengan sidespin setelah memantul. Paling efektif bila dicampur dengan servis hook backspin tradisional untuk memaksimalkan tipuan.",
      contactPoint: "Sentuh sisi belakang-kanan bola dengan permukaan bet sedikit tertutup. Gesek ke depan dan ke kiri dalam busur menyendok yang cepat, mengenai bagian samping-atas bola. Gerakan hook menyamarkan kontak ke atas yang menghasilkan topspin, sementara gerak lanjutan ke samping menambahkan sidespin kanan.",
      returnAdvice: "Tutup bet dan gunakan blok ringkas atau counter-topspin, ambil bola sangat awal. Jangan push — topspin akan membuat bola keluar panjang. Miringkan bet sedikit ke kiri untuk melawan sidespin kanan. Loop topspin terkontrol ke tengah adalah pilihan serangan paling aman.",
    },
    "high-toss-backspin": {
      name: "Lemparan Tinggi Backspin Berat",
      description: "Lemparan tinggi bisa memberi tambahan waktu dan energi untuk putaran berat. Bola bisa terlihat berputar mundur setelah memantul. Dipakai banyak pemain papan atas untuk memaksa push yang lemah.",
      contactPoint: "Sentuh bagian paling bawah bola dengan permukaan bet terbuka lebar saat bola jatuh dari lemparan tinggi. Gesek tajam ke bawah, manfaatkan energi gravitasi bola yang jatuh untuk memperkuat backspin. Pergelangan tangan menghentak ke bawah di titik terendah ayunan untuk putaran maksimal.",
      returnAdvice: "Gunakan bet sangat terbuka dan push yang lebih panjang dan menggesek dengan angkatan ekstra. Jika bola panjang, buka dengan loop terkontrol alih-alih pukulan datar. Utamakan backspin berat dan ketinggian rendah pada pengembalian.",
    },
    "high-toss-sidespin": {
      name: "Lemparan Tinggi Sidespin",
      description: "Menggabungkan lemparan tinggi dengan sidespin dan backspin untuk putaran gabungan yang berat. Bola bisa melengkung tajam dan tertahan di meja. Membutuhkan timing yang luar biasa.",
      contactPoint: "Sentuh bagian bawah-kiri bola dengan permukaan bet terbuka saat bola jatuh dari lemparan tinggi. Gesek ke bawah dan ke kanan dalam busur pendulum, mengenai bagian bawah sekaligus sisi kiri bola. Gabungan energi gravitasi dan hentakan pergelangan menghasilkan backspin yang sangat berat dengan sidespin kiri.",
      returnAdvice: "Buka bet dan gesek ke atas sedikit melawan arah sidespin. Arahkan sedikit ke backhand pelaku servis untuk menetralkan lengkungan dan jaga bola tetap rendah. Push lembut yang penuh putaran lebih aman daripada pukulan keras.",
    },
    "ghost-serve": {
      name: "Servis Hantu",
      description: "Servis backspin ultra-pendek yang legendaris, terkenal dipakai oleh Ma Lin. Bola nyaris melewati net, memantul di sisi lawan, lalu berputar kembali ke arah net (kadang bahkan melewatinya). Membutuhkan backspin maksimal yang dihasilkan pergelangan tangan yang rileks dan sentuhan tipis di bagian bawah bola.",
      contactPoint: "Sentuh bagian paling bawah bola dengan permukaan bet terbuka penuh (hampir mendatar). Gesek tajam ke bawah dengan sentuhan yang sangat tipis dan menyerempet — bet nyaris hanya mencium bola. Pergelangan tangan yang longgar dan rileks sangat penting untuk menghasilkan backspin maksimal yang membuat bola berputar balik.",
      returnAdvice: "Melangkah maju dan ambil tepat setelah bola memantul dengan bet sangat terbuka dan sentuhan gesek yang halus. Kembalikan pendek, atau push panjang dengan backspin berat. Jangan menunggu, atau bola akan berputar balik ke net.",
    },
    "fast-long-surprise-fh": {
      name: "Cepat Panjang ke Forehand",
      description: "Servis cepat mendadak ke sudut forehand lawan dengan kontak seperti topspin/drive. Paling efektif bila diselipkan setelah serangkaian servis pendek. Unsur kejutan adalah senjata utamanya.",
      contactPoint: "Sentuh bagian belakang bola dengan permukaan bet sedikit tertutup. Dorong melewati bola dengan pukulan cepat dan datar, menggesek sedikit ke atas untuk menambah topspin. Fokusnya pada kecepatan dan energi ke depan, bukan putaran — kontak tebal dengan ayunan lengan yang cepat.",
      returnAdvice: "Tutup bet dan gunakan blok ringkas atau counter-topspin, ambil bola lebih awal. Jangan push. Arahkan panjang ke backhand atau tengah untuk mengurangi sudut.",
    },
    "fast-long-surprise-bh": {
      name: "Cepat Panjang ke Backhand",
      description: "Servis cepat yang diarahkan ke sudut backhand dengan kontak seperti topspin/drive. Efektif melawan lawan yang berdiri terlalu dekat dengan meja atau sudah bersiap menerima bola pendek.",
      contactPoint: "Sentuh bagian belakang bola dengan permukaan bet sedikit tertutup dari sisi backhand. Dorong melewati bola dengan sodokan cepat dan ringkas, menggesek sedikit ke atas. Pegangan backhand secara alami menutup bet, menambahkan sedikit topspin pada lintasan yang cepat dan datar.",
      returnAdvice: "Gunakan blok/drive backhand yang ringkas dengan bet sedikit tertutup. Ambil lebih awal dan jaga bola tetap rendah. Arahkan panjang ke tengah atau melebar ke forehand untuk menetralkan sudut.",
    },
    "pendulum-corkspin": {
      name: "Pendulum Corkscrew",
      description: "Servis pendulum dengan sumbu putaran giroskopik seperti spiral (corkscrew). Bola bisa bergoyang di udara dan memantul kurang terduga, sehingga pengembalian yang bersih menjadi sulit.",
      contactPoint: "Sentuh sisi belakang-kiri bola dengan sudut bet tertutup. Gesek ke depan dan mengitari bola dengan gerakan mengait, seolah membungkus bola dengan bet. Pergelangan tangan menghentak ke dalam saat kontak untuk menciptakan sumbu giroskopik — putaran masuk ke bola, bukan murni ke samping atau ke bawah.",
      returnAdvice: "Perhatikan pantulannya dan sentuh lebih awal, gunakan sudut bet netral untuk meredam goyangan. Blok terkontrol atau roll ke tengah adalah pilihan paling aman. Sesuaikan setelah lonjakan pertama alih-alih memaksakan sudut yang lebar.",
    },
    "backhand-elbow": {
      name: "Backhand ke Siku",
      description: "Servis backhand berkecepatan sedang yang diarahkan langsung ke siku lawan. Sidespin kanan menambah lengkungan, menimbulkan keraguan apakah harus memakai forehand atau backhand.",
      contactPoint: "Sentuh bagian belakang-kanan bola dengan permukaan bet sedikit terbuka dari posisi backhand. Gesek ke samping ke kiri dan sedikit ke bawah. Sidespin berasal dari gerakan pergelangan ke samping, sementara sudut yang sedikit ke bawah menambah cukup backspin untuk menjaga bola tetap rendah.",
      returnAdvice: "Gerakkan kaki dan putuskan lebih awal; jangan menjangkau. Jika bola panjang, gunakan topspin/drive terkontrol dengan angkatan ekstra untuk melawan backspin. Arahkan panjang ke siku atau sedikit ke forehand pelaku servis untuk menetralkan sidespin.",
    },
    "high-toss-no-spin": {
      name: "Lemparan Tinggi Tanpa Putaran",
      description: "Sangat mirip servis lemparan tinggi backspin berat, tetapi tanpa putaran. Lawan yang mengira backspin ekstrem bisa melakukan push terlalu panjang atau terlalu tinggi. Membutuhkan sentuhan yang sangat halus.",
      contactPoint: "Sentuh bagian belakang-tengah bola dengan permukaan bet hampir datar meskipun tampak terbuka. Bet bergerak ke bawah seolah menghasilkan backspin berat, tetapi mengenai bola dengan bagian tengah karet yang datar alih-alih menggesek. Kontak yang tebal dan singkat mematikan putaran, sementara lengan melanjutkan gerakan dengan menipu.",
      returnAdvice: "Tambahkan putaran sendiri agar terkontrol: gunakan flick atau push yang ringkas dengan bet sedikit tertutup. Biarkan bola naik sedikit dan jaga kontak tetap bersih. Hindari sentuhan mati yang membuat bola melambung.",
    },
    "chop-backspin-short": {
      name: "Chop Forehand Backspin Pendek",
      description: "Servis paling dasar dalam tenis meja. Backspin murni tanpa sidespin, ditempatkan pendek. Servis paling aman untuk dijaga rendah dan pendek, sehingga sangat sulit diserang lawan. Pilihan ideal melawan pemain loop yang agresif.",
      contactPoint: "Sentuh bagian bawah bola dengan permukaan bet terbuka lebar. Potong lurus ke bawah dengan pukulan yang sederhana dan bersih. Bet menggesek bagian bawah bola tanpa gerakan ke samping, menghasilkan backspin murni. Jaga kontak tetap tipis untuk putaran maksimal, atau sedikit lebih tebal untuk mengontrol penempatan.",
      returnAdvice: "Buka bet dan gesek bagian bawah bola dengan push pendek, sentuh lebih awal. Kembalikan pendek, atau push panjang dengan backspin yang baik. Jaga bola tetap rendah alih-alih mengangkatnya.",
    },
    "chop-no-spin": {
      name: "Chop Forehand Tanpa Putaran",
      description: "Menggunakan gerakan memotong yang sama seperti versi backspin, tetapi mengenai bola dengan putaran minimal. Lawan yang mengira backspin berat sering melakukan push terlalu panjang atau membuat bola melambung, sehingga memberi bola ketiga yang mudah.",
      contactPoint: "Sentuh bagian belakang-tengah bola dengan permukaan bet yang tampak terbuka tetapi sebenarnya lebih tegak daripada versi backspin. Gerakan memotong tetap berlanjut, tetapi bet meluncur di belakang bola, bukan di bawahnya, sehingga putarannya minimal. Gerak lanjutan meniru versi backspin untuk menipu lawan.",
      returnAdvice: "Tambahkan putaran sendiri dengan push yang ringkas atau flick/drive terkontrol. Jaga bet sedikit tertutup dan lintasan tetap rendah. Hindari sentuhan mati.",
    },
    "windshield-wiper-sidespin-short": {
      name: "Windshield Wiper Sidespin Pendek",
      description: "Bet menyapu mendatar melintasi bola, menghasilkan sidespin kiri dengan backspin. Gerakan yang sama bisa menghasilkan jenis putaran apa pun tergantung titik kontak pada busurnya, sehingga sangat sulit dibaca. Paling efektif bila dijaga rendah di atas net.",
      contactPoint: "Sentuh bagian bawah-kiri bola saat bet menyapu dari kanan ke kiri dalam busur mendatar. Gesek ke bawah dan ke kanan melewati bola, mengenai bagian bawahnya di tengah busur wiper. Permukaan bet yang terbuka dan titik kontak yang rendah menggabungkan backspin dengan sidespin kiri.",
      returnAdvice: "Baca kontaknya dan gunakan bet terbuka dengan push pendek yang menggesek. Arahkan sedikit ke backhand pelaku servis untuk menetralkan sidespin. Jaga bola tetap rendah dan pendek kecuali kamu bisa push panjang dengan putaran berat.",
    },
    "windshield-wiper-topspin": {
      name: "Windshield Wiper Topspin",
      description: "Gerakan windshield wiper yang sama, tetapi kontak dilakukan di titik lain pada busurnya untuk menghasilkan topspin, bukan backspin. Lawan yang membacanya sebagai backspin dan melakukan push akan membuat bola keluar panjang atau melambung.",
      contactPoint: "Sentuh bagian belakang-atas bola di ujung busur wiper, bukan di tengahnya. Bet mengenai bola lebih lambat dalam sapuannya, saat gerakan mengarah ke atas dan ke depan. Permukaan bet yang sedikit tertutup menggesek ke atas dan melewati bagian atas bola, menghasilkan topspin, sementara gerakan ke samping menambahkan sidespin.",
      returnAdvice: "Jangan push. Tutup bet lalu blok atau counter-topspin lebih awal. Arahkan sedikit ke backhand pelaku servis untuk menetralkan sidespin dan jaga bola tetap rendah.",
    },
    "hidden-serve": {
      name: "Servis Tersembunyi (Ilegal)",
      description: "Servis dengan titik kontak yang sengaja disembunyikan di balik badan atau tangan bebas. Servis ini legal sebelum perubahan aturan servis pada 1 September 2002 dan masih kadang terlihat di permainan amatir.",
      legalityNotes: "Ilegal menurut aturan ITTF sejak 1 September 2002. Sejak awal servis hingga bola dipukul, bola tidak boleh disembunyikan dari penerima, dan tangan bebas harus disingkirkan dari ruang antara bola dan net. Servis yang tidak jelas bisa mendapat peringatan pada kejadian pertama; servis tidak jelas berikutnya bisa berujung kehilangan poin.",
      contactPoint: "Kontaknya bervariasi — pelaku servis bisa menghasilkan jenis putaran apa pun karena kontaknya tersembunyi. Biasanya bagian bawah-kiri bola dipukul dengan permukaan bet terbuka untuk sidespin-backspin berat, tetapi penyembunyian membuat penerima tidak bisa melihat sudut kontak atau arah gesekan yang sebenarnya.",
      returnAdvice: "Utamakan kontrol: anggap bola membawa sidespin-backspin dan gunakan bet terbuka dengan push rendah yang penuh putaran. Arahkan sedikit melawan putaran dan jaga bola tetap rendah ke sudut-sudut. Jika kontaknya disembunyikan, mintalah peringatan.",
    },
    "finger-spin-serve": {
      name: "Servis Putaran Jari (Ilegal)",
      description: "Pelaku servis memakai jari untuk memutar bola saat melempar, alih-alih menghasilkan putaran dengan bet. Menghasilkan putaran yang menipu dari gerakan yang tampak sederhana.",
      legalityNotes: "Ilegal. Servis harus dimulai dengan bola diam bebas di atas telapak tangan yang terbuka, dan lemparan harus hampir vertikal tanpa memberi putaran. Memutar bola dengan jari saat melempar melanggar ketentuan ini.",
      contactPoint: "Putaran dihasilkan oleh jari saat melempar, bukan saat kontak dengan bet. Jari menggulirkan bola ketika melepaskannya, memberi backspin atau sidespin bahkan sebelum bet menyentuh bola. Kontak bet sendiri bisa hampir datar, sehingga putarannya seolah muncul entah dari mana.",
      returnAdvice: "Perhatikan rotasi bola saat dilempar dan sesuaikan sudut bet dengan putaran tersebut. Gunakan bet terbuka dan push lembut yang penuh putaran, atau loop terkontrol jika bola panjang. Jaga pengembalian tetap rendah.",
    },
  },
  motions: {
    pendulum: {
      name: "Pendulum",
      description: "Servis paling umum dalam tenis meja. Bet berayun seperti bandul dari kanan ke kiri (untuk pemain tangan kanan), menghasilkan sidespin yang dikombinasikan dengan backspin atau topspin. Sangat serbaguna, dengan banyak variasi putaran yang bisa dihasilkan dari gerakan yang sama.",
    },
    "reverse-pendulum": {
      name: "Pendulum Terbalik",
      description: "Bet berayun dari kiri ke kanan (untuk pemain tangan kanan), menghasilkan sidespin ke arah yang berlawanan dengan pendulum standar. Lebih jarang dipakai, sehingga lebih sulit dibaca lawan.",
    },
    tomahawk: {
      name: "Tomahawk",
      description: "Servis dengan bet berayun ke luar dalam gerakan seperti melempar kapak tomahawk. Menghasilkan sidespin yang kuat dan bisa dikombinasikan dengan topspin untuk efek melonjak. Populer dalam gaya bermain Asia. Catatan: klasifikasi tangan berbeda-beda — pelatih Tiongkok umumnya menganggapnya servis forehand (kontak dengan karet forehand), sedangkan sebagian pelatih Barat menggolongkannya sebagai backhand berdasarkan posisi berdiri.",
    },
    "reverse-tomahawk": {
      name: "Tomahawk Terbalik",
      description: "Dimulai dengan gerakan melempar ke luar yang sama seperti tomahawk biasa, tetapi pada detik terakhir beralih mengenai bola dengan sisi backhand bet, sehingga menghasilkan sidespin kiri, bukan kanan. Gerakan awal yang identik membuatnya sangat menipu. Dipopulerkan oleh Ding Ning dan juga dipakai oleh Kenta Matsudaira.",
    },
    backhand: {
      name: "Servis Backhand",
      description: "Servis ringkas yang dilakukan dari sisi backhand. Memungkinkan transisi cepat ke bola berikutnya dan secara alami menipu karena posisi pergelangan tangan. Dipakai secara efektif oleh banyak pemain Eropa.",
    },
    "hook-shovel": {
      name: "Hook / Shovel",
      description: "Servis tidak konvensional dengan bet menyendok di bawah bola dalam gerakan mengait. Menghasilkan sidespin berat dengan backspin. Titik kontak yang tidak biasa membuatnya sangat sulit dibaca.",
    },
    chop: {
      name: "Chop Forehand",
      description: "Gerakan memotong ke bawah yang sederhana dengan permukaan bet terbuka, menghasilkan backspin murni tanpa sidespin. Servis paling dasar dalam tenis meja — mudah dipelajari, mudah dijaga pendek, dan efektif mencegah pengembalian agresif. Sering menjadi servis pertama yang diajarkan kepada pemula.",
    },
    "windshield-wiper": {
      name: "Windshield Wiper",
      description: "Bet menyapu mendatar dalam busur seperti wiper kaca mobil, menggesek melintasi bagian belakang bola. Tergantung di titik mana pada busur bola disentuh, gerakan yang sama bisa menghasilkan sidespin, topspin, atau backspin. Tampilannya yang identik apa pun putarannya membuatnya sangat menipu. Membutuhkan kuda-kuda rendah dan lebar untuk eksekusi yang benar.",
    },
    "high-toss": {
      name: "Pendulum Lemparan Tinggi",
      description: "Servis pendulum dengan lemparan bola tinggi (biasanya 2-5 meter). Tambahan ketinggian jatuh memberi energi gravitasi ekstra sehingga potensi putaran meningkat. Membutuhkan timing yang sangat baik, tetapi menghasilkan putaran yang luar biasa berat.",
    },
  },
  spins: {
    "pure-backspin": {
      name: "Backspin Murni",
      description: "Putaran bawah yang bersih sehingga bola meluncur rendah dan tertahan di sisi lawan. Pengembalian cenderung masuk ke net jika di-push tanpa kompensasi.",
    },
    "heavy-backspin": {
      name: "Backspin Berat",
      description: "Putaran bawah maksimal. Bola mencengkeram permukaan meja dan bahkan bisa memantul balik ke arah net. Sangat sulit di-flick atau di-loop secara agresif.",
    },
    "pure-topspin": {
      name: "Topspin Murni",
      description: "Rotasi ke depan yang membuat bola melonjak ke depan setelah memantul. Sering dipakai pada servis panjang yang cepat untuk membuat lawan terburu-buru.",
    },
    "left-side-backspin": {
      name: "Sidespin Kiri + Backspin",
      description: "Kombinasi pendulum klasik. Bola melengkung ke kanan dari sudut pandang pelaku servis dan memantul dengan putaran bawah. Sangat umum dalam pertandingan kompetitif.",
    },
    "right-side-backspin": {
      name: "Sidespin Kanan + Backspin",
      description: "Kombinasi pendulum terbalik atau tomahawk. Bola melengkung ke kiri dari sudut pandang pelaku servis. Lebih jarang, sehingga lebih sulit dibaca lawan.",
    },
    "left-side-topspin": {
      name: "Sidespin Kiri + Topspin",
      description: "Kombinasi menipu: bola tampak membawa backspin tetapi melonjak ke depan. Dipakai untuk mengecoh lawan yang mengira putaran bawah.",
    },
    "right-side-topspin": {
      name: "Sidespin Kanan + Topspin",
      description: "Kombinasi ala tomahawk yang menghasilkan pantulan melonjak kuat ke samping. Efektif untuk menyiapkan serangan forehand.",
    },
    "no-spin": {
      name: "Tanpa Putaran (Float)",
      description: "Bola mati dengan rotasi minimal. Meniru gerakan servis berputaran tetapi menghasilkan efek melayang. Lawan yang mengira ada putaran akan sepenuhnya salah membaca bola.",
    },
    "pure-left-sidespin": {
      name: "Sidespin Kiri Murni",
      description: "Rotasi samping yang kuat tanpa putaran atas/bawah yang berarti. Bola melengkung tajam di udara dan melonjak ke samping saat memantul.",
    },
    "pure-right-sidespin": {
      name: "Sidespin Kanan Murni",
      description: "Rotasi samping yang kuat ke arah sebaliknya. Efektif dengan gerakan pendulum terbalik dan tomahawk.",
    },
    "light-backspin": {
      name: "Backspin Ringan",
      description: "Putaran bawah tipis yang sulit dibedakan dari bola tanpa putaran. Bola melayang sedikit lebih jauh daripada bola mati, membuat lawan bimbang antara push dan flick.",
    },
    "heavy-left-side-backspin": {
      name: "Sidespin Kiri + Backspin Berat",
      description: "Putaran gabungan maksimal dari gerakan pendulum. Bola melengkung, menukik, dan tertahan secara agresif. Servis khas banyak pemain elite.",
    },
    corkspin: {
      name: "Putaran Spiral (Corkscrew)",
      description: "Sumbu putaran giroskopik yang menghasilkan pantulan tak terduga. Bola seolah bergoyang dan berubah arah di tengah lintasan.",
    },
  },
  bounces: {
    "short-low": {
      label: "Pendek (pantulan ke-2 di meja)",
      secondBouncePosition: "Di meja, dekat net",
    },
    "short-medium": {
      label: "Pendek (pantulan ke-2 dekat garis belakang)",
      secondBouncePosition: "Dekat garis belakang meja",
    },
    "half-long": {
      label: "Setengah Panjang",
      secondBouncePosition: "Tepat di garis belakang — panjangnya ambigu",
    },
    "long-medium": {
      label: "Panjang (dalam)",
      secondBouncePosition: "Akan jatuh jauh di luar meja",
    },
    "long-high": {
      label: "Panjang (cepat & dalam)",
      secondBouncePosition: "Jauh di luar meja",
    },
    "deep-long": {
      label: "Panjang Dalam (garis belakang)",
      secondBouncePosition: "Tepat di garis belakang lawan. Meski panjang, servis dalam yang ditempatkan dengan baik membuat lawan terjepit, sehingga serangan berkualitas sulit dilakukan.",
    },
  },
  speeds: {
    slow: {
      tacticalNote: "Memaksimalkan potensi putaran. Memberi pelaku servis lebih banyak waktu untuk bersiap menghadapi bola berikutnya.",
    },
    medium: {
      tacticalNote: "Menyeimbangkan putaran dan kecepatan. Mengurangi waktu reaksi lawan sambil tetap menjaga kontrol.",
    },
    fast: {
      tacticalNote: "Membuat lawan terburu-buru. Mengorbankan putaran demi kecepatan murni untuk memaksa pengembalian lemah atau ace langsung.",
    },
  },
  trajectories: {
    flat: {
      netClearance: "Tipis di atas net (1-3 cm)",
    },
    "low-arc": {
      netClearance: "Lengkungan rendah di atas net (5-15 cm)",
    },
    "high-arc": {
      netClearance: "Lengkungan tinggi di atas net (20+ cm)",
    },
  },
  tosses: {
    "low-legal": {
      position: "Telapak tangan terbuka, bola terlihat, dilempar ~16 cm ke atas",
    },
    "medium-legal": {
      position: "Telapak tangan terbuka, bola terlihat, dilempar ~30-50 cm ke atas",
    },
    "high-legal": {
      position: "Telapak tangan terbuka, bola terlihat, dilempar 2-5 meter ke atas",
    },
    "hidden-illegal": {
      position: "Bola disembunyikan di balik badan atau lengan saat dilempar — ilegal menurut aturan ITTF",
    },
  },
  deceptions: {
    "fake-backspin": {
      name: "Backspin Palsu",
      description: "Pelaku servis meniru gerakan backspin berat, tetapi mengenai bola dengan putaran minimal atau topspin. Lawan mengira putaran bawah lalu melakukan push yang terlalu panjang atau masuk ke net.",
      counterplay: "Perhatikan titik kontak dengan saksama. Jika bet meluncur di bawah bola, itu backspin. Jika bet menggesek bagian belakang, kemungkinan besar tanpa putaran atau topspin.",
    },
    "same-motion": {
      name: "Variasi Gerakan Sama",
      description: "Beberapa jenis putaran dihasilkan dari gerakan servis yang identik. Lawan tidak bisa membedakan variasi backspin, tanpa putaran, dan sidespin.",
      counterplay: "Fokus pada suara kontak dan lintasan bola, bukan gerakan lengan. Latih kemampuan membaca jalur terbang bola.",
    },
    "contact-hiding": {
      name: "Menyembunyikan Titik Kontak",
      description: "Pelaku servis memakai posisi badan atau sudut lengan untuk mengaburkan momen dan sudut kontak bet dengan bola yang sebenarnya.",
      counterplay: "Atur posisimu agar bisa melihat melewati sudut badan pelaku servis. Minta wasit menegakkan aturan visibilitas jika kontak tersembunyi sepenuhnya.",
    },
    "wrist-snap": {
      name: "Tipuan Hentakan Pergelangan",
      description: "Hentakan pergelangan yang cepat memberi kesan putaran berat, tetapi sudut permukaan bet saat kontak menghasilkan putaran jauh lebih sedikit dari yang diperkirakan.",
      counterplay: "Jangan bereaksi hanya berdasarkan kecepatan pergelangan. Fokus pada perilaku bola tepat setelah memantul.",
    },
    "speed-variation": {
      name: "Variasi Kecepatan",
      description: "Berganti-ganti antara servis cepat dan lambat dengan gerakan yang sama untuk mengacaukan timing dan langkah kaki lawan.",
      counterplay: "Tetap bertumpu pada ujung kaki dengan posisi siap yang netral. Baca kecepatan bola lebih awal dan sesuaikan ayunan ke belakangmu.",
    },
    "body-feint": {
      name: "Tipuan Badan",
      description: "Pelaku servis memakai gerakan bahu, pinggul, atau kepala untuk mengisyaratkan penempatan atau arah putaran yang berbeda dari yang sebenarnya diberikan.",
      counterplay: "Abaikan bahasa tubuh dan fokus pada bet dan bola. Latih diri membaca putaran dari rotasi bola, bukan dari gerakan badan pelaku servis.",
    },
  },
  tacticalPurposes: {
    "force-weak-return": {
      name: "Paksa Pengembalian Lemah",
      goal: "Membuat lawan menghasilkan pengembalian yang tinggi atau panjang sehingga bisa diserang pada bola ketiga.",
    },
    "set-up-fh-attack": {
      name: "Siapkan Serangan Forehand",
      goal: "Menempatkan servis sehingga pengembalian datang ke sisi forehand untuk loop atau smash yang agresif.",
    },
    "prevent-flip": {
      name: "Cegah Flick",
      goal: "Menjaga servis cukup pendek dan rendah sehingga lawan tidak bisa melakukan flick atau menyerangnya secara agresif.",
    },
    "force-push": {
      name: "Paksa Push",
      goal: "Backspin berat yang memaksa lawan melakukan push, memberi pelaku servis inisiatif pada bola ketiga.",
    },
    "target-elbow": {
      name: "Incar Siku",
      goal: "Mengarah ke siku lawan (titik peralihan) untuk menimbulkan keraguan antara forehand dan backhand.",
    },
    "go-for-ace": {
      name: "Kejar Ace",
      goal: "Servis berisiko tinggi yang dirancang untuk langsung memenangkan poin lewat kecepatan, penempatan, atau tipuan.",
    },
    "serve-plus-one-fh": {
      name: "Servis+1 ke Forehand",
      goal: "Pola servis yang dirancang agar pengembalian yang diperkirakan bisa diserang dengan forehand dari posisi yang sudah siap.",
    },
    "serve-plus-one-bh": {
      name: "Servis+1 ke Backhand",
      goal: "Pola servis yang dirancang agar pengembalian yang diperkirakan bisa diserang dengan punch atau loop backhand.",
    },
  },
  placements: {
    "fh-short": {
      label: "Forehand Pendek",
    },
    "bh-short": {
      label: "Backhand Pendek",
    },
    "fh-long": {
      label: "Forehand Panjang",
    },
    "bh-long": {
      label: "Backhand Panjang",
    },
    "middle-short": {
      label: "Tengah Pendek (Siku)",
    },
    "middle-long": {
      label: "Tengah Panjang (Siku)",
    },
  },
};
