import React, {useState, useEffect} from 'react';
import {
  View,
  Linking,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import ClockImg from '../../assets/img/icons/clock.svg';
import BadgeMark from '../../assets/img/icons/verified.svg';
import Metamask from '../../assets/img/icons/metamask-seeklogo.com.svg';
import Bitkeep from '../../assets/img/icons/bitkeep-seeklogo.com.svg';
import ReactTimeAgo from 'react-native-timeago';
import {updateUserTickets, userTickets} from '../helper/event';
import config from '../helper/config';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  binanceAddress,
  polygonAddress,
  myNFTABI,
  tokenURL_binance,
  tokenURL_polygon,
} from '../utils/nft_contract';
import {mintTicket} from '../helper/ticket';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {sendOnlyMail} from '../helper/message';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const ActivityCard = ({
  ticket,
  t,
  sendMail,
  setIsModalVisible,
  mintNFT,
  setIpfs,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardAvatar}>
        <FastImage
          source={{
            uri:
              config.API_BASE_URL +
              '/api/upload/get_file?path=' +
              ticket.eventcard?.picture_small,
          }}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={styles.cardTopDiv}>
          <Text style={styles.ticketName} numberOfLines={3}>
            {ticket.eventcard.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.quantityText}>QTY</Text>
            <Text style={styles.amount}>{ticket.count ? ticket.count : 0}</Text>
          </View>
        </View>
        {ticket.is_minted ? (
          <></>
        ) : (
          <View>
            <Text style={{...styles.byText, textTransform: 'none'}}>
              {t('collect your NFT here')}
            </Text>
            <TouchableOpacity
              onPress={() => mintNFT(ticket, 'Metamask')}
              style={styles.resendButton}>
              <Metamask height={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => mintNFT(ticket, 'Bitkeep')}
              style={styles.resendButton}>
              <Bitkeep height={60} width={200} />
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.byText}>Created by</Text>
        <Text style={styles.byNameText}>{ticket.eventcard.creator.name}</Text>
        <Text style={styles.byText}>Purchased by</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.byNameText}>{ticket.buyer.name}</Text>
          <Text style={styles.byNameText}>{ticket.buyer.email}</Text>
          <BadgeMark />
        </View>
        {ticket.is_minted ? (
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.byText}>TokenId: </Text>
              <Text style={{...styles.byNameText, marginTop: 5}}>
                {ticket.tokenURL?.substring(
                  ticket?.tokenURL.search('a=') + 2,
                  ticket.tokenURL.length,
                )}
              </Text>
            </View>
            <Text style={styles.byText}>Address: </Text>
            <Text style={styles.byNameText}>{ticket.nft_address}</Text>
            <Text style={{...styles.byText, textTransform: 'none'}}>
              {t('activity click.click here')}
            </Text>
            <TouchableOpacity
              style={styles.payWallet}
              onPress={() => Linking.openURL(ticket.tokenURL)}>
              <Text style={{...styles.byNameText, color: '#0056b3'}}>
                {t('activity click.BSC NFT')}
              </Text>
            </TouchableOpacity>
            <Text style={{...styles.byText, textTransform: 'none'}}>
              {t('activity click.click here')}
            </Text>
            <TouchableOpacity
              style={styles.payWallet}
              onPress={() => {
                setIpfs(ticket.ipfsURL);
                setIsModalVisible(true);
              }}>
              <Text style={{...styles.byNameText, color: '#0056b3'}}>
                {t('activity click.IPFS')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
        <TouchableOpacity
          onPress={() => sendMail(ticket)}
          style={styles.resendButton}>
          <Text style={styles.byNameText}>Resend email</Text>
        </TouchableOpacity>
        <View style={styles.timeDiv}>
          <ClockImg />
          <Text style={styles.timeText}>
            <ReactTimeAgo time={ticket.createdAt} locale="en-US" />
          </Text>
        </View>
      </View>
    </View>
  );
};
export const ActivityScreen = () => {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [ipfs, setIpfs] = useState('');
  const [userInfo, setUserInfo] = useState();
  const [currency, setCurrency] = useState('€');
  const [rate, setRate] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const _userInfo = useSelector(state => state.userInfoReducer).userInfo;
  const country = useSelector(state => state.locationInfoReducer).locationInfo;
  const rateTry = useSelector(state => state.currencyInfoReducer).rateTry;
  const rateUsd = useSelector(state => state.currencyInfoReducer).rateUsd;
  const rateGbp = useSelector(state => state.currencyInfoReducer).rateGbp;
  const {t} = useTranslation();

  const [isFilter, setIsFiilter] = useState(false);
  // const {connector} = useWeb3React();

  const getTickets = () => {
    if (userInfo) {
      console.log('NORMAL Activity');
      userTickets().then(res => {
        console.log('userTicekts');
        if (res.success) {
          sortTickets(res.tickets);
        }
      });
    }
  };
  const sortTickets = array => {
    setTickets(
      array.sort(
        (item1, item2) =>
          new Date(item2.createdAt).getTime() -
          new Date(item1.createdAt).getTime(),
      ),
    );
  };

  const mintNFT = async (data, _provide) => {
    let provide = null;
    console.log('Button Clicked...', data, _provide);
    if (_provide === 'Bitkeep' && window.isBitKeep) {
      provide = window.bitkeep.ethereum;
    } else if (_provide === 'Metamask' && window.ethereum && !isMobile) {
      provide = window.ethereum;
    } else if (_provide === 'Metamask' && isMobile) {
      if (!window.ethereum) {
        window.location.href = `https://metamask.app.link/dapp/www.bkstage.io/activity`;
      } else {
        provide = window.ethereum;
      }
    } else if (_provide === 'BKSWallet') {
      mintNFTByBKSWallet(data);
      return;
    }

    if (provide === null) {
      Toast.show({
        type: 'warning',
      });
      Toast.show('You need to install ' + _provide, {
        appearance: 'warning',
        autoDismiss: true,
      });
      return;
    }

    const accounts = await provide.request({method: 'eth_accounts'});
    let account = null;
    if (accounts.length === 0) {
      const accounts = await provide.request({method: 'eth_requestAccounts'});
      account = accounts[0];
    } else account = accounts[0];

    const provider = new ethers.providers.Web3Provider(provide);
    const chainId = Number(provider.provider.chainId);

    if (chainId !== 56 && chainId !== 137) {
      Toast.show({
        type: 'info',
        text1: 'Please change the network to Binance or Polygon',
      });
    } else {
      if (account) {
        const balance = await provider.getBalance(account);
        console.log(balance);
        if (
          (balance.lt(ethers.BigNumber.from('3000000000000000')) &&
            chainId === 56) ||
          (balance.lt(ethers.BigNumber.from('40000000000000000')) &&
            chainId === 137)
        ) {
          Toast.show({
            type: 'info',
            text1: 'You don`t have enough GAS to mint.',
          });
        } else {
          setLoading(true);
          Toast.show({
            type: 'info',
            text1: 'Please wait ... It might takes some time',
          });
          const signer = provider.getSigner();
          const owner = '0xAe67E5C1ca56BD02dA50ECA943AF2AE6dE3c53B5';
          const amount =
            chainId === 56
              ? ethers.utils.parseEther('0.003')
              : ethers.utils.parseEther('0.04');
          setTickets(updateTicketProgressStatus(tickets, data.id, true));
          try {
            const tx = await signer.sendTransaction({
              to: owner,
              value: amount,
            });
            await tx.wait();
            const tokenObject = {
              name: data.eventcard.name,
              description:
                data.eventcard.category !== 'Category2'
                  ? data.eventcard.venue_description
                  : data.eventcard.description,
              image: data.eventcard.picture_ipfs,
              attributes: [
                {
                  trait_type: 'Price',
                  value: (Number(getEventPrice(data.eventcard)) * rate).toFixed(
                    2,
                  ),
                },
                {trait_type: 'Currency', value: currency},
                {trait_type: 'Location', value: data.eventcard.location},
                {trait_type: 'Date', value: data.eventcard.date},
                {trait_type: 'Collection', value: data.collection.name},
                {
                  trait_type: 'Addons',
                  value: JSON.parse(data.eventcard.addons),
                },
              ],
            };

            const added = await client.add(JSON.stringify(tokenObject));
            const ipfs_url = `https://bkstage.infura-ipfs.io/ipfs/${added.path}`;
            await mintTicket({
              IPFS_URL: ipfs_url,
              account,
              event: data.eventcard.id,
              chainId,
            }).then(res => {
              data.tokenURL = `${
                chainId === 56 ? tokenURL_binance : tokenURL_polygon
              }${res}`;
              data.ipfsURL = data.eventcard.picture_ipfs;
              data.is_minted = chainId === 56 ? 1 : 3; // BSC
              data.nft_address =
                chainId === 56 ? binanceAddress : polygonAddress;
              updateUserTickets(data).then(res => {
                if (res.success) {
                  Toast.show({
                    type: 'success',
                    text1: 'Successfully Minted',
                  });
                  getTickets();
                } else {
                  Toast.show({
                    type: 'error',
                    text1: 'Failed save database',
                  });
                }
              });
              setLoading(false);
              setTickets(updateTicketProgressStatus(tickets, data.id, false));
            });
          } catch (error) {
            setLoading(false);
            Toast.show({
              type: 'error',
              text1: error?.message,
            });
            setTickets(updateTicketProgressStatus(tickets, data.id, false));
          }
        }
      }
    }
    // navigate('/activity');
  };
  const updateTicketProgressStatus = (tickets, id, in_progress) => {
    return tickets.map(ticket => {
      var temp = Object.assign({}, ticket);
      if (temp.id === id) {
        temp.in_progress = in_progress;
      }
      return temp;
    });
  };
  const mintNFTByBKSWallet = async ticket => {
    //IPFS
    try {
      Toast.show({
        type: 'info',
        text1: 'Please wait ... It might takes some time',
      });
      setLoading(true);

      const tokenObject = {
        name: ticket.eventcard.name,
        description:
          ticket.eventcard.category !== 'Category2'
            ? ticket.eventcard.venue_description
            : ticket.eventcard.description,
        image: ticket.eventcard.picture_ipfs,
        attributes: [
          {
            trait_type: 'Price',
            value: (Number(getEventPrice(ticket.eventcard)) * rate).toFixed(2),
          },
          {trait_type: 'Currency', value: currency},
          {trait_type: 'Location', value: ticket.eventcard.location},
          {trait_type: 'Date', value: ticket.eventcard.date},
          {trait_type: 'Collection', value: ticket.collection.name},
          {trait_type: 'Addons', value: JSON.parse(ticket.eventcard.addons)},
        ],
      };

      //// add token object to IPFS
      const added = await client.add(JSON.stringify(tokenObject));
      const ipfs_url = `https://bkstage.infura-ipfs.io/ipfs/${added.path}`;

      let urlStr = config.WALLET_SITE_URL + '/login-marketplace?';
      urlStr = urlStr + 'tokenURI=' + ipfs_url;
      urlStr = urlStr + '&ticket_id=' + ticket.id;
      urlStr =
        urlStr + '&contract_address=' + ticket.eventcard.contract_address;
      urlStr = urlStr + '&eventcard_id=' + ticket.eventcard.id;

      let w = 532;
      let h = 700;
      let left = window.screen.width / 2 - w / 2;
      let top = window.screen.height / 2 - h / 2;
      const myWindow = window.open(
        urlStr,
        'BKS Wallet',
        'left=' + left + ',top=' + top + ',width=' + w + ',height=' + h,
      );

      const timer = setInterval(function () {
        if (myWindow.closed) {
          setLoading(false);
          clearInterval(timer);
        }
      }, 1000);
    } catch (error) {
      console.log('Error: ', error);
      setLoading(false);
      return;
    }
    return;
  };
  const totalCurrencyPrice = (country, ticket) => {
    switch (country) {
      case 'TR':
        return (
          (
            Number(ticket.eventcard.price) *
            rateTry *
            Number(ticket.count)
          ).toFixed(2) + '₺'
        );
      case 'US':
        return (
          (
            Number(ticket.eventcard.price) *
            rateUsd *
            Number(ticket.count)
          ).toFixed(2) + '$'
        );
      case 'GB':
        return (
          (
            Number(ticket.eventcard.price) *
            rateGbp *
            Number(ticket.count)
          ).toFixed(2) + '£'
        );
      default:
        return Number(ticket.eventcard.price) * Number(ticket.count) + '€';
    }
  };
  const ticketCurrencyPrice = (country, ticket) => {
    switch (country) {
      case 'TR':
        return (Number(ticket.eventcard.price) * rateTry).toFixed(2) + '₺';
      case 'US':
        return (Number(ticket.eventcard.price) * rateUsd).toFixed(2) + '$';
      case 'GB':
        return (Number(ticket.eventcard.price) * rateGbp).toFixed(2) + '£';
      default:
        return Number(ticket.eventcard.price) + '€';
    }
  };
  const sendMail = ticket => {
    const emailData = {
      mobile: true,
      email: userInfo.user.email,
      ticket_number: ticket.count,
      user_name: userInfo.user.name,
      event_name: ticket.eventcard.name,
      collection_name: ticket.collection.name,
      addons: JSON.parse(ticket.eventcard.addons),
      nft_base64: ticket.eventcard.picture_large,
      totalPrice: totalCurrencyPrice(country, ticket),
      ticketPrice: ticketCurrencyPrice(country, ticket),
      facebook: ticket.eventcard.facebook,
      twitter: ticket.eventcard.twitter,
      telegram: ticket.eventcard.telegram,
      instagram: ticket.eventcard.instagram,
      eventEmail: ticket.eventcard.email,
      location: ticket.eventcard.location,
      category: ticket.eventcard.category,
      ticket_type: ticket.collection.category,
      date: new Date(ticket.eventcard.date).toUTCString().substring(0, 22),
      end_date: new Date(ticket.eventcard.end_date)
        .toUTCString()
        .substring(0, 22),
    };
    sendOnlyMail({emailData, ticketId: ticket.id})
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Sent Email',
        });
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Failed',
        });
      });
  };

  useEffect(() => {
    setUserInfo(JSON.parse(_userInfo));
  }, [_userInfo]);

  useEffect(() => {
    // wallet_connect();
    getTickets();
  }, [userInfo]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {tickets &&
          tickets.map((ticket, i) => (
            <ActivityCard
              ticket={ticket}
              key={i}
              t={t}
              sendMail={sendMail}
              setIsModalVisible={setIsModalVisible}
              mintNFT={mintNFT}
              setIpfs={setIpfs}
            />
          ))}
        <Modal
          backdropColor="#6a4dfd"
          transparent={false}
          deviceHeight={deviceHeight + 50}
          statusBarTranslucent
          isVisible={isModalVisible}
          onBackdropPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <FastImage
              source={{
                uri: ipfs,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: '100%',
                height: deviceWidth - 40,
                borderWidth: 3,
                borderColor: '#6a4dfd',
                shadowColor: '#6a4dfd',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.43,
                elevation: 10,
              }}
            />
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    borderColor: 'rgba(121, 126, 137, 0.5)',
    borderTopWidth: 0.5,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginVertical: 10,
  },
  cardAvatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    height: 97,
    width: 97,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 20,
  },
  cardTopDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  ticketName: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    lineHeight: 16,
    color: '#fff',
    width: '70%',
  },
  quantityText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.66)',
    letterSpacing: 2,
  },
  amount: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    color: '#fff',
    marginLeft: 5,
  },
  byText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.66)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 8,
    marginBottom: 0,
  },
  byNameText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    color: '#fff',
    marginRight: 5,
  },
  timeDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  timeText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.66)',
    letterSpacing: 1.05,
    marginLeft: 10,
  },
  resendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 150,
    marginTop: 8,
    marginBottom: 7,
    paddingVertical: 4,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.33)',
  },
});
