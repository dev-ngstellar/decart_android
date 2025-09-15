import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Header from '../../component/Header';
import backdrop from '../../Assets/LOGO/backdrop.jpg';

const FAQ = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header Screen="FAQs" />
      <ImageBackground source={backdrop} style={{height: '100%'}}>
        <ScrollView>
          <View style={styles.faqItem}>
            <Text style={styles.question}>1. Apakah aplikasi De Cart?</Text>
            <Text style={styles.answer}>
              Aplikasi De Cart adalah program kesetiaan pelanggan yang diuruskan
              oleh Perbadanan Perwira Niaga Malaysia (PERNAMA) khas untuk
              pelanggan setia khususnya warga Angkatan Tentera Malaysia (ATM),
              Veteran, Kakitangan PERNAMA dan Awam. Aplikasi De Cart ini
              membolehkan pengguna untuk mengumpul dan menebus mata ganjaran,
              baucar dan kupon untuk lebih penjimatan dalam setiap pembelian.
            </Text>
          </View>
          <View style={styles.faqItem}>
            <Text style={styles.question}>
              2. Bagaimana cara untuk saya mendaftar aplikasi De Cart?
            </Text>
            <Text style={styles.answer}>
              Untuk mendaftar, anda perlu memuat turun De Cart melalui aplikasi
              Apple Play Store bagi pengguna IOS atau Google Play Store dan
              Huawei App Store bagi pengguna Android.
            </Text>
          </View>
          <View style={styles.faqItem}>
            <Text style={styles.question}>
              3. Bagaimana cara saya mendapatkan mata ganjaran De Cart?
            </Text>
            <Text style={styles.answer}>
              Mata ganjaran boleh didapati dengan setiap pembelian di mana-mana
              kedai PERNAMA di seluruh negara tertakluk kepada terma dan syarat.
            </Text>
          </View>
          <View style={styles.faqItem}>
            <Text style={styles.question}>
              4. Adakah De Cart ini boleh digunakan sebagai e-wallet?
            </Text>
            <Text style={styles.answer}>
              Tidak. Pada fasa awal ini, aplikasi De Cart hanya boleh digunakan
              untuk mengumpul, menebus mata ganjaran, baucar dan kupon sahaja.
            </Text>
          </View>
          <View style={styles.faqItem}>
            <Text style={styles.question}>
              5. Bagaimana cara untuk saya menutup akaun De Cart?
            </Text>
            <Text style={styles.answer}>
              Aplikasi De Cart ini merupakan sebuah aplikasi sepanjang hayat dan
              tidak mempunyai tarikh luput dimana pengguna tidak diberi pilihan
              untuk menutup akaun yang telah didaftar.
            </Text>
          </View>
          <View style={styles.faqItem}>
            <Text style={styles.question}>
              6. Bagaimana cara menggunakan mata ganjaran, baucar dan kupon di
              aplikasi De Cart?
            </Text>
            <Text style={styles.answer}>
              Pengguna boleh menggunakan mata ganjaran, baucar dan kupon dengan
              cara menunjukkan kod QR kepada juruwang semasa proses pembayaran.
              Imbasan kod QR setelah transaksi berlaku adalah tidak dibenarkan.
            </Text>
          </View>
          <View style={styles.faqItem}>
            <Text style={styles.question}>
              7. Dimanakah aplikasi De Cart ini boleh digunakan?
            </Text>
            <Text style={styles.answer}>
              Aplikasi De Cart ini boleh digunakan dan terpakai hanya di
              kedai-kedai PERNAMA seluruh Malaysia termasuk Sabah dan Sarawak.
            </Text>
          </View>
          <View style={styles.faqItem}>
            <Text style={styles.question}>
              8. Bagaimana cara untuk mendapatkan baucar dan kupon?
            </Text>
            <Text style={styles.answer}>
              Baucar dan kupon boleh didapati di bahagian atas pada halaman
              utama. Pengguna juga boleh mendapatkan maklumat berkenaan sebarang
              pemberian baucar dan kupon terkini pada paparan notifikasi.
            </Text>
          </View>
          <View style={styles.faqItem}>
            <Text style={styles.question}>
              9. Bagaimana saya boleh mendapatkan bantuan berkenaan aplikasi De
              Cart?
            </Text>
            <Text style={styles.answer}>
              Sebarang pertanyaan berhubung aplikasi ini, pengguna boleh terus
              ke bahagian Hubungi Kami yang tertera pada paparan info di
              aplikasi.
            </Text>
            <Text style={styles.answer}></Text>
            <Text style={styles.answer}></Text>
            <Text style={styles.answer}></Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  faqItem: {
    marginTop: 10,
    width: '95%',
    marginHorizontal: '3%',
  },
  question: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color: 'black',
  },
  answer: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'justify',
    color: 'black',
    marginBottom: 5,
  },
});
