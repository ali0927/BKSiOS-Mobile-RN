import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {eventData} from '../constant/eventData';
import clockImg from '../../assets/img/icons/clock.png';
import addonsImg from '../../assets/img/avatars/avatar5.jpg';
import badgeMark from '../../assets/img/icons/verified.png';
import {
  getEventCardById,
  getCollectionById,
  getLatestEventCards,
  getBuyState,
  updateEventLike,
} from '../helper/event';
import Countdown from 'react-countdown';
import likeImg from '../../assets/img/icons/like-empty.png';
import likeBlueImg from '../../assets/img/icons/like-fill.png';
import config from '../helper/config';
import {PayPalButtons, PayPalScriptProvider} from '@paypal/react-paypal-js';
import {getEventPrice} from '../helper/event';
import {buyTicket} from '../helper/event';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import metamaskImg from '../../assets/img/metamask.png';
import bitkeepImg from '../../assets/img/bitkeep.png';
import paypalImg from '../../assets/img/paypal-color.png';
import DateObject from 'react-date-object';
import {ethers} from 'ethers';
import {
  BUSD_TEST_ABI,
  BUSD_MAIN_ABI,
  BUSDPayment_TEST_ABI,
  BUSDPayment_testnet,
} from '../utils/payment_contract';
import {useSelector, useDispatch} from 'react-redux';
import {WebView} from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import {getLikesNumber} from '../utils';

export const EventDetailsScreen = ({route}) => {
  const [userInfo, setUserInfo] = useState();
  const _userInfo = useSelector(state => state.userInfoReducer).userInfo;

  const id = route.params.item.id;
  const tempData = route.params.item;
  const [isSold, setSold] = useState(false);
  const [addons, setAddons] = useState([]);
  const [addonPrice, setAddonPrice] = useState(0);
  const [collectionName, setCollectionName] = useState();
  const [latestEvents, setLatestEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isAddonModalVisible, setAddonModalVisible] = useState(false);
  const [selectedAddon, setSelectedAddon] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventCard, setEventCard] = useState(false);
  const [ticketAmount, setTicketAmount] = useState(1);
  const [wallet, setWallet] = useState('');
  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState('#000');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleAddonModal = item => {
    setSelectedAddon(item);
    setAddonModalVisible(!isAddonModalVisible);
  };

  const CompletionList = () => <Text style={styles.text1}>Event Started</Text>;

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

  const gotoPaypal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setShowGateway(true);
    }, 500);
  };
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: getEventPrice(eventCard) * ticketAmount,
            currency_code: 'EUR',
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    const orderid = data.orderID;
    handleBuyTicket(orderid, 'paypal', 'Paypal');
  };

  const handleBuyTicket = (orderid, _wallet, _chain) => {
    const param = {
      wallet_address: _wallet,
      blockchain: _chain,
      eventcard: eventCard.id,
      price: getEventPrice(eventCard),
      pay_order_id: orderid,
      count: ticketAmount.toString(),
    };
    buyTicket(param)
      .then(res => {
        if (res.success) {
          Toast.show({
            type: 'success',
            text1: 'You bought the ticket!',
          });
          setModalVisible(false);
          // handleBought();
        } else {
          Toast.show({
            type: 'error',
            text1: 'Failed!',
          });
          setModalVisible(false);
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Failed!',
        });
        setModalVisible(false);
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
        // console.log('Provider', provider);
        const account = await provider.getSigner().getAddress();
        // console.log('Provider Account', account);
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
        // console.log(price);
        const ETH = ethers.BigNumber.from('1000000000000000000');
        const totalWei = await BUSD.balanceOf(account);
        const totalBUSD =
          ethers.BigNumber.from(totalWei)
            .mul(ethers.BigNumber.from(100))
            .div(ETH)
            .toNumber() / 100;
        // console.log('Total Amount', totalBUSD);
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
          // console.log(txn.hash);
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
    // console.log('Buy with BUSD');
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
    // console.log('Accounts', accounts);
    if (accounts.length === 0) {
      await provide.request({method: 'eth_requestAccounts'});
    }
    buyInBUSD(provide);
  };

  const PaypalContent = `
    <p>This is Paypal Button Content</p>
    <div>
      <p>Buttons</p>
    </div>
    <PayPalScriptProvider
      options={{
        'client-id':
          'AffFVjpeVWCzGzYRB3hs1btcwdt1R0adzgVROBak5Fn0hClbBVFea-DznT-WXjcH1h1qjrkqKvPQ6ia-',
        currency: 'EUR',
      }}>
      <div>
        <PayPalButtons
          style={styles.paypalStyle}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </div>
    </PayPalScriptProvider>
    `;

  const _onApprove = async (data, actions) => {
    let order = await actions.order.capture();
    // console.log('Payment Order', order);
    window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage(JSON.stringify(order));
    return order;
  };

  const _onError = err => {
    console.log('Payment Error', err);
    let errObj = {
      err: err,
      status: 'FAILED',
    };
    window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage(JSON.stringify(errObj));
  };
  const onMessage = e => {
    let data = e.nativeEvent.data;
    setShowGateway(false);
    console.log('OnMessage Func', data);
  };
  const dateString = d => {
    var date = new DateObject({
      date: new Date(d),
    });
    return date.format('DD. MM. YYYY');
  };
  const timeString = t => {
    var date = new Date(t);
    return twoStrings(date.getUTCHours()) + ' : ' + twoStrings(date.getUTCMinutes()) + ' GMT';
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

  useEffect(() => {
    setWallet(userInfo?.wallet_address);
    setCurrentEvent(eventData.find(item => id === item.id));

    getEventCardById(id).then(res => {
      // console.log('EventCardById', res);
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
              <Text style={styles.text2}>Creator</Text>
              <View style={styles.rowCenter}>
                <Text style={styles.infoText}>{tempData.creator.name}</Text>
                <Image source={badgeMark} style={styles.badgeMark} />
              </View>
            </View>
            <View>
              <Text style={styles.text2}>Location</Text>
              <Text style={styles.infoText}>{tempData.location}</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.halfWidth}>
              <Text style={styles.text2}>Date</Text>
              <Text style={styles.infoText}>
                {/* {new Date(tempData.date).toISOString().toString().split('T')[0]} */}
                {dateString(tempData.date)}
              </Text>
            </View>
            <View>
              <Text style={styles.text2}>Time</Text>
              <Text style={styles.infoText}>
                {timeString(new Date(tempData.date))}
                {/* {new Date(tempData.date).toISOString().toString().split('T')[1]} */}
              </Text>
              <Text style={styles.infoText}></Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoContainer}>
            <View style={styles.halfWidth}>
              <Text style={styles.text2}>Collection</Text>
              <View style={styles.rowCenter}>
                <Image source={addonsImg} style={styles.avatarImg} />
                <Text style={styles.infoText}>{collectionName}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.text2}>Addons</Text>
              {addons &&
                addons.map(item => {
                  let addonImg;
                  switch (item.icon) {
                    case '/img/avatars/avatar.jpg':
                      addonImg = require('../../assets/img/avatars/avatar.jpg');
                      break;
                    case '/img/avatars/avatar1.jpg':
                      addonImg = require('../../assets/img/avatars/avatar2.jpg');
                      break;
                    case '/img/avatars/avatar2.jpg':
                      addonImg = require('../../assets/img/avatars/avatar2.jpg');
                      break;
                    case '/img/avatars/avatar3.jpg':
                      addonImg = require('../../assets/img/avatars/avatar3.jpg');
                      break;
                    case '/img/avatars/avatar4.jpg':
                      addonImg = require('../../assets/img/avatars/avatar4.jpg');
                      break;
                    case '/img/avatars/avatar5.jpg':
                      addonImg = require('../../assets/img/avatars/avatar5.jpg');
                      break;
                    case '/img/avatars/avatar6.jpg':
                      addonImg = require('../../assets/img/avatars/avatar6.jpg');
                      break;
                    case '/img/avatars/avatar7.jpg':
                      addonImg = require('../../assets/img/avatars/avatar7.jpg');
                  }
                  return (
                    <TouchableOpacity onPress={() => toggleAddonModal(item)}>
                      <Image source={addonImg} style={styles.avatarImg} />
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
          <Modal
            isVisible={isAddonModalVisible}
            onBackdropPress={() => setAddonModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalTitleContainer}>
                <View>
                  <View style={styles.modalRow}>
                    <Text style={styles.text3}>A D D O N</Text>
                    <TouchableOpacity
                      onPress={toggleAddonModal}
                      style={{marginTop: -5}}>
                      <Text style={styles.modalClose}>&times;</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalSubtitle}>Name :</Text>
                    <Text style={styles.modalTxt}>{selectedAddon?.name}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalSubtitle}>Description :</Text>
                    <Text style={styles.modalTxt}>
                      {selectedAddon?.description}
                    </Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalSubtitle}>Price :</Text>
                    <Text style={styles.modalTxt}>
                      {selectedAddon?.price + ' €'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.divider} />
          <View style={styles.eventCounter}>
            <View style={styles.rowCenter}>
              <Image source={clockImg} />
              <Text style={styles.evStartTxt}>Event starts in</Text>
            </View>
            <View style={styles.counterContainer}>
              <EventCountDown date={new Date(tempData.date).toISOString()} />
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.flexRow}>
            <Text style={styles.remainTickets}>
              {tempData.total_tickets - tempData.buy_count} tickets left
            </Text>
            <Text style={styles.priceText}>{tempData.price} €</Text>
          </View>
          <View style={styles.divider} />
          {showGateway ? (
            <Modal
              isVisible={showGateway}
              onBackdropPress={() => setShowGateway(false)}>
              <View style={styles.webViewCon}>
                <View style={styles.wbHead}>
                  <TouchableOpacity
                    style={{padding: 13}}
                    onPress={() => setShowGateway(false)}>
                    <Feather name={'x'} size={24} />
                  </TouchableOpacity>
                  <Text style={styles.paypalHeader}>Pay with PayPal</Text>
                  <View style={{padding: 13, opacity: prog ? 1 : 0}}>
                    <ActivityIndicator size={24} color={progClr} />
                  </View>
                </View>
                <WebView
                  source={{
                    uri:
                      'https://my-paypal.netlify.app/' +
                      getEventPrice(eventCard) * ticketAmount,
                  }}
                  onLoadStart={() => {
                    setProg(true);
                    setProgClr('#000');
                  }}
                  onLoadProgress={() => {
                    setProg(true);
                    setProgClr('#00457c');
                  }}
                  onLoadEnd={() => {
                    setProg(false);
                  }}
                  onLoad={() => {
                    setProg(false);
                  }}
                  style={{flex: 1}}
                  onMessage={onMessage}
                />
              </View>
            </Modal>
          ) : null}
          {tempData.total_tickets - tempData.buy_count === 0 ? (
            <View style={styles.buyContainer}>
              <View style={styles.rowCenter}>
                <Text style={styles.counterLeftControl}>-</Text>
                <Text style={styles.counterText}>{ticketAmount}</Text>
                <Text style={styles.counterRightControl}>+</Text>
              </View>
              <View style={styles.soldButton}>
                <Text style={styles.text3}>Sold out</Text>
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
                onPress={() => toggleModal()}>
                <Text style={styles.text3}>Buy Ticket</Text>
              </TouchableOpacity>
            </View>
          )}

          <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>Proceed to Pay</Text>
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={styles.modalClose}>&times;</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => gotoPaypal()}>
                <Image
                  source={paypalImg}
                  style={styles.metaImg}
                  resizeMode="contain"
                  height={30}
                />
              </TouchableOpacity>
              <Text style={styles.text4}>OR</Text>
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => buyWithBUSD('Metamask')}>
                <Image source={metamaskImg} style={styles.metaImg} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => buyWithBUSD('Bitkeep')}>
                <Image
                  source={bitkeepImg}
                  style={styles.metaImg}
                  resizeMode="contain"
                  height={100}
                />
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
    overflow: 'hidden',
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
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#534f77',
    padding: 8,
    paddingLeft: 20,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
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
  text4: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 15,
    marginBottom: -15,
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
    borderWidth: 0.5,
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
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '79%',
  },
  modalSubtitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    textAlign: 'justify',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
    width: 100,
  },
  modalTxt: {
    flex: 1,
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
    marginLeft: 20,
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
    marginTop: 30,
    paddingTop: 10,
    textAlignVertical: 'center',
    height: 44,
    backgroundColor: '#6a4dfd',
    borderRadius: 4,
    width: '100%',
  },
  metaImg: {
    marginTop: -10,
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
