import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Linking,
  Dimensions,
} from 'react-native';
import logoImg from '../../assets/img/icons/logo.png';
import backImg from '../../assets/img/icons/start-back.png';
import telegramImg from '../../assets/img/icons/telegram.png';
import globalImg from '../../assets/img/icons/globe.png';
import mediumImg from '../../assets/img/icons/medium.png';
import twitterImg from '../../assets/img/icons/twitter.png';
import facebookImg from '../../assets/img/icons/facebook.png';
import instagramImg from '../../assets/img/icons/instagram.png';

const THEME_COLOR = '#14142f';
const deviceWidth = Dimensions.get('window').width;

export const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Image source={logoImg} style={styles.logoImg} />
          <Text style={styles.text1}>BACKSTAGE</Text>
          <Text style={styles.text2}>
            Backstage is powering the crypto revolution in the events industry.
            Through the BKS token and our blockchain ecosystem, Backstage aims
            to solve the current challenges facing the events and entertainment
            sectors.
          </Text>
          <Text style={styles.text2}>
            From financing and payments to NFT ticketing and marketplaces,
            Backstage $BKS will take the events industry toward a more
            sustainable, profitable and fair future. Backstage has a very strong
            and open community and everyone can join and contribute to the
            platform's development by purchasing tokens and helping fund the
            entertainment industry.
          </Text>
          <View style={styles.divider} />
          <Text style={styles.followText}>Follow Us</Text>
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
                Linking.openURL('https://medium.com/BackstageBks')
              }>
              <Image source={mediumImg} />
            </TouchableOpacity>
          </View>
          <View style={styles.socialDiv}>
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
                Linking.openURL('https://www.instagram.com/bksbackstage/?hl=en')
              }>
              <Image source={instagramImg} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.overlay} />
        <Image source={backImg} style={styles.backImage} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME_COLOR,
  },
  mainContainer: {
    alignItems: 'center',
    zIndex: 30,
    padding: 25,
    width: '100%',
  },
  logoImg: {
    width: 60,
    height: 60,
  },
  text1: {
    color: '#fff',
    fontSize: 26,
    lineHeight: 50,
    letterSpacing: 1.8,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  text2: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  divider: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    height: 1,
    marginVertical: 20,
  },
  followText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1.5,
    marginVertical: 15,
  },
  socialDiv: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%',
  },
  socialImg: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: 10,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  backImage: {
    position: 'absolute',
    bottom: 0,
    zIndex: 0,    
    width: deviceWidth,
  },
  overlay: {
    backgroundColor: THEME_COLOR,
    position: 'absolute',
    height: '100%',
    width: 500,
    zIndex: 20,
    opacity: 0.85,
  },
});
