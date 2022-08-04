import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import clockImg from '../../assets/img/icons/clock.png';
import badgeMark from '../../assets/img/icons/verified.png';
import ReactTimeAgo from 'react-native-timeago';
import {updateUsertickets, userTickets} from '../helper/event';
// import {useWeb3React} from '@web3-react/core';
import config from '../helper/config';
import {useSelector} from 'react-redux';

const ActivityCard = ({ticket}) => {
  // console.log('Ticket', ticket.eventcard);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardAvatar}>
        <Image
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
          <Text style={styles.ticketName}>{ticket.eventcard.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.quantityText}>QTY</Text>
            <Text style={styles.amount}>{ticket.count ? ticket.count : 0}</Text>
          </View>
        </View>
        <Text style={styles.byText}>Created by</Text>
        <Text style={styles.byNameText}>{ticket.eventcard.creator.name}</Text>
        <Text style={styles.byText}>Purchased by</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.byNameText}>{ticket.buyer.name}</Text>
          <Image source={badgeMark} style={styles.badgeMark} />
        </View>
        <View style={styles.timeDiv}>
          <Image source={clockImg} />
          <Text style={styles.timeText}>
            <ReactTimeAgo time={ticket.createdAt} locale="en-US" />
          </Text>
        </View>
      </View>
    </View>
  );
};
export const ActivityScreen = () => {
  const [tickets, setTickets] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const _userInfo = useSelector(state => state.userInfoReducer).userInfo;

  const [isFilter, setIsFiilter] = useState(false);
  // const {connector} = useWeb3React();

  useEffect(() => {
    setUserInfo(JSON.parse(_userInfo));
  }, [_userInfo]);

  useEffect(() => {
    // wallet_connect();
    if (userInfo && userInfo.user.user_type === 'NORMAL') {
      console.log('NORMAL Activity');
      userTickets().then(res => {
        console.log("userTicekts");
        if (res.success) {
          setTickets(res.tickets);
        }
      });
    }
  }, [userInfo]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {tickets &&
          tickets.map((ticket, i) => <ActivityCard ticket={ticket} key={i} />)}
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
    paddingTop: 20,
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
    alignItems: 'center',
    marginBottom: 5,
  },
  ticketName: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    color: '#fff',
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
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    color: '#fff',
    marginLeft: 10,
  },
  badgeMark: {
    backgroundColor: '#2f80ed',
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 1,
    width: 16,
    height: 16,
    marginLeft: 10,
  },
  byText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.66)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 10,
    marginBottom: 5,
  },
  byNameText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    color: '#fff',
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
});
