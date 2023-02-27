import Clipboard from '@react-native-clipboard/clipboard';
import React, {useEffect} from 'react';
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
import Toast from 'react-native-toast-message';
import copyImg from '../../assets/img/icons/copy.png';
import facebookImg from '../../assets/img/icons/facebook.png';
import globalImg from '../../assets/img/icons/globe.png';
import instagramImg from '../../assets/img/icons/instagram.png';
import mediumImg from '../../assets/img/icons/medium.png';
import telegramImg from '../../assets/img/icons/telegram.png';
import twitterImg from '../../assets/img/icons/twitter.png';
import badgeMark from '../../assets/img/icons/verified.png';
import CollectionCarousel from '../components/homePage/collectionCarousel';
import config from '../helper/config';

export const ProfileAuthorScreen = ({route}) => {
  const collectionData = route.params.item;
  const {t} = useTranslation();

  // const copyToClipboard = key => {
  //   Toast.show({
  //     type: 'success',
  //     text1: 'Copied',
  //     text2: 'You can paste these characters...  👋',
  //   });
  //   if (key === 'wallet') {
  //     Clipboard.setString(collectionData.creator.wallet_address);
  //   } else {
  //     Clipboard.setString('https://bksbackstage.io');
  //   }
  // };

  useEffect(() => {
    console.log('collectionData', collectionData);
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
                collectionData.picture_background,
            }}
            resizeMode="cover"
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
            <Text style={styles.idText}>@{collectionData.creator.name}</Text>
            <Text style={styles.description}>{collectionData.description}</Text>
            {/* <Text style={styles.subTitle}>{t('wallet')}</Text>
            <View style={styles.clipboardDiv}>
              <Text style={styles.input} ellipsizeMode="tail" numberOfLines={1}>
                {collectionData?.creator.wallet_address}
              </Text>
              <TouchableOpacity
                style={styles.copyImg}
                onPress={() => copyToClipboard('wallet')}>
                <Image source={copyImg} />
              </TouchableOpacity>
            </View> */}
            <Text style={styles.subTitle}>{t('links')}</Text>
            <View style={styles.socialDiv}>
              <TouchableOpacity
                style={styles.socialImg}
                onPress={() => Linking.openURL('https://t.me/BKSBackstage')}>
                <Image source={globalImg} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialImg}
                onPress={() => Linking.openURL('https://t.me/BKSBackstage')}>
                <Image source={telegramImg} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialImg}
                onPress={() =>
                  Linking.openURL('https://bksbackstageofficial.medium.com/')
                }>
                <Image source={mediumImg} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialImg}
                onPress={() =>
                  Linking.openURL('https://twitter.com/BackstageBks')
                }>
                <Image source={twitterImg} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialImg}
                onPress={() =>
                  Linking.openURL('https://www.facebook.com/BKSBackstage')
                }>
                <Image source={facebookImg} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialImg}
                onPress={() =>
                  Linking.openURL(
                    'https://www.instagram.com/bksbackstage/?hl=en',
                  )
                }>
                <Image source={instagramImg} />
              </TouchableOpacity>
            </View>
            <View style={styles.followDiv}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.text4}>
                  {collectionData.creator.followers}
                </Text>
                <Text style={{...styles.description, marginTop: 0}}>
                  {t('followers')}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('FollowButton Clicked')}>
                <Text style={styles.text3}>{t('follow')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <Text style={styles.text1}>{t('hot collections')}</Text>
            <CollectionCarousel />
          </View>
        )}
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
    // width: '100%',
    height: '100%',
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
    marginBottom: 30,
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
  clipboardDiv: {
    position: 'relative',
  },
  copyImg: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  input: {
    fontFamily: 'SpaceGrotesk-Medium',
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginTop: 10,
    padding: 12,
    paddingRight: 60,
    paddingLeft: 20,
    color: '#fff',
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '400',
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
    fontWeight: '400',
    lineHeight: 30,
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
  idText: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#6a4dfd',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'justify',
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
    letterSpacing: 1.15,
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
