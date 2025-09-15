import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../component/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../Utils/localHelper';
import { updateCampaignsThunk } from '../../Services/CampaignsService/CampaignsSlice';

const Campaigns = ({ navigation }) => {
    const campaignsData = useSelector((state) => state.getCampaigns.campaignsData);
    const [remark, setRemark] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        if (remark.trim() === '') {
            setError('Remark is required.');
        } else {
            setError('');
            try {
                const custId = await getData('CustId');
                const today = new Date();
                const formattedDate = today.toISOString().split('T')[0];

                const payload = {
                    CustId: custId,
                    CustomerCampaignID: 0,
                    CampaignID: campaignsData[0]?.CampaignID,
                    EntryDate: formattedDate,
                    CustomerCampaignRemarks: remark,
                };

                const response = await dispatch(updateCampaignsThunk({ payload }));
                if (response?.payload?.CustomerCampaignID) {
                    Alert.alert('Berjaya Dihantar', 'Terima kasih kerana menyertai kempen ini.');
                    navigation.navigate('Main');
                } else {
                    Alert.alert('Sila Hantar Semula Borang');
                }
            } catch (err) {
                console.error('Submission error:', err);
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header Screen="Kempen DCER" />
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: `data:image/png;base64,${campaignsData[0]?.Data}` }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.RemarkContainer}>
                    <Text style={styles.Remarks}>{campaignsData[0]?.Remarks}</Text>
                </View>

                <View style={styles.AnswerContainer}>
                    <Text style={styles.label}>Jawapan</Text>
                    <TextInput
                        placeholder="Sila isikan jawapan anda di sini."
                        style={styles.textArea}
                        value={remark}
                        onChangeText={(text) => setRemark(text)}
                    />
                    {error !== '' && <Text style={styles.errorText}>{error}</Text>}
                </View>

                <View style={styles.termsWrapper}>
      <Image
                    source={{ uri: `data:image/png;base64,${campaignsData[0]?.TCData}` }}
                    style={{height:150,width:'100%'}}
                />
                    {/* <Text style={styles.termsTitle}>Terma & Syarat</Text>
                    <Text style={styles.termsText}>
                        1. Khas untuk akaun ahli yang sah.{"\n"}
                        2. Setiap akaun akan berpeluang untuk satu penyertaan sahaja.{"\n"}
                        3. Pemenang dipilih berdasarkan 100 akaun yang terawal dengan jawapan yang tepat dan perbelanjaan tertinggi dari 1 – 31 Julai 2025.{"\n"}
                        4. Keputusan adalah muktamad.{"\n"}
                        5. Tertakluk kepada Terma dan Syarat aplikasi DE Cart yang telah ditetapkan.
                    </Text> */}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
                        <Text style={styles.loginText}>Hantar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Campaigns;

const styles = StyleSheet.create({
    imageContainer: {
        height: '45%',
        width: '100%',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    RemarkContainer: {
        marginTop: 16,
    },
    Remarks: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        marginBottom: 5,
    },
    AnswerContainer: {
        marginTop: 12,
    },
    label: {
        marginVertical: 5,
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },
    textArea: {
        height: 54,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
        backgroundColor: '#fff',
    },
    errorText: {
        color: 'red',
        fontSize: 13,
        marginTop: 5,
    },
    termsWrapper: {
        marginTop: 16,
    },
    termsTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    termsText: {
        fontSize: 14,
        color: '#000',
        lineHeight: 22,
        fontWeight:'400',
        marginBottom: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    loginBtn: {
        width: '90%',
        borderRadius: 5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#292A60',
    },
    loginText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
    },
});
