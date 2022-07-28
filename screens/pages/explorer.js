import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/core';
import {getEventPrice, getAllEventCards} from '../helper/event';
import config from '../helper/config';
import badgeMark from '../../assets/img/icons/verified.png';
import likedImg from '../../assets/img/icons/like-empty.png';
import collectionAvatar from '../../assets/img/avatars/avatar2.jpg';
import {Loading} from '../components/loading';
import {isVideoFile} from '../utils';
import {useSelector} from 'react-redux';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

export const ExplorerScreen = () => {
  const [originEvents, setOriginEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchInfo = useSelector(state => state.searchInfoReducer).searchInfo;

  const filterEvents = events_ => {
    let res = [];
    if (searchInfo !== null) {
      res = events_.filter(card => card.name.includes(searchInfo));
      setEvents([...res]);
    } else {
      setEvents(events_);
    }
  };

  useEffect(() => {
    console.log('SearchInfo>>', searchInfo);
    filterEvents(originEvents);
  }, [searchInfo]);

  useEffect(() => {
    getAllEventCards().then(res => {
      if (res.success) {
        setLoading(false);
        setOriginEvents(res.eventcards);
        filterEvents(res.eventcards);
      }
    });
  }, []);
  const Card = ({item}) => {
    const navigation = useNavigation();
    const creatorAvatar = () => {
      if (item.creator.avatar === '/img/avatars/avatar.jpg') {
        return require('../../assets/img/avatars/avatar.jpg');
      } else if (item.creator.avatar === '/img/avatars/avatar2.jpg') {
        return require('../../assets/img/avatars/avatar2.jpg');
      } else if (item.creator.avatar === '/img/avatars/avatar3.jpg') {
        return require('../../assets/img/avatars/avatar3.jpg');
      } else if (item.creator.avatar === '/img/avatars/avatar4.jpg') {
        return require('../../assets/img/avatars/avatar4.jpg');
      } else if (item.creator.avatar === '/img/avatars/avatar5.jpg') {
        return require('../../assets/img/avatars/avatar5.jpg');
      } else if (item.creator.avatar === '/img/avatars/avatar6.jpg') {
        return require('../../assets/img/avatars/avatar6.jpg');
      } else if (item.creator.avatar === '/img/avatars/avatar7.jpg') {
        return require('../../assets/img/avatars/avatar7.jpg');
      } else if (item.creator.avatar === '/img/avatars/avatar8.jpg') {
        return require('../../assets/img/avatars/avatar8.jpg');
      }
    };
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('EventDetail', {item: item})}
        style={styles.cardContainer}>
        <View style={styles.imageDiv}>
          {/* <Image
            source={{
              uri:
                config.API_BASE_URL +
                '/api/upload/get_file?path=' +
                item.picture_small,
            }}
            style={styles.img}
            resizeMode="cover"
          /> */}
          {/* {isVideoFile(item.picture_large) ? (
            <View>
              <Video
                source={{
                  uri:
                    config.API_BASE_URL +
                    '/api/upload/get_file?path=' +
                    item.picture_large,
                }}
                autoPlay
                playInBackground
                repeat
                muted
                style={{width: 'auto', height: '100%'}}
                ref={ref => {
                  this.player = ref;
                }}>
                {/* <source
                    src={`${config.API_BASE_URL}/api/upload/get_file?path=${eventCard.picture_large}`}
                    type="video/mp4"
                  /> //
                Your browser does not support the video tag.
              </Video>
            </View>
          ) : (
            <View>
              <Image
                source={{
                  uri:
                    config.API_BASE_URL +
                    '/api/upload/get_file?path=' +
                    item.picture_large,
                }}
                style={styles.img}
                resizeMode="cover"
              />
            </View>
          )} */}
        </View>
        <View style={styles.cardMeta}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.detailContainer}>
            <View style={styles.collectionContainer}>
              <Text style={styles.info}>Collection</Text>
              <View style={styles.collectionSub}>
                <Image source={collectionAvatar} style={styles.avatar} />
                <Text style={styles.owner}>cName</Text>
              </View>
            </View>
            <View>
              <Text style={styles.info}>Creator</Text>
              <View style={styles.creatorContainer}>
                <Image source={creatorAvatar()} style={styles.avatar} />
                <Text style={styles.owner}>{item.creator.name}</Text>
                <Image source={badgeMark} style={styles.badgeMark} />
              </View>
            </View>
          </View>
          {item.totoal_ticekts === item.buy_count && (
            <View>
              <Text style={{color: 'brown', fontSize: 16}}>Sold out!</Text>
            </View>
          )}
          <View style={styles.divider} />
          <View style={styles.footerContainer}>
            <View>
              <Text style={styles.info}>Reserve Price</Text>
              <Text style={styles.price}>{getEventPrice(item)} &#8364;</Text>
            </View>
            <View style={styles.likedImg}>
              <Image source={likedImg} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.eventContainer}>
        {loading && <Loading />}
        {events.map(item => (
          <Card item={item} key={item.id} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
  },
  eventContainer: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  cardContainer: {
    marginBottom: 30,
    height: 440,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
    borderRadius: 12,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  imageDiv: {
    position: 'relative',
    height: 220,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  cardMeta: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  collectionContainer: {
    width: '50%',
  },
  collectionSub: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  creatorContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  divider: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    height: 1,
    marginVertical: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 24,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    color: '#fff',
    lineHeight: 24,
    width: '100%',
    textAlign: 'left',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  info: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  owner: {
    fontFamily: 'SpaceGrotesk-Medium',
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 20,
    color: '#fff',
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  price: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 24,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    color: '#fff',
    lineHeight: 28,
    textAlign: 'left',
    marginTop: 5,
    letterSpacing: 0.5,
  },
  badgeMark: {
    backgroundColor: '#2f80ed',
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
    width: 16,
    height: 16,
    marginLeft: 10,
  },
  likedImg: {
    width: 24,
    height: 24,
  },
});
