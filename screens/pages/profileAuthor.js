import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
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

export const ProfileAuthorScreen = ({route}) => {
  const collectionData = route.params.item;

  const copyToClipboard = key => {
    Toast.show({
      type: 'success',
      text1: 'Copied',
      text2: 'You can paste these characters...  👋',
    });
    if (key === 'wallet') {
      Clipboard.setString(collectionData.creator.wallet_address);
    } else {
      Clipboard.setString('https://bksbackstage.io');
    }
  };

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
            <Text style={styles.idText}>{collectionData.category}</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <Text style={styles.subTitle}>Wallet</Text>
            <View style={styles.clipboardDiv}>
              <TextInput
                style={styles.input}
                editable={false}
                value={collectionData?.creator.wallet_address}
              />
              <TouchableOpacity
                style={styles.copyImg}
                onPress={() => copyToClipboard('wallet')}>
                <Image source={copyImg} />
              </TouchableOpacity>
            </View>
            <Text style={styles.subTitle}>Links</Text>
            <View style={styles.socialDiv}>
              <TouchableOpacity style={styles.socialImg}>
                <Image source={globalImg} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialImg}>
                <Image source={telegramImg} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialImg}>
                <Image source={mediumImg} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialImg}>
                <Image source={twitterImg} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialImg}>
                <Image source={facebookImg} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialImg}>
                <Image source={instagramImg} />
              </TouchableOpacity>
            </View>
            <View style={styles.followDiv}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.text1}>
                  {collectionData.creator.followers}
                </Text>
                <Text style={{...styles.description, marginTop: 0}}>
                  followrs
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('FollowButton Clicked')}>
                <Text style={styles.text3}>Follow</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subtitle}>Hot Collections</Text>
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
    width: '100%',
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
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginTop: 10,
    padding: 8,
    paddingRight: 50,
    paddingLeft: 20,
    color: 'white',
    borderRadius: 4,
    fontSize: 18,
    fontWeight: '500',
  },
  text1: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginRight: 10,
  },
  text2: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 30,
  },
  text3: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  idText: {
    color: '#6a4dfd',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.66)',
    marginTop: 10,
    letterSpacing: 1.2,
  },
  subTitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.66)',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginTop: 30,
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
