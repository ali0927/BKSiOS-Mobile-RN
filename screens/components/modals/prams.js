import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
// import {useAppContext} from '../../../context/AppContext';
import {liveInfo} from '../../utils/param';
import {getEventPrice} from '../../utils';
import axios from 'axios';
import {creditPayment} from '../../helper/credits';
import DomSelector from 'react-native-dom-parser';

const ParamModal = ({eventCard, showCreditModal, setShowCreditModal}) => {
  // const {setModal} = useAppContext();
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [CVC, setCVC] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const buyWithParam = async () => {
    const orderId = 'sipariş' + cardNumber + new Date().getTime();
    const hataUrl = 'http://google.com.tr?q=hatali';
    const basariliUrl = 'http://google.com.tr?q=basarili';
    const Islem_Tutar = getEventPrice(eventCard);
    const Toplam_Tutar = getEventPrice(eventCard);
    const Islem_Hash_Raw =
      liveInfo.CLIENT_CODE +
      liveInfo.GUID +
      Islem_Tutar +
      Toplam_Tutar +
      orderId +
      hataUrl +
      basariliUrl;
    const Islem_Hash = await axios.get(
      `${liveInfo.api}/SHA2B64?Data=${Islem_Hash_Raw}`,
    );
    console.log('XML-Islem_Hash', Islem_Hash.data);
    // const parser = new DOMParser();
    // const xmlDoc = parser.parseFromString(Islem_Hash.data, 'text/xml');
    const xmlDoc = DomSelector(parseFromString(Islem_Hash.data, 'text/xml'));
    console.log('Doccc', xmlDoc);
    const hash =
      xmlDoc.getElementsByTagName('string')[0].childNodes[0].nodeValue;
    console.log('Hash', hash);
    const xml = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <TP_Islem_Odeme_WD xmlns="https://turkpos.com.tr/">
            <G>
              <CLIENT_CODE>${liveInfo.CLIENT_CODE}</CLIENT_CODE>
              <CLIENT_USERNAME>${liveInfo.CLIENT_USERNAME}</CLIENT_USERNAME>
              <CLIENT_PASSWORD>${liveInfo.CLIENT_PASSWORD}</CLIENT_PASSWORD>
            </G>
            <Doviz_Kodu>1002</Doviz_Kodu>
            <GUID>${liveInfo.GUID}</GUID>
            <KK_Sahibi>${name}</KK_Sahibi>
            <KK_No>${cardNumber}</KK_No>
            <KK_SK_Ay>${expDate.split('/')[0]}</KK_SK_Ay>
            <KK_SK_Yil>${expDate.split('/')[1]}</KK_SK_Yil>
            <KK_CVC>${CVC}</KK_CVC>
            <KK_Sahibi_GSM>${phoneNumber}</KK_Sahibi_GSM>
            <Hata_URL>${hataUrl}</Hata_URL>
            <Basarili_URL>${basariliUrl}</Basarili_URL>
            <Siparis_ID>${orderId}</Siparis_ID>
            <Siparis_Aciklama></Siparis_Aciklama>
            <Islem_Tutar>${Islem_Tutar}</Islem_Tutar>
            <Toplam_Tutar>${Toplam_Tutar}</Toplam_Tutar>
            <Islem_Hash>${hash}</Islem_Hash>
            <Islem_Guvenlik_Tip>NS</Islem_Guvenlik_Tip>
            <Islem_ID></Islem_ID>
            <IPAdr>127.0.0.1</IPAdr>
            <Ref_URL></Ref_URL>
            <Data1></Data1>
            <Data2></Data2>
            <Data3></Data3>
            <Data4></Data4>
            <Data5></Data5>
          </TP_Islem_Odeme_WD>
        </soap:Body>
      </soap:Envelope>`;
    const data = {
      host: liveInfo.api,
      header: {
        'Content-Type': 'text/xml',
        SOAPAction: 'https://turkpos.com.tr/TP_Islem_Odeme_WD',
      },
      body: xml,
    };
    creditPayment(data)
      .then(res => {
        setModal({open: false});
        Toast.show({
          type: 'success',
          text1: 'Payment success!',
        });
      })
      .catch(err => {
        setModal({open: false});
        Toast.show({
          type: 'error',
          text1: 'Payment failed.',
        });
      });
  };
  return (
    <>
      <Modal
        isVisible={showCreditModal}
        onBackdropPress={() => setShowCreditModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>Pay with Credit Card</Text>
            <TouchableOpacity onPress={() => setShowCreditModal(false)}>
              <Text style={styles.modalClose}>&times;</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.payButton} onPress={buyWithParam}>
            <Text style={styles.text3}>Buy</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* <div
        className={styles.container}
        style={isMobile ? {maxWidth: '100%'} : {maxWidth: '80%'}}>
        <div className={styles.title}>
          Pay with Credit Card
        </div>
        <div className={styles.wrapper}>
          <div className={styles.input_wrapper_half}>
            Name: <input value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className={styles.input_wrapper_half}>
            GSM:
            <input
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className={styles.input_wrapper_full}>
            Card Number:
            <input
              value={cardNumber}
              onChange={e => setCardNumber(e.target.value)}
            />
          </div>
          <div className={styles.input_wrapper_half}>
            Expiration Date:
            <input
              value={expDate}
              onChange={e => setExpDate(e.target.value)}
              placeholder="MM/YY"
            />
          </div>
          <div className={styles.input_wrapper_half}>
            CVC: <input value={CVC} onChange={e => setCVC(e.target.value)} />
          </div>
        </div>
        <button
          className="asset__btn asset__btn--full asset__btn--clr open-modal"
          onClick={buyWithParam}>
          Buy
        </button>
      </div> */}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
    overflow: 'hidden',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#14142f',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#887bff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  modalClose: {
    color: '#fff',
    width: 25,
    margin: 0,
    textAlign: 'center',
    fontSize: 26,
  },
  payButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    paddingTop: 15,
    textAlignVertical: 'center',
    height: 44,
    backgroundColor: '#6a4dfd',
    borderRadius: 4,
    width: '100%',
  },
  text3: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    textAlign: 'center',
    textTransform: 'uppercase',
    height: 40,
    width: '100%',
    letterSpacing: 1.6,
  },
});
export default ParamModal;
