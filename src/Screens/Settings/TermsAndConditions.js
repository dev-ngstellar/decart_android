import {
  Image,
  ImageBackground,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../../component/Header';
import pernama from '../../Assets/pernama.png';
import backdrop from '../../Assets/LOGO/backdrop.jpg';

const TermsAndConditions = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header Screen="Terma & Syarat" />
      <ImageBackground source={backdrop} style={{height: '100%'}}>
        <View
          style={{
            height: '20%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Image source={pernama} style={{height: 250, width: 150}} />
        </View>

        <ScrollView>
          <View style={{height: 'auto', width: '90%', marginHorizontal: '5%'}}>
            <View style={styles.section}>
              <Text style={styles.header}>A. PENGENALAN</Text>
              <Text style={styles.paragraph}>
                1. Selamat Datang ke De Cart! De Cart dimiliki eksklusif dan
                diurus oleh Perwira Niaga Malaysia (PERNAMA) (secara individu
                atau kolektif, “PERNAMA”, “De Cart” atau “Kami”). De Cart boleh
                dimuat turun melalui aplikasi Apple Play Store bagi pengguna IOS
                atau Google Play Store bagi pengguna Android dan Huawei App
                Store bagi pengguna HarmonyOS. De Cart merupakan satu aplikasi
                mengumpul dan menebus mata ganjaran, diskaun, baucar dan kupon
                yang ditawarkan PERNAMA kepada pelanggan, dan lain-lain
                perkhidmatan yang boleh ditawarkan kepada pelanggan dari semasa
                ke semasa.
              </Text>
              <Text style={styles.paragraph}>
                2. Bagi melayakkan anda menikmati ganjaran yang ditawarkan, anda perlu bersetuju dengan Terma dan Syarat seperti yang dinyatakan selepas ini sekiranya anda ingin atau apabila anda menggunakan De Cart. Ambil perhatian bahawa sebarang promosi, diskaun, baucar dan kupon tidak boleh ditukarkan kepada wang ringgit dan hanya boleh digunakan melalui De Cart. 
              </Text>
              <Text style={styles.paragraph}>
                3. Penting – Sila baca dengan teliti Terma dan Syarat ini. Dengan melayari, mendaftar dan/atau menggunakan Perkhidmatan (seperti ditafsirkan selepas ini), anda menyatakan bahawa anda telah membaca, memahami, menerima dan bersetuju dengan Terma dan Syarat ini. Anda juga bersetuju dengan pernyataan yang dibuat di bawah ini. Sekiranya anda tidak bersetuju dengan Terma dan Syarat ini dan ingin menamatkan penggunaan Perkhidmatan, sila hentikan penggunaan Perkhidmatan atau berhenti melayari De Cart.
              </Text>
              <Text style={styles.paragraph}>
                {' '}
                Terma dan Syarat yang dinyatakan di sini (secara kolektif, “Terma dan Syarat” atau “Perjanjian”) membentuk suatu perjanjian yang mengikat secara sah di sisi undang-undang di antara anda dan PERNAMA.
              </Text>
              <Text style={styles.paragraph}>
                {' '}
                Dengan menggunakan De Cart (“Aplikasi”) dan memuat turun, memasang, mengaktifkan atau menggunakan apa-apa perisian yang dibekalkan oleh PERNAMA (“Perisian”) untuk anda melayari dan menggunakan De Cart (“Perkhidmatan”), anda secara nyata memperakui dan bersetuju untuk terikat dengan Terma dan Syarat. 
              </Text>
              <Text style={styles.paragraph}>
                4.PERNAMA berhak membuat sebarang pindaan atau penambahan pada Terma dan Syarat pada bila-bila masa. Sekiranya anda terus menggunakan atau melayari De Cart, anda dianggap memperakui dan bersetuju untuk terikat dengan Terma dan Syarat seperti pindaan atau penambahan tersebut yang berkuatkuasa pada masa penggunaan De Cart oleh anda. PERNAMA juga berhak meminda, mengubah, menggantung, menghentikan atau menggantikan semua atau mana-mana bahagian Perisian atau Perkhidmatan pada bila-bila masa. Walau apa jua keadaan, Terma dan Syarat, termasuk pindaan atau penambahan akan terus terpakai dan berkuatkuasa.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.header}>B. REPRESENTASI DAN WARANTI</Text>
              <Text style={styles.paragraph}>
              Dengan menggunakan Perkhidmatan, anda menyatakan dan memberi jaminan bahawa anda memiliki hak, kuasa dan kapasiti untuk menggunakan Perkhidmatan dan mematuhi Terma dan Syarat.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.header}>C. AKAUN</Text>
              <Text style={styles.subHeader}>1. KATEGORI AKAUN.</Text>
              <Text style={styles.paragraph}>
                1.1 De Cart komited dalam memastikan pendaftar menikmati perkhidmatan serta tawaran promosi yang sebaik mungkin dan bersesuaian. Untuk itu, akaun pendaftar akan terbahagi kepada beberapa kategori seperti berikut:
              </Text>
              <Text style={styles.paragraph}>
                i “ATM” - Terdiri daripada Anggota Angkatan Tentera Malaysia (ATM) Aktif atau ATM Aktif (seperti ditafsirkan selepas ini) dan veteran ATM. Untuk tujuan Terma dan Syarat ini, “ATM Aktif” merujuk kepada Anggota Angkatan Tentera Malaysia (ATM) yang masih berkhidmat.
              </Text>
              <Text style={styles.paragraph}>
                ii “Awam Khas” - Terdiri daripada pendaftar terpilih seperti kakitangan awam yang masih berkhidmat di PERNAMA, Kementerian Pertahanan Malaysia (Mindef), dan Lembaga Tabung Angkatan Tentera (LTAT).
              </Text>
              <Text style={styles.paragraph}>
                iii “Awam Am” - Lain-lain pendaftar yang tidak termasuk dalam kategori ATM Aktif atau Awam Khas.
              </Text>
              <Text style={styles.subHeader}>2. PENDAFTARAN.</Text>
              <Text style={styles.paragraph}>
                2.1 Untuk mendaftar, anda perlu memuat turun De Cart melalui Apple Play Store bagi pengguna IOS atau Google Play Store bagi pengguna Android dan Huawei App Store bagi pengguna HarmonyOS.
              </Text>
              <Text style={styles.paragraph}>
                2.2 Anda perlu mengisi dan melengkapkan maklumat wajib seperti nama penuh, nombor tentera (anggota dan veteran) dan nombor kad pengenalan bagi orang awam, nombor telefon serta lain-lain maklumat pada ruang yang disediakan.
              </Text>
              <Text style={styles.paragraph}>
                2.3 Anda mengesahkan bahawa semua maklumat yang diberikan adalah benar dan tepat. Anda bersetuju membekalkan PERNAMA dengan pengesahan identiti apabila diminta, maklumat tepat, semasa dan lengkap mengikut keperluan Perkhidmatan dan anda bertanggungjawab untuk mengemaskini maklumat dari semasa ke semasa. Anda juga bersetuju bahawa PERNAMA boleh menganggap maklumat yang anda berikan dan simpan di De Cart adalah tepat, terkini dan lengkap. Sekiranya maklumat anda tidak benar, tidak tepat, tidak terkini atau tidak lengkap dalam apa jua bentuk, PERNAMA berhak untuk menamatkan Perjanjian ini dan penggunaan Perkhidmatan oleh anda pada bila-bila masa dengan atau tanpa notis. PERNAMA juga tidak bertanggungjawab sekiranya anda mengalami gangguan Perkhidmatan disebabkan oleh maklumat tidak benar, tidak tepat, tidak terkini atau tidak lengkap.
              </Text>
              <Text style={styles.subHeader}>3. PENGESAHAN.</Text>

              <Text style={styles.paragraph}>
                3.1 Bagi pendaftar kategori ATM, pendaftar perlu membuat pengesahan melalui cap jari biometrik di mana-mana kedai PERNAMA berdekatan untuk mengesahkan akaun De Cart bagi membolehkan anda menikmati segala faedah yang terdapat di De Cart.
              </Text>
              <Text style={styles.paragraph}>
                3.2 Bagi pendaftar kategori Awam Khas dan Awam Am, pengesahan akaun De Cart bagi membolehkan anda menikmati segala faedah yang terdapat di De Cart adalah mengikut ketetapan PERNAMA dari semasa ke semasa.
              </Text>
              <Text style={styles.paragraph}>
                3.3 Setelah pengesahan akaun dibuat, anda boleh menggunakan De Cart di mana-mana kedai PERNAMA untuk menikmati pelbagai ganjaran dan promosi dari semasa ke semasa.
              </Text>
              <Text style={styles.subHeader}>4. KERAHSIAAN MAKLUMAT.</Text>
              <Text style={styles.paragraph}>
                4.1 Anda bersetuju untuk merahsiakan kata laluan anda dan hanya menggunakan ID dan kata laluan anda semasa log masuk. Anda bertanggungjawab sepenuhnya untuk semua aktiviti yang berlaku di bawah ID dan akaun anda walaupun aktiviti atau penggunaan tersebut tidak dilakukan, tidak disengajakan atau tidak diketahui oleh anda. Kami tidak akan bertanggungjawab ke atas sebarang kehilangan, kerugian atau kerosakan yang timbul akibat penggunaan kata laluan anda yang tidak dibenarkan atau kegagalan anda untuk mematuhi Terma dan Syarat ini.
              </Text>
              <Text style={styles.paragraph}>
                4.2 Penggunaan Perkhidmatan oleh anda adalah untuk kegunaan sendiri dan peribadi anda. Anda mengakujanji untuk tidak membenarkan atau membiarkan orang lain menggunakan identiti anda untuk menggunakan Perkhidmatan dan anda bertanggungjawab memastikan keselamatan dan kerahsiaan maklumat akaun anda termasuk dan tidak terhad kepada ID dan kata laluan.
              </Text>
              <Text style={styles.subHeader}>5. SUB-AKAUN.</Text>

              <Text style={styles.paragraph}>
                5.1 Pendaftar kategori ATM yang telah mengesahkan akaun (“Akaun Prinsipal”) boleh mendaftar 2 sub-akaun sebagai tambahan (“Sub-Akaun”). Setiap Sub-Akaun layak menikmati faedah sepertimana Akaun Prinsipal.
              </Text>
              <Text style={styles.paragraph}>
                5.2 Sub-Akaun hanya boleh didaftarkan atas nama ahli keluarga terdekat pendaftar Akaun Prinsipal iaitu suami, isteri dan/atau anak sahaja.
              </Text>
              <Text style={styles.paragraph}>
                5.3  Sub-Akaun boleh membeli pada harga diskaun atau promosi dan harga subsidi mengikut kuota yang telah ditetapkan untuk Akaun Prinsipal, atau menebus mata ganjaran, baucar atau kupon yang diperoleh melalui Akaun Prinsipal, dengan syarat pembelian atau penebusan tersebut belum dibuat di Akaun Prinsipal.
              </Text>
              <Text style={styles.paragraph}>
                5.4 Dengan setiap pendaftaran dan penggunaan Sub-Akaun, pendaftar/pengguna Sub-Akaun memperakui dan bersetuju untuk terikat dengan Terma dan Syarat.
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>D. PENGGUNAAN</Text>
              <Text style={styles.paragraph}>
                1. Anda hendaklah menggunakan Perkhidmatan untuk tujuan yang sah dan anda tidak dibenarkan untuk menggunakan Perkhidmatan dan/atau De Cart untuk sebarang kegiatan atau tujuan, atau mempromosi, membenarkan atau membiarkan penggunaan, yang menyalahi undang-undang, untuk tujuan penipuan atau memperdaya.
              </Text>
              <Text style={styles.paragraph}>
                2. Anda hendaklah memaklumkan kepada PERNAMA sekiranya anda mengesyaki sebarang penggunaan Perkhidmatan secara tidak sah, penyalahgunaan atau kebocoran maklumat anda. 
              </Text>
              <Text style={styles.paragraph}>
                3. Anda bertanggungjawab ke atas segala kerugian, kehilangan, caj, tuntutan atau penggantungan atau pembatalan faedah-faedah De Cart yang ditanggung oleh anda atau PERNAMA, lain-lain pengguna, atau pihak ketiga akibat atau disebabkan oleh perlanggaran Perjanjian ini oleh anda, kerosakan atau kehilangan peranti anda, kebenaran penggunaan Perkhidmatan kepada mana-mana pihak ketiga oleh anda dan anda bersetuju untuk membayar balik kepada PERNAMA, pengguna atau pihak ketiga tersebut.
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>E. FAEDAH</Text>
              <Text style={styles.subHeader}>1. MATA GANJARAN, BAUCAR DLL</Text>
              <Text style={styles.paragraph}>
                1.1 Setiap pembelian melalui De Cart akan melayakkan anda mendapat mata ganjaran mengikut jumlah pembelian yang tertera di resit (contohnya RM1.00 = 1 mata ganjaran).
              </Text>
              <Text style={styles.paragraph}>
                1.2 Mata ganjaran, diskaun, baucar, atau kupon perlu ditebus mengikut syarat dan tempoh sah yang ditetapkan bagi mengelakkan faedah-faedah tersebut dimansuhkan secara automatik dari akaun De Cart.
              </Text>
              <Text style={styles.paragraph}>
              <Text style={styles.paragraph}>
              1.3 Anda bersetuju membenarkan PERNAMA untuk membuat semakan, pindaan atau pembetulan pada mata ganjaran anda, sekiranya PERNAMA semunasabahnya mendapati kesilapan pada mata ganjaran, atau mata ganjaran yang dipaparkan adalah terlebih nyata berbanding kelayakan anda, yang disebabkan oleh hal-hal tertentu termasuk dan tidak terhad kepada masalah teknikal yang di luar kawalan munasabah PERNAMA, atau PERNAMA semunasabahnya mengesyaki unsur-unsur manipulasi atau penyalahgunaan De Cart.              </Text>
              </Text>
              <Text style={styles.subHeader}>2. PROMOSI</Text>

              <Text style={styles.paragraph}>
                2.1 Semua promosi adalah seperti tertera dalam De Cart. PERNAMA berhak menawarkan atau menetapkan promosi mengikut hak mutlak PERNAMA di mana-mana bahagian atau seluruh Malaysia termasuk Sabah dan Sarawak, atau mengikut kategori akaun serta profil pendaftar.
              </Text>
              <Text style={styles.paragraph}>
                2.2 PERNAMA boleh memberi tawaran eksklusif dari semasa ke semasa di kedai-kedai PERNAMA yang terpilih. Sebagai contoh, anda mungkin akan menerima tawaran promosi apabila anda menggunakan De Cart untuk kali pertama.
              </Text>
              <Text style={styles.paragraph}>
                2.3 Tawaran promosi boleh termasuk barang percuma, diskaun pada barang tertentu, penebusan mata ganjaran atau penggunaan baucar dan/atau kupon.
              </Text>
              <Text style={styles.paragraph}>
                2.4 Tawaran tertentu boleh tertakluk kepada lokasi anda dan anda mungkin tidak menerima tawaran tersebut jika anda tidak membenarkan perkhidmatan lokasi pada peranti anda dan memberikan kebenaran yang diminta De Cart, atau jika anda tidak berada di lokasi di mana tawaran tersebut diberikan.
              </Text>
              <Text style={styles.paragraph}>
                3. De Cart tidak bertanggungjawab dan tidak perlu menawarkan penggantian baucar, diskaun, kupon atau memberi ganti rugi kepada pembeli sekiranya: 
              </Text>
              <Text style={styles.paragraph}>
                i) Baucar telah dihentikan atau belian yang telah dibatalkan.
              </Text>
              <Text style={styles.paragraph}>
                ii) Terdapat salah guna atau ketidakupayaan untuk menebus baucar dan kupon.
              </Text>
              <Text style={styles.paragraph}>
                iii) Terdapat masalah teknikal yang menyebabkan baucar atau kupon tidak boleh ditebus.
              </Text>
              <Text style={styles.paragraph}>
                4. 	De Cart berhak mengenakan atau meminda terma dan syarat tertentu bagi sesuatu tawaran promosi, atau membatalkan sebarang promosi, diskaun, baucar dan kupon pada bila-bila masa tanpa notis. Sebarang percanggahan antara terma dan syarat tawaran promosi tersebut dan Terma dan Syarat ini, terma dan syarat tawaran promosi tersebut adalah terpakai setakat mana terma-terma tersebut bercanggah.
              </Text>
              <Text style={styles.subHeader}>5. PN LITE</Text>
              <Text style={styles.paragraph}>
                5.1 PN Lite ialah kemudahan pembiayaan yang diberikan kepada pendaftar kategori ATM Aktif tanpa dikenakan apa-apa caj faedah bagi tujuan pembelian di kedai PERNAMA tidak termasuk barang berikut:
              </Text>
              <Text style={{color: 'black', fontSize: 16, marginLeft: 30}}>
                i Minuman keras*,{' '}
              </Text>
              <Text style={{color: 'black', fontSize: 16, marginLeft: 30}}>
                ii Barangan kaca dan elektrik bernilai RM100 ke atas; dan{' '}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  marginLeft: 30,
                  marginBottom: 5,
                }}>
                iii Bil-bil utiliti.
              </Text>
              <Text style={styles.paragraph}>
                5.2 Setelah akaun disahkan mengikut proses yang ditetapkan Terma dan Syarat ini, pendaftar ATM Aktif akan diperuntukkan had kredit PN Lite secara automatik tertakluk kepada kelayakan seperti berikut:
              </Text>
              <Text style={{color: 'black', fontSize: 16, marginLeft: 30}}>
                i)	Lain-lain Pangkat (LLP): RM500
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  marginLeft: 30,
                  marginBottom: 5,
                }}>
                ii) Pegawai: RM1000
              </Text>
              <Text style={styles.paragraph}>
                5.3 PN Lite sah untuk tempoh satu bulan kalendar. Sekiranya pembayaran balik bagi kemudahan PN Lite yang telah digunakan tidak atau gagal dibuat sebelum 7 haribulan bulan seterusnya, anda tidak layak untuk menggunakan kemudahan PN Lite pada bulan seterusnya sehingga pembayaran balik tersebut dibuat.
              </Text>
              <Text style={styles.paragraph}>
                5.4 PN Lite boleh digunakan dimana-mana kedai PERNAMA di seluruh Malaysia.
              </Text>
              <Text style={styles.paragraph}>
                5.5 Anda bersetuju membenarkan PERNAMA membuat pemotongan gaji bagi mendapatkan pembayaran balik kredit PN Lite yang telah digunakan. Pemotongan gaji akan dilakukan sekiranya tiada sebarang pembayaran balik selepas tempoh 1 bulan kalendar daripada penggunaan PN Lite.
5.6 Dengan penggunaan PN Lite, anda memperakui dan bersetuju untuk terikat dengan Terma dan Syarat yang ditetapkan.

              </Text>
              <Text style={styles.paragraph}>
                6. 	Ketersediaan stok barangan yang tertera dalam De Cart, termasuk barangan bukan promosi, adalah tertakluk kepada ketersediaan stok di kedai-kedai PERNAMA. Untuk memastikan barangan promosi tersedia untuk semua pelanggan, PERNAMA berhak terlebih dahulu mengenakan had kuantiti pembelian.
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>F. DATA PERIBADI</Text>
              <Text style={styles.paragraph}>
                1. Anda bersetuju dan memberi kuasa kepada De Cart untuk mengumpul, menggunakan, menyimpan atau memproses maklumat peribadi anda untuk tujuan yang dinyatakan di sini, mengesahkan identiti anda, menyiasat aduan dan transaksi yang disyaki mencurigakan, dan/atau menambah baik tawaran Perkhidmatan dan untuk tujuan pemasaran dan kawalan kredit (“Tujuan”). Tujuan mungkin termasuk pendedahan maklumat peribadi anda untuk menerima tawaran dan promosi daripada De Cart, PERNAMA atau pihak ketiga terpilih atau syarikat bersekutu atau berkaitan kami dari semasa ke semasa di mana kami percaya bahawa perkhidmatan yang ditawarkan oleh kami atau pihak ketiga tersebut mungkin menarik minat anda, atau di mana pendedahan ini diperlukan oleh undang-undang, atau untuk menyediakan Perkhidmatan kepada anda. Maklumat lanjut boleh didapati dalam Dasar Privasi kami.
              </Text>
              <Text style={styles.paragraph}>
                2. Dengan pendaftaran akaun dan penggunaan aplikasi De Cart termasuk sebarang Perkhidmatan yang ditawarkan De Cartk khususnya kemudahan kredit atau pembiayaan, anda dengan ini memberi kebenaran kepada PERNAMA, dan mana-mana agensi pelaporan kredit yang tertakluk di bawah Akta Agensi Pelaporan Kredit 2010 termasuk dan tidak terhad kepada CTOS Data Systems Sdn Bhd, untuk mendapatkan dan/atau mendedahkan apa-apa maklumat kredit berkaitan anda daripada dan/atau kepada agensi pelaporan kredit yang berkenaan untuk tujuan-tujuan berikut:
              </Text>
              <Text style={{color: 'black', fontSize: 16, marginLeft: 30}}>
                i. pembukaan akaun;
              </Text>
              <Text style={{color: 'black', fontSize: 16, marginLeft: 30}}>
                ii. pemulihan hutang;
              </Text>
              <Text style={{color: 'black', fontSize: 16, marginLeft: 30}}>
                iii. semakan kredit atau akaun;
              </Text>
              <Text style={{color: 'black', fontSize: 16, marginLeft: 30}}>
                iv. dokumentasi perundangan;
              </Text>
              <Text style={{color: 'black', fontSize: 16, marginLeft: 30}}>
                v. pemantauan kredit atau akaun; dan
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  marginLeft: 30,
                  marginBottom: 5,
                }}>
                vi. penilaiai kredit atau akaun.
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>G. PEMILIKAN HARTA INTELEK</Text>
              <Text style={styles.paragraph}>
                1.Anda bersetuju bahawa PERNAMA memiliki semua hak, hakmilik dan kepentingan, termasuk semua hak harta intelek, samada berdaftar atau tidak berdaftar, yang berkaitan dan komponen, proses dan reka bentuk masing-masing secara keseluruhannya, dalam dan pada Perisian dan/atau De Cart, dan termasuklah Perkhidmatan dan sebarang cadangan, idea, permintaan peningkatan, maklum balas, pengesyoran atau maklumat lain yang diberikan oleh anda atau mana-mana pihak lain yang berkaitan dengan Perkhidmatan. 
              </Text>
              <Text style={styles.paragraph}>
                2. Perjanjian ini bukan perjanjian penjualan dan tidak memberikan anda sebarang hak pemilikan dalam atau berkaitan dengan Perkhidmatan, Perisian dan/atau De Cart, atau sebarang hak harta intelek yang dimiliki oleh PERNAMA dan/atau penyedia perkhidmatan yang berkaitan.
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>H. PENAMATAN</Text>
              <Text style={styles.paragraph}>
                1. PERNAMA atau anda boleh menamatkan Perjanjian ini serta-merta dengan atau tanpa pemberitahuan. Perjanjian ini akan ditamatkan serta-merta jika anda melanggar mana-mana Terma dan Syarat. 
              </Text>
              <Text style={styles.paragraph}>
                2. PERNAMA berhak menukar pendaftar kategori ATM Aktif kepada kategori  Awam Am jika PERNAMA mendapat maklum bahawa pendaftar tersebut telah tamat perkhidmatan atas sebab hal-hal tertentu. Sekiranya PERNAMA juga mendapat maklum bahawa pendaftar kategori Awam Khas bertukar kementerian atau tamat perkhidmatan atas sebab hal-hal tertentu hingga pendaftar tersebut tidak lagi tergolong dalam pendaftar kategori Awam Khas, PERNAMA berhak menukar status pendaftar ke kategori Awam Am.
              </Text>
              <Text style={styles.paragraph}>
                3. Penggunaan Sub-Akaun automatik akan ditukarkan ke kategori Awam Am jika pendaftar Akaun Prinsipal ditamatkan perkhidmatan atas sebab hal-hal tertentu. 
              </Text>
              <Text style={styles.paragraph}>
                4.PERNAMA juga berhak, mengikut budi bicara mutlaknya, untuk menamatkan, menggantung atau mengehadkan keseluruhan atau mana-mana bahagian Perkhidmatan, penggunaan dan keupayaan untuk menggunakan Perkhidmatan, pemadaman dan penyingkiran akaun anda atau menuntut tindakan undang-undang berkenaan dengan kandungan anda dan/atau penggunaan Aplikasi, Perisian dan Perkhidmatan oleh anda, yang PERNAMA semata-mata percaya adalah atau mungkin melanggar Perjanjian ini, tetapi kegagalan atau kelewatan PERNAMA dalam mengambil tindakan sedemikian tidak menjadi penafian hak PERNAMA untuk menguatkuasakan Perjanjian ini.
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>I. INDEMNIFIKASI</Text>
              <Text style={styles.paragraph}>
              Dengan bersetuju dan menerima Terma dan Syarat atau dengan menggunakan Perkhidmatan, anda bersetuju bahawa anda akan mempertahankan, menanggung rugi, menahan, melindungi PERNAMA, anak syarikat, syarikat bersekutu, pengarah, pegawai, pekerja PERNAMA daripada dan terhadap mana-mana dan semua tuntutan, saman, ganti rugi, kos, tuntutan mahkamah, denda, penalti, liabiliti, perbelanjaan (termasuk yuran peguam) yang timbul daripada atau berkaitan dengan:
              </Text>
              <Text style={styles.paragraph}>
                i. i.	penggunaan atau penyalahgunaan Perkhidmatan oleh anda, Perisian dan/atau De Cart; 
              </Text>
              <Text style={styles.paragraph}>
                ii. pelanggaran Terma & Syarat ini dan/atau
              </Text>
              <Text style={styles.paragraph}>
                iii. pelanggaran mana-mana hak pihak ketiga.
              </Text>
              <Text style={styles.paragraph}>
              PERNAMA berhak untuk mengambil alih pembelaan dan kawalan eksklusif apa-apa perkara yang jika sebaliknya tertakluk kepada ganti rugi anda, di mana anda akan bekerjasama dalam mempertahankan atau menegaskan sebarang pembelaan yang ada. Sekiranya terdapat tuntutan pihak ketiga bahawa De Cart atau pemilikan dan penggunaan De Cart oleh anda melanggar hak harta intelek pihak ketiga tersebut, maka PERNAMA akan bertanggungjawab sepenuhnya untuk penyiasatan, pembelaan, penyelesaian dan pelepasan mana-mana tuntutan pelanggaran harta intelek tersebut.
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>J. TIADA WARANTI</Text>
              <Text style={styles.paragraph}>
                1. PERNAMA menyediakan perisian, aplikasi dan perkhidmatan kepada anda secara "seadanya" dan penggunaannya adalah atas risiko anda sendiri. Sejauh yang dibenarkan oleh undang-undang yang berkenaan, pernama menafikan semua waranti dan syarat, sama ada tersurat atau tersirat, termasuk mana-mana waranti atau syarat bahawa perisian, De Cart dan perkhidmatan adalah boleh diperdagangkan, mempunyai kualiti memuaskan, tepat masa, boleh dipercayai, selamat, tepat, sesuai untuk tujuan atau keperluan tertentu, tidak melanggar atau bebas kecacatan atau kesilapan, atau bebas daripada virus atau komponen berbahaya yang lain, atau mampu beroperasi atas asas tanpa gangguan, atau penggunaan De Cart atau perkhidmatan oleh anda mematuhi semua undang-undang yang berkenaan, atau maklumat anda yang diproses atau dihantar semasa penggunaan De Cart atau perkhidmatan akan berjaya, tepat atau selamat diproses atau dihantar, di mana semua jaminan dan syarat yang dinyatakan sebelum ini dinafikan sepenuhnya setakat yang dibenarkan undang-undang. 
              </Text>
              <Text style={styles.paragraph}>
                2. PERNAMA juga tidak menjamin bahawa perkhidmatan atau De Cart itu akan memenuhi keperluan atau jangkaan anda, atau sebarang data yang disimpan akan tepat atau boleh dipercayai, atau kualiti mana-mana produk, perkhidmatan, maklumat yang diperlukan oleh anda atau diperlukan untuk penggunaan perkhidmatan akan memenuhi keperluan atau jangkaan anda, atau kesilapan atau kecacatan dalam aplikasi dan/atau perisian tiada atau akan dibetulkan.
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>K. KEGAGALAN TELEKOMUNIKASI</Text>
              <Text style={styles.paragraph}>
                1. Perkhidmatan, De Cart dan/atau Perisian mudah alih, dan peranti-peranti telekomunikasi di kedai PERNAMA adalah tertakluk kepada had, kelewatan dan masalah lain yang wujud dalam penggunaan internet dan komunikasi elektronik termasuk peranti yang anda gunakan rosak, tidak disambungkan, berada di luar julat isyarat peranti, peranti berfungsi dengan tidak betul atau capaian internet di peranti anda tiada, lemah atau terputus atau terdapat gangguan perkhidmatan telekomunikasi dan internet di pihak penyedia perkhidmatan.
              </Text>
              <Text style={styles.paragraph}>
                2. PERNAMA tidak bertanggungjawab ke atas sebarang kelewatan, kegagalan pemprosesan atau penghantaran, kerosakan atau kerugian anda akibat daripada masalah tersebut. PERNAMA juga tidak menjamin sebarang perkhidmatan yang disediakan dan sebarang peralatan telekomunikasi bebas daripada sebarang masalah teknikal. Dalam hal ini, anda bersetuju bahawa PERNAMA tidak akan dipertanggungjawabkan atas sebarang kehilangan atau kerugian yang disebabkan masalah tersebut.
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>L. TIADA LIABILITI</Text>
              <Text style={styles.paragraph}>
                1. Setakat yang dibenarkan oleh undang-undang, PERNAMA tidak akan bertanggungjawab ke atas sebarang tuntutan, kehilangan, kerosakan, kehilangan data, kos atau perbelanjaan yang ditanggung (sama ada secara langsung atau berbangkit), yang dialami oleh anda yang timbul daripada atau berkaitan dengan anda menggunakan Perkhidmatan, De Cart dan/atau Perisian. PERNAMA juga tidak akan bertanggungjawab kepada anda untuk:- 
              </Text>
              <Text style={styles.paragraph}>
                (a) sebarang kehilangan pendapatan, perniagaan, muhibah (goodwill), atau keuntungan yang timbul daripada Perjanjian ini;
              </Text>
              <Text style={styles.paragraph}>
                (b) sebarang capaian tanpa kebenaran atau pengubahan akaun; 
              </Text>
              <Text style={styles.paragraph}>
                (c) akibat daripada sebarang kelewatan atau kesilapan yang berkaitan dengan penggunaan Perkhidmatan yang disebabkan oleh sebarang keadaan di luar kawalan PERNAMA; 
              </Text>
              <Text style={styles.paragraph}>
                (d) sebarang kerugian atau kerosakan yang tidak disebabkan oleh pelanggaran Perjanjian ini oleh PERNAMA atau pelanggaran kewajipan undang-undang penjagaan (duty of care); 
              </Text>
              <Text style={styles.paragraph}>
                (e) sebarang kerugian atau kerosakan yang bukan merupakan hasil yang munasabah yang boleh diramalkan sama ada akibat pelanggaran Perjanjian ini oleh PERNAMA atau pelanggaran kewajipan undang-undang penjagaan (duty of care). Kerugian atau kerosakan adalah "boleh dijangka secara munasabah" jika, pada masa PERNAMA dan anda menandatangani atau memasuki Perjanjian ini, kerugian tersebut telah dipertimbangkan oleh PERNAMA dan anda; atau 
              </Text>
              <Text style={styles.paragraph}>
                (f) sebarang kerugian atau kerosakan yang anda alami akibat daripada kegagalan anda mengambil langkah berjaga-jaga yang munasabah terhadap kerugian atau kerosakan tersebut dan/atau perlanggaran Perjanjian ini.
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>M. LAIN-LAIN</Text>
              <Text style={styles.paragraph}>
                1. Fungsi lokasi. PERNAMA mengambil dan menggunakan informasi lokasi anda untuk memastikan keberkesanan fungsi lokasi. Sebagai contoh, aplikasi mungkin memerlukan maklumat tentang lokasi terkini pelanggan untuk membantu anda mencari kedai PERNAMA yang terdekat.
              </Text>
              <Text style={styles.paragraph}>
                2. Hubungan: Tiada usaha sama, perkongsian, pekerjaan atau hubungan agensi wujud antara anda, PERNAMA, mana-mana pembekal atau pihak ketiga akibat daripada Terma & Syarat atau penggunaan Perkhidmatan.
              </Text>
              <Text style={styles.paragraph}>
                3. Kebolehpisahan: Jika mana-mana peruntukan Terma & Syarat dianggap tidak sah atau tidak boleh dikuatkuasakan, peruntukan tersebut hendaklah dibatalkan dan peruntukan selebihnya hendaklah dikuatkuasakan sepenuhnya di bawah undang-undang. Ini hendaklah, tanpa had, juga terpakai kepada undang-undang dan bidang kuasa yang terpakai seperti yang ditetapkan di atas.
              </Text>
              <Text style={styles.paragraph}>
                4. Tiada penepian: Kegagalan atau kelewatan PERNAMA untuk menguatkuasakan mana-mana hak atau peruntukan dalam Terma & Syarat tidak akan menjadi penepian hak atau peruntukan tersebut melainkan diakui dan dipersetujui oleh PERNAMA secara bertulis.
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>N. HUBUNGI KAMI</Text>
              <Text style={styles.paragraph}>
              Jika terdapat sebarang masalah dan pertanyaan mengenai aplikasi De Cart, atau jika anda mempunyai sebarang pertikaian ke atas maklumat atau transaksi di De Cart, anda boleh hubungi kami di: 
              </Text>
              <Text style={styles.paragraph}>
              No Telefon: 03-30930572 atau;
              </Text>
              <Text style={styles.paragraph}>
              Alamat: PERWIRA NIAGA MALAYSIA (PERNAMA), 6 Solok Waja 1, Bukit Raja, 41050 Klang Selangor.
              </Text>
            </View>
            <Text style={styles.answer}></Text>
            <Text style={styles.answer}></Text>
            <Text style={styles.answer}></Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
    textAlign: 'justify',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    color: 'black',
    textAlign: 'justify',
  },
  subSection: {
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    color: 'black',
    textAlign: 'justify',
  },
  answer: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'justify',
    color: 'black',
    marginBottom: 5,
  },
});
