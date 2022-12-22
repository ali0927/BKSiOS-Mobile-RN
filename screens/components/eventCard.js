import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import Countdown from 'react-countdown';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import clockImg from '../../assets/img/icons/clock.png';
import likeBlueImg from '../../assets/img/icons/like-fill.png';
import likeImg from '../../assets/img/icons/liked-white.png';
import badgeMarkImg from '../../assets/img/icons/verified.png';
import config from '../helper/config';
import Currency from './currency/Currency';
import CurrencySymbol from './currency/CurrencySymbol';
import {AddonModal} from './modals/addonModal';
export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

export const EventCard = ({userInfo, item, index, onClickLike}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAddon, setCurrentAddon] = useState();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const addons = item.addons === '' ? [] : JSON.parse(item.addons);
  let addonPrice = 0;
  addons.forEach(addon => {
    addonPrice += Number(addon.price);
  });

  const showModal = addon => {
    setModalVisible(true);
    setCurrentAddon(addon);
  };

  const CountTime = ({date, size = 'md'}) => {
    const d = new Date(date);
    return (
      <Countdown date={d} renderer={props => renderer({...props, size})} />
    );
  };

  const renderer = ({days, hours, minutes, seconds, completed, size}) => {
    if (completed) {
      return <Text style={styles.leftTime}>End</Text>;
    } else {
      return (
        <Text style={styles.leftTime}>
          {days !== 0
            ? days + 'd'
            : hours !== 0
            ? hours + 'h'
            : minutes !== 0
            ? minutes + 'm'
            : seconds !== 0
            ? seconds + 's'
            : ''}
        </Text>
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('EventDetail', {item: item})}
      style={styles.cardContainer}>
      <Image
        source={{uri: config.SITE_URL + '/img/mark/brown1.png'}}
        style={{position: 'absolute', zIndex: 100, width: 50, height: 50}}
      />
      <View style={styles.cardLikes}>
        <TouchableOpacity onPress={() => onClickLike(index)}>
          <Image
            source={
              userInfo &&
              item.likes_number &&
              item.likes_number.includes(userInfo?.user?.id)
                ? likeBlueImg
                : likeImg
            }
          />
        </TouchableOpacity>
      </View>
      <FastImage
        source={{
          uri:
            config.API_BASE_URL +
            '/api/upload/get_file?path=' +
            item.picture_small,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}
        style={styles.img}
      />
      <View style={styles.collectionMeta}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.details}>
          <View style={{...styles.detailContainer, height: 40}}>
            <Text style={styles.info}>{t('collection')} </Text>
            <Text style={styles.infoVal} ellipsizeMode="tail" numberOfLines={2}>
              {item.collection.name}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.info}>{t('creator')}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.infoVal}>{item.creator.name}</Text>
              <Image source={badgeMarkImg} style={styles.badgeMark} />
            </View>
          </View>
        </View>
        <View style={styles.details}>
          <View>
            <Text style={styles.info}>{t('addons')}</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                height: 70,
              }}>
              {JSON.parse(item.addons).map((addon, i) => (
                <TouchableOpacity onPress={() => showModal(addon)}>
                  <Image
                    source={{uri: config.SITE_URL + addon.icon}}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 5,
                      marginRight: 18,
                      marginTop: 10,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.footerDetails}>
          <Text style={styles.info}>ends in</Text>
          <Text style={styles.info}>{t('reserve price')}</Text>
        </View>
        <View style={styles.footerDetails}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={clockImg}
              style={{
                width: 20,
                height: 20,
                marginRight: 10,
              }}
            />
            <CountTime date={item.date} />
          </View>
          <View>
            <Text style={styles.price}>
              <Currency price={item.price + addonPrice} /> <CurrencySymbol />
            </Text>
          </View>
        </View>
      </View>
      <AddonModal
        addon={currentAddon}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    width: '100%',
    marginRight: 30,
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardLikes: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    top: 10,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 200,
  },
  img: {
    width: '100%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    height: ITEM_WIDTH,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  collectionMeta: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    paddingTop: 20,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  details: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  detailContainer: {
    width: '50%',
  },
  divider: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    height: 1,
    marginTop: 5,
    marginBottom: 10,
  },
  footerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontFamily: 'SpaceGrotesk-Medium',
    width: '100%',
    textAlign: 'left',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
  },
  info: {
    fontFamily: 'SpaceGrotesk-Medium',
    textAlign: 'left',
    fontSize: 10,
    lineHeight: 12,
    color: 'rgba(255, 255, 255, 0.66)',
    fontWeight: '400',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  infoVal: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  price: {
    fontFamily: 'SpaceGrotesk-Medium',
    textAlign: 'left',
    fontSize: 24,
    marginTop: 5,
    color: '#fff',
    letterSpacing: 1,
    fontWeight: '700',
  },
  badgeMark: {
    backgroundColor: '#2f80ed',
    borderRadius: 20,
    width: 16,
    height: 16,
    marginTop: 5,
    marginLeft: 5,
  },
  leftTime: {
    fontFamily: 'SpaceGrotesk-Medium',
    textAlign: 'left',
    fontSize: 20,
    color: '#fff',
    letterSpacing: 1,
    fontWeight: '700',
  },
});
