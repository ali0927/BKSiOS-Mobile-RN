import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import {ethers} from 'ethers';
import React, {useEffect, useState} from 'react';
import Countdown from 'react-countdown';
import DateObject from 'react-date-object';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useSelector} from 'react-redux';
import bitkeepImg from '../../assets/img/bitkeep.png';
import creditImg from '../../assets/img/credit-card.png';
import clockImg from '../../assets/img/icons/clock.png';
import likeImg from '../../assets/img/icons/like-empty.png';
import likeBlueImg from '../../assets/img/icons/like-fill.png';
import mapImg from '../../assets/img/icons/map.png';
import badgeMark from '../../assets/img/icons/verified.png';
import bksImg from '../../assets/img/logo-without-text.png';
import metamaskImg from '../../assets/img/metamask-white.png';
import Currency from '../components/currency/Currency';
import CurrencySymbol from '../components/currency/CurrencySymbol';
import {AddonModal} from '../components/modals/addonModal';
import ParamModal from '../components/modals/prams';
import config from '../helper/config';
import {
  buyTicket,
  getBuyState,
  getCollectionById,
  getEventCardById,
  getEventPrice,
  getLatestEventCards,
  updateEventLike,
} from '../helper/event';
import {getLikesNumber} from '../utils';
import {
  BUSDPayment_testnet,
  BUSDPayment_TEST_ABI,
  BUSD_MAIN_ABI,
  BUSD_TEST_ABI,
} from '../utils/payment_contract';

export const EventDetailsScreen = ({route}) => {
  const [userInfo, setUserInfo] = useState();
  const _userInfo = useSelector(state => state.userInfoReducer).userInfo;
  const country = useSelector(state => state.locationInfoReducer).locationInfo;

  const id = route.params.item.id;
  const tempData = route.params.item;

  const navigation = useNavigation();
  const {t} = useTranslation();

  const [isSold, setSold] = useState(false);
  const [addons, setAddons] = useState([]);
  const [addonPrice, setAddonPrice] = useState(0);
  const [collectionName, setCollectionName] = useState();
  const [latestEvents, setLatestEvents] = useState([]);
  const [isAddonModalVisible, setAddonModalVisible] = useState(false);
  const [selectedAddon, setSelectedAddon] = useState();
  const [payModalVisible, setPayModalVisible] = useState(false);
  const [mapModalVisible, setMapModalVisible] = useState(true);
  const [eventCard, setEventCard] = useState(false);
  const [ticketAmount, setTicketAmount] = useState(1);
  const [wallet, setWallet] = useState('');
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [collectionPicture, setCollectionPicture] = useState('');
  // Credit card

  const toggleModal = () => {
    setPayModalVisible(!payModalVisible);
  };

  const toggleAddonModal = item => {
    setSelectedAddon(item);
    setAddonModalVisible(!isAddonModalVisible);
  };

  const CompletionList = () => (
    <Text style={styles.text1}>{t('event started')}</Text>
  );

  const pad = (num, size = 2) => {
    const s = '000000000' + num;
    return s.substr(s.length - size);
  };

  const renderer = ({days, hours, minutes, seconds, completed}) => {
    if (completed) {
      return <CompletionList />;
    } else {
      return (
        <Text style={styles.text1}>
          {days} days {pad(hours)}h {pad(minutes)}m {pad(seconds)}s
        </Text>
      );
    }
  };

  const EventCountDown = ({date}) => {
    const d = new Date(date);
    return <Countdown date={d} renderer={renderer} />;
  };

  const handleBuyTicket = (orderid, _wallet, _chain) => {
    const param = {
      wallet_address: _wallet,
      blockchain: _chain,
      eventcard: eventCard.id,
      collection: eventCard.collection.id,
      price: getEventPrice(eventCard) * Number(ticketAmount),
      pay_order_id: orderid,
      count: ticketAmount.toString(),
      buyerId: userInfo?.user.id,
      other_website: 'other_website',
    };

    console.log('Param: ', param);
    buyTicket(param)
      .then(res => {
        if (res.success) {
          Toast.show({
            type: 'success',
            text1: 'You bought the ticket!',
          });
          setPayModalVisible(false);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Failed!',
          });
          setPayModalVisible(false);
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Failed!',
        });
        setPayModalVisible(false);
      });
  };

  const getEurRate = async () => {
    const data = await axios.get(
      'https://api.coingecko.com/api/v3/coins/ethereum',
    );
    const price = data.data.market_data.current_price;
    return price.usd / price.eur;
  };

  const buyInBUSD = async provide => {
    // console.log("account", account, chainId);
    const provider = new ethers.providers.Web3Provider(provide);
    const chainId = Number(provider.provider.chainId);
    // console.log('ChainId', chainId);
    if (chainId !== 56 && chainId !== 97) {
      Toast.show({
        type: 'error',
        text1: 'Please change the network',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please wait ... It might takes some time',
      });
      try {
        const account = await provider.getSigner().getAddress();
        const BUSD = new ethers.Contract(
          chainId === 97
            ? '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee'
            : '0xe9e7cea3dedca5984780bafc599bd69add087d56',
          chainId === 97 ? BUSD_TEST_ABI : BUSD_MAIN_ABI,
          provider.getSigner(),
        );
        const contract = new ethers.Contract(
          chainId === 97
            ? BUSDPayment_testnet
            : '0xe9e7cea3dedca5984780bafc599bd69add087d56',
          chainId === 97 ? BUSDPayment_TEST_ABI : BUSD_MAIN_ABI,
          provider.getSigner(),
        );
        const rate = await getEurRate();
        const price = getEventPrice(eventCard) * ticketAmount * rate;
        const ETH = ethers.BigNumber.from('1000000000000000000');
        const totalWei = await BUSD.balanceOf(account);
        const totalBUSD =
          ethers.BigNumber.from(totalWei)
            .mul(ethers.BigNumber.from(100))
            .div(ETH)
            .toNumber() / 100;
        if (totalBUSD < price) {
          Toast.show({
            type: 'error',
            text1: 'You have not enough BUSD in your wallet',
          });
        } else {
          const amount = ethers.BigNumber.from(Math.floor(price * 100))
            .mul(ETH)
            .div(ethers.BigNumber.from(100));
          let txn = await BUSD.approve(BUSDPayment_testnet, amount);
          await txn.wait();
          const payees =
            eventCard.payees === ''
              ? []
              : JSON.parse(eventCard.payees).map(item => item.wallet);
          const fees =
            eventCard.payees === ''
              ? []
              : JSON.parse(eventCard.payees).map(item => Number(item.fee));
          let totalFee = 100;
          for (let i = 0; i < fees.length; i++) {
            totalFee -= fees[i];
          }
          payees.push(eventCard.owner_wallet);
          fees.push(totalFee);
          // console.log(payees, fees);
          txn = await contract.payWithBUSD(account, amount, payees, fees);
          await txn.wait();
          handleBuyTicket(txn.hash, wallet, 'Binance Smart Chain');
        }
      } catch (err) {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: err.message,
        });
      }
    }
  };

  const buyWithBUSD = async _provide => {
    let provide = null;
    if (_provide === 'Bitkeep' && window.isBitKeep) {
      provide = window.bitkeep.ethereum;
    } else if (_provide === 'Metamask' && window.ethereum) {
      provide = window.ethereum;
    }

    if (provide === null) {
      Toast.show({
        type: 'error',
        text1: 'You need to install ' + _provide,
      });
      return;
    }

    const accounts = await provide.request({method: 'eth_accounts'});
    if (accounts.length === 0) {
      await provide.request({method: 'eth_requestAccounts'});
    }
    buyInBUSD(provide);
  };

  const butWithBKSWallet = () => {
    let totalBUSD = eventCard.price * ticketAmount;

    let urlStr = config.WALLET_SITE_URL + '/login-buyticket?';
    urlStr = urlStr + 'name=' + eventCard.name;
    urlStr = urlStr + '&description=' + eventCard.description;
    urlStr = urlStr + '&creator=' + eventCard.creator.name;
    urlStr = urlStr + '&location=' + eventCard.location;
    urlStr = urlStr + '&wallet_address=' + eventCard.owner_wallet;
    urlStr = urlStr + '&price=' + eventCard.price;
    urlStr = urlStr + '&buy_amount=' + ticketAmount;
    urlStr = urlStr + '&total_price=' + totalBUSD;

    console.log('URLSTR', urlStr);
    return urlStr;
  };
  const dateString = d => {
    var date = new DateObject({
      date: new Date(d),
    });
    return date.format('DD. MM. YYYY');
  };
  const timeString = t => {
    var date = new Date(t);
    return (
      twoStrings(date.getUTCHours()) +
      ' : ' +
      twoStrings(date.getUTCMinutes()) +
      ' GMT'
    );
  };

  const twoStrings = str => {
    if (str.toString().length == 2) {
      return str;
    } else {
      return '0' + str;
    }
  };

  const onClickLike = () => {
    if (!userInfo) return;
    let likes = [];
    try {
      likes = JSON.parse(tempData.likes_number);
    } catch (err) {
      likes = [];
      console.log(err);
    }
    if (typeof likes !== 'object' || likes === null) likes = [];
    const userId = userInfo?.user?.id;
    if (likes.includes(userId)) {
      const index = likes.indexOf(userId);
      likes.splice(index, 1);
    } else {
      likes.push(userId);
    }
    updateEventLike({
      id: tempData.id,
      likes_number: JSON.stringify(likes),
    }).then(res => {
      if (res.success) {
        const _eventCards = [...latestEvents];
        tempData.likes_number = JSON.stringify(likes);
        setLatestEvents(_eventCards);
      }
    });
  };

  const onClickBuyTicket = () => {
    const now = new Date().getTime() / 1000;
    const startTime = new Date(tempData.date).getTime() / 1000;

    if (
      (now > startTime || (startTime > now && startTime - now < 7200)) &&
      (tempData.category === 'Category1' || tempData.category === 'Category3')
    ) {
      Toast.show({
        type: 'error',
        text1: 'You can buy tickets before 2 hours past event started.',
      });
      return;
    }

    if (userInfo) {
      if (tempData.total_tickets <= tempData.buy_count) {
        Toast.show({
          type: 'error',
          text1: 'Already sold full amount of tickets',
        });
        return;
      } else if (
        tempData.buy_count + Number(ticketAmount) >
        tempData.total_tickets
      ) {
        Toast.show({
          type: 'error',
          text1: `Only ${
            tempData.total_tickets - tempData.buy_count
          } tickets are left`,
        });
        return;
      }
      toggleModal();
      return;
    } else {
      navigation.navigate('SignIn');
    }
  };

  const buyWithParam = () => {
    console.log('CREDIT');
  };
  useEffect(() => {
    setWallet(userInfo?.user.wallet_address);
    // setCurrentEvent(eventData.find(item => id === item.id));

    getEventCardById(id).then(res => {
      if (res.success) {
        setEventCard(res.eventcard);
        if (res.eventcard.total_tickets === res.eventcard.buy_count) {
          setSold(true);
        }
        const _addons =
          res.eventcard.addons === '' ? [] : JSON.parse(res.eventcard.addons);
        setAddons(_addons);

        let _addonPrice = 0;
        _addons.forEach(addon => {
          _addonPrice += Number(addon.price);
        });
        setAddonPrice(_addonPrice);
        // console.log('Before setting colle.name', res.eventcard.collection);
        setCollectionPicture(res.eventcard.collection.picture_small);
        setCollectionName(res.eventcard.collection.name);
        getCollectionById(res.eventcard.collection).then(res => {
          if (res.success) {
            setCollectionName(res.collection.name);
          }
        });
      }
    });

    getLatestEventCards().then(res => {
      if (res.success) {
        setLatestEvents(res.eventcards);
      }
    });

    getBuyState(id)
      .then(res => {
        if (res.success) {
          console.log('Already bought');
          // setSold(true);
        } else {
          console.log('You can buy');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [id, userInfo]);

  useEffect(() => {
    setUserInfo(JSON.parse(_userInfo));
  }, [_userInfo]);
  return (
    <ScrollView style={styles.container}>
      {tempData && (
        <View>
          <Image
            source={{
              uri:
                config.API_BASE_URL +
                '/api/upload/get_file?path=' +
                tempData.picture_large,
            }}
            style={styles.eventImg}
            resizeMode="stretch"
          />
          <View style={styles.flexRow}>
            <Text style={styles.name}>{tempData.name}</Text>
            <View style={styles.rowCenter}>
              <TouchableOpacity onPress={() => onClickLike()}>
                <Image
                  source={
                    userInfo &&
                    tempData.likes_number &&
                    tempData.likes_number.includes(userInfo?.user?.id)
                      ? likeBlueImg
                      : likeImg
                  }
                  style={styles.likedImg}
                />
              </TouchableOpacity>
              <Text style={styles.followers}>{getLikesNumber(tempData)}</Text>
            </View>
          </View>
          <Text style={styles.description}>{tempData.venue_description}</Text>

          <View style={styles.infoContainer}>
            <View style={styles.halfWidth}>
              <Text style={styles.text2}>{t('creator')}</Text>
              <View style={styles.rowCenter}>
                <Text style={styles.infoText}>{tempData.creator.name}</Text>
                <Image source={badgeMark} style={styles.badgeMark} />
              </View>
            </View>
            <View>
              <Text style={styles.text2}>{t('location')}</Text>
              <Text style={styles.infoText}>{tempData.location}</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.halfWidth}>
              <Text style={styles.text2}>{t('date')}</Text>
              <Text style={styles.infoText}>{dateString(tempData.date)}</Text>
            </View>
            <View>
              <Text style={styles.text2}>{t('time')}</Text>
              <Text style={styles.infoText}>
                {timeString(new Date(tempData.date))}
              </Text>
              <Text style={styles.infoText}></Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoContainer}>
            <View style={styles.halfWidth}>
              <Text style={styles.text2}>{t('collection')}</Text>
              <View style={styles.rowCenter}>
                <Image
                  source={{
                    uri:
                      config.API_BASE_URL +
                      '/api/upload/get_file?path=' +
                      collectionPicture,
                  }}
                  style={styles.avatarImg}
                />
                <Text style={{...styles.infoText, width: '80%'}}>
                  {collectionName}
                </Text>
              </View>
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.text2}>{t('addons')}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%',
                }}>
                {addons.map((addon, i) => (
                  <TouchableOpacity
                    onPress={() => toggleAddonModal(addon)}
                    key={'addon' + i}>
                    <Image
                      source={{uri: config.SITE_URL + addon.icon}}
                      style={{
                        width: 32,
                        height: 32,
                        borderWidth: 2,
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 16,
                        marginRight: 12,
                        marginBottom: 10,
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          {eventCard.picture_floormap !== null && (
            <>
              <View style={styles.divider} />
              <View style={styles.infoContainer}>
                <View style={{...styles.rowCenter, ...styles.halfWidth}}>
                  <Image
                    source={mapImg}
                    style={{width: 18, height: 18, marginRight: 10}}
                  />
                  <Text style={{...styles.text2, marginBottom: 0}}>
                    {t('floor plan')}
                  </Text>
                </View>
                <View style={styles.halfWidth}>
                  <TouchableOpacity
                    onPress={() => setMapModalVisible(true)}
                    style={{
                      borderColor: '#555',
                      borderWidth: 2,
                      padding: 5,
                      borderRadius: 8,
                    }}>
                    <Text style={styles.text3}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
          <AddonModal
            addon={selectedAddon}
            modalVisible={isAddonModalVisible}
            setModalVisible={setAddonModalVisible}
          />
          <View style={styles.divider} />
          <View style={styles.eventCounter}>
            <View style={styles.rowCenter}>
              <Image source={clockImg} />
              <Text style={styles.evStartTxt}>{t('event starts in')}</Text>
            </View>
            <View style={styles.counterContainer}>
              <EventCountDown date={new Date(tempData.date).toISOString()} />
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.flexRow}>
            <Text style={styles.remainTickets}>
              {tempData.total_tickets - tempData.buy_count}{' '}
              {t('ticket(s) left')}
            </Text>
            <Text style={styles.priceText}>
              <Currency price={tempData.price} /> <CurrencySymbol />
            </Text>
          </View>
          <View style={styles.divider} />

          {tempData.total_tickets - tempData.buy_count === 0 ? (
            <View style={styles.buyContainer}>
              <View style={styles.rowCenter}>
                <Text style={styles.counterLeftControl}>-</Text>
                <Text style={styles.counterText}>{ticketAmount}</Text>
                <Text style={styles.counterRightControl}>+</Text>
              </View>
              <View style={styles.soldButton}>
                <Text style={{...styles.text3, width: '100%'}}>
                  {t('sold out')}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.buyContainer}>
              <View style={styles.rowCenter}>
                <Text
                  style={styles.counterLeftControl}
                  onPress={() => {
                    if (ticketAmount < 1) {
                      return;
                    }
                    setTicketAmount(ticketAmount - 1);
                  }}>
                  -
                </Text>
                <Text style={styles.counterText}>{ticketAmount}</Text>
                <Text
                  style={styles.counterRightControl}
                  onPress={() => {
                    if (
                      ticketAmount ===
                      tempData.total_tickets - tempData.buy_count
                    ) {
                      return;
                    }
                    setTicketAmount(ticketAmount + 1);
                  }}>
                  +
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => onClickBuyTicket()}>
                <Text style={{...styles.text3, width: '100%'}}>
                  {t('buy ticket')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <Modal
            isVisible={mapModalVisible}
            onBackdropPress={() => setMapModalVisible(false)}>
            <View style={styles.modalContainer}>
              {/* <View style={styles.modalTitleContainer}>
                <TouchableOpacity onPress={() => setMapModalVisible(false)}>
                  <Text style={styles.modalClose}>&times;</Text>
                </TouchableOpacity>
              </View> */}
              <Image
                source={{
                  uri:
                    config.API_BASE_URL +
                    '/api/upload/get_file?path=' +
                    eventCard.picture_floormap,
                }}
              />
            </View>
          </Modal>

          <Modal
            isVisible={payModalVisible}
            onBackdropPress={() => setPayModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>Proceed to Pay</Text>
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={styles.modalClose}>&times;</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => {
                  setShowCreditModal(true);
                  setPayModalVisible(false);
                }}>
                <Image
                  source={creditImg}
                  style={{width: 30, marginRight: 10}}
                />
                <Text style={styles.text3}>Credit Card</Text>
              </TouchableOpacity>
              {country !== 'TR' && (
                <>
                  <Text style={styles.text4}>OR pay with BUSD</Text>
                  <TouchableOpacity
                    style={styles.payWallet}
                    onPress={() => Linking.openURL(butWithBKSWallet())}>
                    <Image
                      source={bksImg}
                      resizeMode="contain"
                      style={{height: 30, width: 30, marginRight: 10}}
                    />
                    <Text style={styles.text3}>BKS wallet</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.payWallet}
                    // onPress={() => Linking.openURL(butWithBKSWallet())}>
                    onPress={() =>
                      Linking.openURL(
                        'https://metamask.app.link/send/0x5247D66a62b3349e97b80E6bf7A3E4Bb0123ccA1@56?value=1e19',
                      )
                    }>
                    <Image source={metamaskImg} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.payWallet}
                    onPress={() =>
                      Linking.openURL(
                        'https://link.trustwallet.com/send?asset=c714_tBUSD-BD1&address=0x4fabb145d64652a948d72533023f6e7a623c7c53&amount=1.4',
                      )
                    }>
                    <Image
                      source={bitkeepImg}
                      resizeMode="contain"
                      style={{height: 35, width: 150}}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </Modal>
          <ParamModal
            eventCard={eventCard}
            showCreditModal={showCreditModal}
            setShowCreditModal={setShowCreditModal}
            amount={ticketAmount}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
    // overflow: 'hidden',
    padding: 20,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgContainer: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#887bff',
    padding: 15,
    borderRadius: 16,
    overflow: 'hidden',
  },
  eventImg: {
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 20,
  },
  name: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 24,
    lineHeight: 24,
    color: '#fff',
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
  },
  likedImg: {
    marginRight: 10,
  },
  followers: {
    fontFamily: 'SpaceGrotesk-Medium',
    textAlign: 'right',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.66)',
    fontWeight: '400',
  },
  halfWidth: {
    width: '50%',
  },
  text2: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  remainTickets: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  evStartTxt: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 0,
    marginLeft: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  infoText: {
    fontFamily: 'SpaceGrotesk-Medium',
    textAlign: 'left',
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    letterSpacing: 0.5,
    marginRight: 10,
  },
  priceText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    letterSpacing: 1,
  },
  eventCounter: {
    alignItems: 'center',
    marginBottom: 30,
  },
  text1: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  counterContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 220,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#6a4dfd',
    height: 40,
  },
  counterText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    paddingVertical: 11.5,
    paddingHorizontal: 14,
  },
  counterRightControl: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderLeftWidth: 0,
    paddingVertical: 11.5,
    width: 35,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  counterLeftControl: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderRightWidth: 0,
    paddingVertical: 11.5,
    width: 35,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  description: {
    fontFamily: 'SpaceGrotesk-Medium',
    textAlign: 'left',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.66)',
    fontWeight: '400',
    marginBottom: 30,
    marginTop: 10,
  },
  divider: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    height: 1,
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buyContainer: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  badgeMark: {
    backgroundColor: '#2f80ed',
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
    width: 16,
    height: 16,
  },
  avatarImg: {
    position: 'relative',
    width: 32,
    height: 32,
    borderColor: '#6164ff',
    marginRight: 10,
    borderRadius: 16,
  },
  text3: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    fontFamily: 'SpaceGrotesk-Medium',
  },
  text4: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    letterSpacing: 1.6,
  },
  button: {
    flex: 1,
    paddingTop: 12,
    textAlignVertical: 'center',
    height: 44,
    backgroundColor: '#6a4dfd',
    borderRadius: 4,
    marginLeft: 20,
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
    fontWeight: '700',
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '79%',
  },
  subTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    textAlign: 'justify',
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 5,
  },

  modalClose: {
    color: '#fff',
    width: 25,
    margin: 0,
    textAlign: 'center',
    fontSize: 26,
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    textAlignVertical: 'center',
    height: 44,
    backgroundColor: '#6a4dfd',
    borderRadius: 4,
    width: '100%',
  },
  payWallet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    textAlignVertical: 'center',
    height: 44,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 4,
    width: '100%',
    marginBottom: 15,
  },
  soldButton: {
    flex: 1,
    paddingTop: 12,
    textAlignVertical: 'center',
    height: 44,
    backgroundColor: '#6a4dfd44',
    borderRadius: 4,
    marginLeft: 20,
  },
  paypalStyle: {
    layout: 'horizontal',
    tagline: false,
    label: 'pay',
  },
  webViewCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'green',
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },
  paypalHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00457C',
  },
});
