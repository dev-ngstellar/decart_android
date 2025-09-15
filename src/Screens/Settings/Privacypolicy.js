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
import backdrop from '../../Assets/LOGO/backdrop.jpg'

const Privacypolicy = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header Screen="Dasar Privasi" />
      <ImageBackground source={backdrop} style={{height:'100%'}}> 
      <View
        style={{
          width: '100%',
          height: '25%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Image source={pernama} style={{height: 250, width: 150}} />
      </View>

      <ScrollView>
        <View style={{height: 'auto', width: '90%', marginHorizontal: '5%'}}>
          <View style={styles.section}>
            <Text style={styles.header}>
              POLISI PERLINDUNGAN DATA PERIBADI De Cart PERNAMA
            </Text>
            <Text style={styles.paragraph}>
              1. PERWIRA NIAGA MALAYSIA (PERNAMA) menghormati privasi anda. Kami
              memandang dan menjaga Data Peribadi anda dengan serius.
            </Text>
            <Text style={styles.paragraph}>
              2. Dengan membekalkan Data Peribadi anda kepada PERNAMA, atau
              dengan mendaftar akaun atau menggunakan De Cart, melengkapkan
              transaksi, berurusan di De Cart, membuat pesanan, penghantaran,
              komunikasi atau inkuiri di De Cart, kami membayangkan bahawa anda
              secara sukarela dan bersetuju untuk PERNAMA mengumpul, menyimpan,
              memproses, menganalisa, termasuk menzahirkan kepada pembekal
              Perkhidmatan atau mana-mana pihak ketiga yang berkaitan dengan De
              Cart.
            </Text>
            <Text style={styles.paragraph}>
              3. Dalam Polisi ini, ‘Data Peribadi' merujuk kepada mana-mana
              bentuk maklumat yang berkaitan secara langsung atau tidak langsung
              dengan anda, yang semunasabahnya boleh mengenal pasti identiti
              anda berdasarkan maklumat sedemikian, atau mana-mana maklumat lain
              yang berkaitan untuk anda menggunakan De Cart, mendapatkan
              Perkhidmatan atau berurusan dengan atau melalui De Cart. Kategori
              Data Peribadi mungkin termasuk dan tidak terhad kepada data
              profail dan kemaskini profail, sejarah daftar masuk dan transaksi,
              data lokasi, maklumat peranti dan akses, data dan sejarah khidmat
              pelanggan, data pemasaran dan komunikasi, dan data pembayaran atau
              penebusan faedah De Cart.
            </Text>
            <Text style={styles.paragraph}>
              4. Dalam perjalanan urusan anda dengan PERNAMA, anda mungkin akan
              diminta untuk membekalkan Data Peribadi anda dari semasa ke semasa
              bagi membolehkan kami untuk melakukan transaksi dengan anda atau
              untuk memberikan Perkhidmatan dan/atau produk yang berkenaan yang
              berkaitan dengan perniagaan kami.
            </Text>
            <Text style={styles.paragraph}>
              5. PERNAMA mungkin menzahirkan Data Peribadi anda kepada pembekal
              perkhidmatan atau mana-mana pihak ketiga yang berkaitan dengan De
              Cart, Perkhidmatan atau tawaran-tawaran di De Cart dengan cara
              yang selaras dengan Polisi ini. PERNAMA juga boleh menggabungkan
              Data Peribadi anda dengan maklumat lain yang berkaitan untuk
              meningkatkan mutu produk dan Perkhidmatan yang disediakan oleh
              PERNAMA.
            </Text>
            <Text style={styles.paragraph}>
              6. Anda bersetuju bahawa transaksi, Perkhidmatan dan/atau produk
              yang ditawarkan di De Cart adalah terhad kepada Data Peribadi yang
              anda bekalkan. Anda bersetuju bahawa anda mungkin tidak dapat
              menikmati atau tidak menerima sebarang hebahan tentang, mana-mana
              faedah, tawaran produk atau Perkhidmatan disebabkan oleh Data
              Peribadi tertentu yang anda tidak bekalkan dan yang mungkin
              menyebabkan ketidakupayaan PERNAMA untuk membekalkan faedah,
              tawaran produk dan Perkhidmatan kepada anda.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.header}>SKOP PENGUMPULAN DATA PERIBADI</Text>
            <Text style={styles.paragraph}>
              1. Apabila anda menjalankan urusniaga dengan PERNAMA, kami mungkin
              mengumpul Data Peribadi anda seperti yang tertera di bawah:
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              i. Nama Penuh
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              ii. No Tentara/ No Kad Pengenalan
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              iii. No Telefon
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              iv. Alamat{' '}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              v. Status{' '}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                marginBottom: 5,
              }}>
              vi. Jantina{' '}
            </Text>
            <Text style={styles.paragraph}>
              2. Data Peribadi adalah tidak terhad kepada yang disenaraikan di
              atas dan mungkin termasuk Data Peribadi lain yang berkaitan
              (bergantung kepada bentuk transaksi dan urusan yang dijalankan
              oleh anda di De Cart).
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.header}>
              TUJUAN DE CART MENGUMPUL DATA PERIBADI ANDA
            </Text>
            <Text style={styles.paragraph}>
              1. Pengumpulan Data Peribadi anda membolehkan De Cart memproses
              transaksi dan urusan anda dengan tepat, mudah dan bersesuaian.
            </Text>
            <Text style={styles.paragraph}>
              2. Data Peribadi anda membolehkan PERNAMA untuk memberi maklumat
              terkini mengenai produk atau Perkhidmatan sedia ada atau baharu,
              promosi semasa atau terkini, pengumuman dan acara yang diadakan
              oleh De Cart mahupun Kedai PERNAMA, serta membantu PERNAMA untuk
              memperbaiki mutu produk dan perkhidmatan PERNAMA.
            </Text>
            <Text style={styles.paragraph}>
              3. Aplikasi De Cart boleh menggunakan Data Peribadi anda dari
              semasa ke semasa untuk menghantar notis penting, samada menerusi
              e-mel, surat atau khidmat pesanan ringkas (SMS) - antaranya
              hebahan mengenai sebarang aktiviti pemasaran dan promosi terkini
              yang berlangsung di kedai-kedai PERNAMA, maklumat pembelian anda,
              status kupon, baucar atau diskaun yang anda miliki, serta sebarang
              pindaan dan perubahan pada Terma dan Syarat serta Dasar Polisi
              ini.
            </Text>
            <Text style={styles.paragraph}>
              4. Aplikasi De Cart juga boleh menggunakan Data Peribadi anda
              untuk tujuan dalaman PERNAMA seperti pengauditan, analisis data,
              penyelidikan dan pembangunan untuk meningkatkan produk,
              Perkhidmatan dan khidmat pelanggan kedai PERNAMA.
            </Text>
            <Text style={styles.paragraph}>
              5. PERNAMA juga mungkin menzahirkan Data Peribadi anda atas dasar
              semunasabahnya perlu kepada pembekal atau mana-mana pihak ketiga
              yang menyediakan perkhidmatan seperti penyimpanan dan pemprosesan
              maklumat, proses pembayaran, pesanan, penghantaran, pengurusan dan
              peningkatan data pelanggan, khidmat pelanggan, serta kaji selidik
              kepuasan pelanggan.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.header}>
              PENYIMPANAN DAN AKSES DATA PERIBADI
            </Text>
            <Text style={styles.paragraph}>
              1. PERNAMA berusaha untuk memudahkan anda mengakses Data Peribadi
              anda dan memastikan maklumat anda sentiasa tepat, lengkap dan
              terkini. PERNAMA akan menyimpan Data Peribadi anda untuk tempoh
              masa yang diperlukan untuk memenuhi tujuan yang digariskan dalam
              Polisi ini, melainkan jika tempoh pengekalan maklumat yang lebih
              lama dibenarkan atau jika dikehendaki sedemikian oleh
              undang-undang.
            </Text>
            <Text style={styles.paragraph}>
              2. Anda boleh mengemaskini Data Peribadi anda di bahagian tetapan
              De Cart pada bila-bila masa. Anda juga boleh meminta kami
              memperbetulkan Data Peribadi anda yang tidak tepat atau bukan
              terkini, atau memadamkan Data Peribadi tersebut jika anda
              merasakan bahawa tiada keperluan untuk mengekalkannya, melainkan
              jika maklumat tersebut diperlukan oleh undang-undang atau untuk
              tujuan urusniaga yang sah. Kami boleh menolak permintaan untuk
              memproses permintaan tidak munasabah, yang berulangan, memerlukan
              usaha teknikal yang berlebihan, menjejaskan privasi pelanggan
              lain, yang boleh menggagalkan fungsi Perkhidmatan optimum, yang
              sama sekali tidak praktikal, atau yang mana aksesnya tidak
              diwajibkan oleh undang-undang tempatan.
            </Text>
            <Text style={styles.paragraph}>
              3. PERNAMA mempunyai hak dan budi bicara mutlak untuk mengemaskini
              dan meminda Polisi ini dari semasa ke semasa. PERNAMA menggalakkan
              anda untuk sentiasa mengunjungi halaman Dasar ini untuk terus
              mendapat maklumat terkini yang dikemaskini oleh pihak kami.
            </Text>
            <Text style={styles.paragraph}>
              4. PERNAMA hanya mengekalkan Data Peribadi anda selagi ia perlu
              untuk tujuan Perkhidmatan dan Dasar ini dan setakat yang
              diperlukan atau dibenarkan oleh undang-undang dan peraturan yang
              berkenaan.
            </Text>
            <Text style={styles.paragraph}>
              5. Apabila PERNAMA tidak lagi memerlukan Data Peribadi anda, dan
              termasuk apabila anda mengemukakan permohonan kepada PERNAMA untuk
              menarik balik kebenaran atau anda secara sukerela menutup akaun De
              Cart, kecuali sekiranya PERNAMA perlu mengekalkan Data Peribadi
              anda sebagai sebahagian tanggungjawab undang-undang, PERNAMA akan
              mengambil langkah munasabah untuk memadam, mengalih keluar,
              memusnahkan, menamakan atau menghalang akses kepada atau
              penggunaan Data Peribadi anda untuk tujuan De Cart. PERNAMA
              mungkin akan mengambil tempoh munasabah untuk memproses permohonan
              anda dan untuk memaklumkan kepada anda kesan kepada PERNAMA
              meluluskan permohonan tersebut sebelum proses memadam, mengalih
              keluar, memusnahkan atau menghalang akses kepada atau penggunaan
              Data Peribadi anda dikuatkuasakan.
            </Text>
            <Text style={styles.paragraph}>
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

export default Privacypolicy;

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
    textAlign: 'left',
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
