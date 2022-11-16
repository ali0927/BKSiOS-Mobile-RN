import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useSelector} from 'react-redux';
import config from '../../helper/config';
import {getEventPrice} from '../../utils';

const ParamModal = ({
  eventCard,
  showCreditModal,
  setShowCreditModal,
  amount,
}) => {
  const [userInfo, setUserInfo] = useState();
  const _userInfo = useSelector(state => state.userInfoReducer).userInfo;
  const country = useSelector(state => state.locationInfoReducer).locationInfo;
  const rateTry = useSelector(state => state.currencyInfoReducer).rateTry;
  const rateUsd = useSelector(state => state.currencyInfoReducer).rateUsd;
  const rateGbp = useSelector(state => state.currencyInfoReducer).rateGbp;

  const [focusedItem, setFocusedItem] = useState('');
  const [validationName, setValidationName] = useState(true);
  const [validationAddress, setValidationAddress] = useState(true);
  const [validationNumber, setValidationNumber] = useState(true);
  const [validationDate, setValidationDate] = useState(true);
  const [validationCVC, setValidationCVC] = useState(true);
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardAddress, setCardAddress] = useState('');
  const [expDate, setExpDate] = useState('');
  const [CVC, setCVC] = useState('');
  const CURRENCY = {
    TR: 'TRY',
    US: 'USD',
    GB: 'GBP',
  };

  const checkValidation = () => {
    let vName = false;
    let vNumber = false;
    let vCVC = false;
    let vDate = false;
    let vAddress = false;
    if (!name.match(/^[A-Za-z ]+$/) || name.length === 0) {
      vName = false;
    } else {
      vName = true;
    }
    if (cardAddress.length === 0) {
      vAddress = false;
    } else {
      vAddress = true;
    }
    if (
      !cardNumber.replace(/\s/g, '').match(/^[0-9]+$/) ||
      cardNumber.length !== 19
    ) {
      vNumber = false;
    } else {
      vNumber = true;
    }
    if (expDate.length !== 5) {
      vDate = false;
    } else {
      vDate = true;
    }
    if (!CVC.match(/^[0-9]+$/) || CVC.length !== 3) {
      vCVC = false;
    } else {
      vCVC = true;
    }
    setValidationCVC(vCVC);
    setValidationDate(vDate);
    setValidationName(vName);
    setValidationNumber(vNumber);
    setValidationAddress(vAddress);
    if (vDate && vName && vNumber && vCVC && vAddress) {
      return true;
    } else return false;
  };

  const setCardNum = e => {
    console.log('E:', e);
    let temp = e;
    if (e.length === 4 || e.length === 9 || e.length === 14) {
      temp = e + ' ';
    }
    if (e.length >= 16 && e.search(' ') === -1) {
      temp =
        e.substring(0, 4) +
        ' ' +
        e.substring(4, 8) +
        ' ' +
        e.substring(8, 12) +
        ' ' +
        e.substring(12, 16);
    }
    setCardNumber(temp);
  };
  const setExpectionDate = e => {
    let temp = e;
    if (e.length === 2) {
      temp = e + '/';
    }
    setExpDate(temp);
  };

  const buyWithParam = async () => {
    if (!checkValidation()) return;
    console.log(
      'Country',
      country,
      rateTry,
      rateGbp,
      rateUsd,
      userInfo?.user.wallet_address,
      validationName,
    );

    console.log('Post data:::', dataObject);
    const link = config.API_BASE_URL + '/api/payment/credit';
    axios
      .post(link, JSON.stringify({...dataObject}))
      .then(response => {
        setShowCreditModal(false);
        Toast.show({
          type: 'success',
          text1: 'Payment Success!',
        });
        console.log('RESPONSE', response);
      })
      .catch(error => {
        setShowCreditModal(false);
        Toast.show({
          type: 'error',
          text1: 'Payment Failed!',
        });
        console.error('There was an error!', error);
      });
  };

  const emailData = {
    mobile: true,
    email: userInfo?.user?.email,
    ticket_number: Number(amount),
    user_name: userInfo?.user?.name,
    event_name: eventCard.name,
    collection_name: eventCard.collection?.name,
    addons: eventCard?.addons ? JSON.parse(eventCard.addons) : [],
    // nft_base64: `${config.API_BASE_URL_AWS}/api/upload/get_file?path=${eventCard.picture_large}`,
    nft_base64: eventCard.picture_large,
    totalPrice:
      country === 'TR'
        ? (Number(eventCard.price) * rateTry * Number(amount)).toFixed(2) + '₺'
        : country === 'US'
        ? (Number(eventCard.price) * rateUsd * Number(amount)).toFixed(2) + '$'
        : country === 'GB'
        ? (Number(eventCard.price) * rateGbp * Number(amount)).toFixed(2) + '£'
        : Number(eventCard.price) * Number(amount) + '€',
    ticketPrice:
      country === 'TR'
        ? (Number(eventCard.price) * rateTry).toFixed(2) + '₺'
        : country === 'US'
        ? (Number(eventCard.price) * rateUsd).toFixed(2) + '$'
        : country === 'GB'
        ? (Number(eventCard.price) * rateGbp).toFixed(2) + '£'
        : Number(eventCard.price) + '€',
    facebook: eventCard.facebook,
    twitter: eventCard.twitter,
    telegram: eventCard.telegram,
    instagram: eventCard.instagram,
    eventEmail: eventCard.email,
    location: eventCard.location,
    category: eventCard.category,
    ticket_type: eventCard.collection?.category,
    date: new Date(eventCard.date).toUTCString().substring(0, 22),
  };
  const ticketData = {
    wallet_address: userInfo?.user.wallet_address,
    blockchain: 'Binance Smart Chain',
    eventcard: eventCard.id,
    collection: eventCard.collection?.id,
    price: eventCard ? getEventPrice(eventCard) * Number(amount) : 0,
    pay_order_id: 'credit card payment',
    count: amount.toString(),
    card_address: cardAddress,
  };

  const dataObject = {
    event: {
      id: eventCard?.id || '',
      name: eventCard?.name || '',
      price:
        country === 'TR'
          ? Number(eventCard.price) * rateTry * Number(amount)
          : country === 'GB'
          ? Number(eventCard.price) * rateGbp * Number(amount)
          : country === 'US'
          ? Number(eventCard.price) * rateUsd * Number(amount)
          : Number(eventCard.price) * Number(amount),
    },
    card: {
      cardHolderName: name || '',
      cardNumber: cardNumber.replace(/\s/g, '') || '',
      expireMonth: expDate?.split('/')[0] || '',
      expireYear: expDate?.split('/')[1] || '',
      cvc: CVC || 0,
    },
    currency: CURRENCY[country] || 'EUR',
    emailData,
    ticketData,
    buyerId: userInfo?.user?.id,
    other_website: 'other website',
  };
  useEffect(() => {
    setUserInfo(JSON.parse(_userInfo));
  }, [_userInfo]);
  return (
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
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.subTitle}>Name On Card</Text>
            <TextInput
              onFocus={() => setFocusedItem('name')}
              onBlur={() => setFocusedItem('')}
              style={
                focusedItem === 'name'
                  ? styles.inputOnFocus
                  : {
                      ...styles.input,
                      borderColor: !validationName
                        ? 'red'
                        : 'rgba(255, 255, 255, 0.33)',
                    }
              }
              value={name}
              placeholder="Enter cardholder's name"
              placeholderTextColor=" rgba(255, 255, 255, 0.33)"
              autoCapitalize="none"
              onChangeText={val => setName(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.subTitle}>Card Address</Text>
            <TextInput
              onFocus={() => setFocusedItem('address')}
              onBlur={() => setFocusedItem('')}
              style={
                focusedItem === 'address'
                  ? styles.inputOnFocus
                  : {
                      ...styles.input,
                      borderColor: !validationAddress
                        ? 'red'
                        : 'rgba(255, 255, 255, 0.33)',
                    }
              }
              value={cardAddress}
              placeholder="Input card address"
              placeholderTextColor=" rgba(255, 255, 255, 0.33)"
              autoCapitalize="none"
              onChangeText={val => setCardAddress(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.subTitle}>Card Number</Text>
            <TextInput
              onFocus={() => setFocusedItem('number')}
              onBlur={() => setFocusedItem('')}
              style={
                focusedItem === 'number'
                  ? styles.inputOnFocus
                  : {
                      ...styles.input,
                      borderColor: !validationNumber
                        ? 'red'
                        : 'rgba(255, 255, 255, 0.33)',
                    }
              }
              value={cardNumber}
              placeholder="0000 0000 0000 0000"
              placeholderTextColor=" rgba(255, 255, 255, 0.33)"
              autoCapitalize="none"
              autoCompleteType="tel"
              keyboardType="numeric"
              onChangeText={val => setCardNum(val)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{...styles.inputContainer, width: '46%'}}>
              <Text style={styles.subTitle}>Expiration Date</Text>
              <TextInput
                onFocus={() => setFocusedItem('expiration')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'expiration'
                    ? styles.inputOnFocus
                    : {
                        ...styles.input,
                        borderColor: !validationDate
                          ? 'red'
                          : 'rgba(255, 255, 255, 0.33)',
                      }
                }
                value={expDate}
                maxLength={5}
                placeholder="MM/YY"
                placeholderTextColor=" rgba(255, 255, 255, 0.33)"
                autoCapitalize="none"
                onChangeText={val => setExpectionDate(val)}
              />
            </View>
            <View style={{...styles.inputContainer, width: '46%'}}>
              <Text style={styles.subTitle}>CVC/CVV</Text>
              <TextInput
                onFocus={() => setFocusedItem('cvv')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'cvv'
                    ? styles.inputOnFocus
                    : {
                        ...styles.input,
                        borderColor: !validationCVC
                          ? 'red'
                          : 'rgba(255, 255, 255, 0.33)',
                      }
                }
                value={CVC}
                maxLength={3}
                placeholder="000"
                placeholderTextColor=" rgba(255, 255, 255, 0.33)"
                autoCapitalize="none"
                onChangeText={val => setCVC(val)}
              />
            </View>
          </View>
          <Text
            style={{
              color: 'red',
              fontSize: 14,
              fontWeight: '400',
              textAlign: 'center',
              marginVertical: 10,
              letterSpacing: 1.25,
            }}>
            Please do not close this window until the payment process is
            completed
          </Text>
        </View>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => buyWithParam()}>
          <Text style={styles.text3}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
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
  subTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginVertical: 5,
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
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.33)',
    padding: 8,
    paddingLeft: 20,
    color: 'white',
    borderRadius: 4,
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 18,
    fontWeight: '500',
  },
  inputOnFocus: {
    shadowColor: '#6a4dfd',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderColor: '#6a4dfd',
    width: '100%',
    height: 44,
    borderWidth: 1,
    padding: 8,
    paddingLeft: 20,
    color: 'white',
    borderRadius: 4,
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 18,
    fontWeight: '500',
  },
});
export default ParamModal;
