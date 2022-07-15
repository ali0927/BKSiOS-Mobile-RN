import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import badgeMark from '../../assets/img/icons/verified.png';
import telegramImg from '../../assets/img/icons/telegram.png';
import globalImg from '../../assets/img/icons/globe.png';
import mediumImg from '../../assets/img/icons/medium.png';
import twitterImg from '../../assets/img/icons/twitter.png';
import facebookImg from '../../assets/img/icons/facebook.png';
import instagramImg from '../../assets/img/icons/instagram.png';
import copyImg from '../../assets/img/icons/copy.png';
import CollectionCarousel from '../components/homePage/collectionCarousel';
import config from '../helper/config';
import {getEventCardInCollection} from '../helper/event';
import {useSelector} from 'react-redux';

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
    console.log('collectionData', collectionData);
    getEventCardInCollection(collectionData.id).then(res => {
      console.log('RES...', res);
      if (res.success) {
        console.log('Res.EventCards', res.eventcards);
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
            {/* <Text style={styles.categoryText}>{collectionData.category}</Text> */}
            {/* <Text style={styles.description}>{collectionData.description}</Text> */}
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
        <View>
          {eventCards.map((eventcard, index) => {
            const addons =
              eventcard.addons === '' ? [] : JSON.parse(eventcard.addons);
            return (
              <View style={styles.eventContainer}>
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
                <TouchableOpacity to={`/event/eventcard/${eventcard.id}`}>
                  <Text>{eventcard.name}</Text>
                </TouchableOpacity>
                <View>
                  <Text>creator</Text>
                  <View>
                    <Image source={`${eventcard.creator.avatar}`} />
                    <TouchableOpacity to="/author">
                      <Text>@{eventcard.creator.name}</Text>
                    </TouchableOpacity>
                    <View />
                  </View>
                </View>
                <View>
                  {addons.length ? (
                    addons.map(addon => (
                      <Image source={addon.icon} width={20} />
                    ))
                  ) : (
                    <></>
                  )}
                </View>

                <View>
                  <View>
                    <Text>Reserve price</Text>
                    {eventcard.total_tickets === eventcard.buy_count && (
                      <Text>Sold out!</Text>
                    )}

                    <Text>{getEventPrice(eventcard)} €</Text>
                  </View>

                  {/* <button
                      className="collection__card-likes"
                      type="button"
                      onClick={() => onClickLike(index)}
                    >
                      {userInfo &&
                      eventcard.likes_number &&
                      eventcard.likes_number.includes(
                        userInfo.user.id
                      ) ? (
                        <img src="/img/icons/liked_blue.svg" alt="" />
                      ) : (
                        <img src="/img/icons/liked_white.svg" alt="" />
                      )}
                      <p
                        style={{
                          color: "rgba(255, 255, 255, 0.66)",
                          fontSize: 14,
                          fontWeight: 400,
                          margin: 0,
                          paddingLeft: 8,
                        }}
                      >
                        {getLikesNumber(eventcard)}
                      </p>
                    </button> */}
                </View>
              </View>
            );
            return <></>;
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
  eventContainer: {
    height: 498,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  eventBackImg: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    height: 210,
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
  text3: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  text4: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 20,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    marginRight: 10,
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
  button: {
    justifyContent: 'center',
    height: 44,
    width: 140,
    backgroundColor: '#6a4dfd',
    borderRadius: 4,
  },
  socialDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  socialImg: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: 10,
    borderRadius: 4,
  },
  followDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  divider: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    height: 1,
    marginTop: 40,
    marginBottom: 40,
  },
});
