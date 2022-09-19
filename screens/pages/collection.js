import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import likedImg from '../../assets/img/icons/like-empty.png';
import badgeMark from '../../assets/img/icons/verified.png';
import CurrencySymbol from '../components/currency/CurrencySymbol';
import config from '../helper/config';
import {getEventCardInCollection} from '../helper/event';

export const CollectionScreen = ({route}) => {
  const userInfo = useSelector(state => state.userInfoReducer).userInfo;
  const collectionData = route.params.item;

  const [eventCards, setEventCards] = useState([]);
  const [ownerCnt, setOwnerCnt] = useState(0);

  const getEventPrice = eventCard => {
    const addons = eventCard.addons === '' ? [] : JSON.parse(eventCard.addons);
    let addonPrice = 0;
    const len = addons.length;
    for (let i = 0; i < len; i++) {
      addonPrice += Number(addons[i].price);
    }
    return eventCard.price + addonPrice;
  };
  const imageUrl = src => {
    if (src === '/img/avatars/avatar.jpg') {
      return require('../../assets/img/avatars/avatar.jpg');
    } else if (src === '/img/avatars/avatar2.jpg') {
      return require('../../assets/img/avatars/avatar2.jpg');
    } else if (src === '/img/avatars/avatar3.jpg') {
      return require('../../assets/img/avatars/avatar3.jpg');
    } else if (src === '/img/avatars/avatar4.jpg') {
      return require('../../assets/img/avatars/avatar4.jpg');
    } else if (src === '/img/avatars/avatar5.jpg') {
      return require('../../assets/img/avatars/avatar5.jpg');
    } else if (src === '/img/avatars/avatar6.jpg') {
      return require('../../assets/img/avatars/avatar6.jpg');
    } else if (src === '/img/avatars/avatar7.jpg') {
      return require('../../assets/img/avatars/avatar7.jpg');
    } else if (src === '/img/avatars/avatar8.jpg') {
      return require('../../assets/img/avatars/avatar8.jpg');
    } else if (src === '/img/bg/bg-small.png') {
      return require('../../assets/img/bg/bg-small.png');
    } else if (src === '/img/bg/bg-small2.png') {
      return require('../../assets/img/bg/bg-small2.png');
    } else if (src === '/img/bg/bg-small3.png') {
      return require('../../assets/img/bg/bg-small3.png');
    } else if (src === '/img/bg/bg-small4.png') {
      return require('../../assets/img/bg/bg-small4.png');
    } else if (src === '/img/bg/bg-small5.png') {
      return require('../../assets/img/bg/bg-small5.png');
    } else if (src === '/img/bg/bg-small6.png') {
      return require('../../assets/img/bg/bg-small6.png');
    }
  };

  useEffect(() => {
    const creators = [];
    eventCards.map(eventcard => {
      if (!creators.includes(eventcard.creator.id)) {
        creators.push(eventcard.creator.id);
      }
    });
    setOwnerCnt(creators.length);
  }, [eventCards]);

  useEffect(() => {
    getEventCardInCollection(collectionData.id).then(res => {
      if (res.success) {
        setEventCards(res.eventcards);
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.backgroundImgContainer}>
          <Image
            source={{
              uri:
                config.API_BASE_URL +
                '/api/upload/get_file?path=' +
                collectionData.picture_large,
            }}
            resizeMode="stretch"
            style={styles.backgroundImg}
          />
        </View>
        {collectionData && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingBottom: 50,
            }}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarDiv}>
                <Image
                  source={{
                    uri:
                      config.API_BASE_URL +
                      '/api/upload/get_file?path=' +
                      collectionData.picture_small,
                  }}
                  resizeMode="contain"
                  style={styles.avatarImg}
                />
              </View>
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.text1}>{collectionData.name}</Text>
              <Image source={badgeMark} style={styles.badgeMark} />
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.byText}>by</Text>
              <Text style={styles.idText}>
                @{collectionData?.creator?.name}
              </Text>
            </View>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            {userInfo && (
              <View style={styles.flexRow}>
                <View style={styles.subContainer}>
                  <Text style={styles.subTitle}>Items</Text>
                  <Text style={styles.text2}>{eventCards.length}</Text>
                </View>
                <View style={styles.subContainer}>
                  <Text style={styles.subTitle}>Owners</Text>
                  <Text style={styles.text2}>{ownerCnt}</Text>
                </View>
              </View>
            )}
          </View>
        )}
        <View style={styles.eventCardsContainer}>
          {eventCards.map((eventcard, index) => {
            const addons =
              eventcard.addons === '' ? [] : JSON.parse(eventcard.addons);
            return (
              <TouchableOpacity style={styles.eventContainer} key={index}>
                <Image
                  source={{
                    uri:
                      config.API_BASE_URL +
                      '/api/upload/get_file?path=' +
                      eventcard.picture_small,
                  }}
                  resizeMode="stretch"
                  style={styles.eventBackImg}
                />
                <View style={styles.eventCardMetaContainer}>
                  <TouchableOpacity to={`/event/eventcard/${eventcard.id}`}>
                    <Text style={styles.eventCardName}>{eventcard.name}</Text>
                  </TouchableOpacity>
                  <Text style={styles.eventCardSubName}>creator</Text>
                  <View
                    style={{...styles.flexRow, justifyContent: 'flex-start'}}>
                    <Image
                      source={imageUrl(eventcard.creator.avatar)}
                      resizeMode="stretch"
                      style={styles.creatorImg}
                    />
                    <TouchableOpacity
                      to="/author"
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.creatorName}>
                        {eventcard.creator.name}
                      </Text>
                      <Image
                        source={badgeMark}
                        style={{...styles.badgeMark, marginLeft: 10}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.divider} />
                  <View>
                    {addons.length ? (
                      addons.map(addon => (
                        <Image
                          source={imageUrl(addon.icon)}
                          resizeMode="stretch"
                          style={styles.creatorImg}
                        />
                      ))
                    ) : (
                      <View
                        style={{
                          ...styles.creatorImg,
                          backgroundColor: 'transparent',
                        }}
                      />
                    )}
                  </View>
                  <View style={{...styles.divider, marginBottom: 0}} />
                  <Text style={{...styles.eventCardSubName, marginBottom: 0}}>
                    Reserve price
                  </Text>
                  <View
                    style={{
                      ...styles.flexRow,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.price}>
                      {getEventPrice(eventcard)} <CurrencySymbol />
                    </Text>
                    <View style={styles.likedImg}>
                      <Image source={likedImg} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImgContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    height: 224,
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
  },
  eventCardsContainer: {
    paddingHorizontal: 20,
  },
  eventContainer: {
    height: 498,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 20,
  },
  eventBackImg: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    height: 210,
  },
  eventCardMetaContainer: {
    padding: 20,
  },
  eventCardName: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 20,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    marginRight: 10,
  },
  eventCardSubName: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 10,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 1.15,
    marginVertical: 10,
  },
  creatorImg: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    height: 32,
    width: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  creatorName: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1.03,
  },
  price: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 24,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    letterSpacing: 1,
  },
  likedImg: {
    width: 24,
    height: 24,
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarDiv: {
    position: 'relative',
    width: 140,
    height: 140,
    marginTop: -70,
    marginBottom: 10,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
    borderColor: '#ededed',
    borderWidth: 1,
    backgroundColor: 'pink',
  },
  badgeMark: {
    backgroundColor: '#2f80ed',
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 1,
    width: 16,
    height: 16,
  },
  subContainer: {
    width: '50%',
  },
  text1: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 24,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    marginRight: 10,
  },
  text2: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1.05,
  },
  byText: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    marginRight: 5,
  },
  idText: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#6a4dfd',
    fontSize: 16,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.66)',
    marginTop: 10,
  },
  subTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.66)',
    textTransform: 'uppercase',
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    marginTop: 30,
    letterSpacing: 2,
  },
  divider: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    height: 1,
    marginTop: 20,
    marginBottom: 20,
  },
});
