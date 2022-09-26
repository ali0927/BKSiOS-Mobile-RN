import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import aboutImg from '../../assets/img/icons/about.png';
import activityImg from '../../assets/img/icons/activity.png';
import rightArrowImg from '../../assets/img/icons/arrow-right.png';
import likedImg from '../../assets/img/icons/liked.png';
import loginImg from '../../assets/img/icons/log-in.png';
import logoutImg from '../../assets/img/icons/log-out.png';
// import settingsImg from '../../assets/img/icons/settings2.png';
import profileImg from '../../assets/img/icons/user2.png';

export const MenuHomeScreen = ({navigation}) => {
  const userInfo = useSelector(state => state.userInfoReducer).userInfo;

  const dispatch = useDispatch();
  const {t} = useTranslation();
  const signOut = async () => {
    if (userInfo) {
      // console.log('SignOut Function...', userInfo);
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      dispatch({type: 'CLEAR_USER_INFO'});
    } else {
      navigation.navigate('SignIn');
    }
  };
  return (
    <View style={styles.container}>
      <View>
        {userInfo && (
          <TouchableOpacity
            style={styles.listItemFirst}
            onPress={() => navigation.navigate('Profile')}>
            <View style={styles.subContainer}>
              <Image source={profileImg} />
              <Text style={styles.title}>{t('profile')}</Text>
            </View>
            <Image source={rightArrowImg} />
          </TouchableOpacity>
        )}
        {userInfo && (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigation.navigate('Activity')}>
            <View style={styles.subContainer}>
              <Image source={activityImg} />
              <Text style={styles.title}>{t('activity')}</Text>
            </View>
            <Image source={rightArrowImg} />
          </TouchableOpacity>
        )}
        {userInfo && (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigation.navigate('Liked')}>
            <View style={styles.subContainer}>
              <Image source={likedImg} />
              <Text style={styles.title}>{t('liked')}</Text>
            </View>
            <Image source={rightArrowImg} />
          </TouchableOpacity>
        )}
        {/* <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation.navigate('Settings')}>
          <View style={styles.subContainer}>
            <Image source={settingsImg} />
            <Text style={styles.title}>App Settings</Text>
          </View>
          <Image source={rightArrowImg} />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation.navigate('About')}>
          <View style={styles.subContainer}>
            <Image source={aboutImg} />
            <Text style={styles.title}>{t('about.title')}</Text>
          </View>
          <Image source={rightArrowImg} />
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        {!userInfo ? (
          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.navigate('SignIn')}>
            <Image source={loginImg} />
            <Text style={styles.text3}>{t('sign in')}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button1} onPress={() => signOut()}>
            <Image source={logoutImg} />
            <Text style={styles.text3}>{t('sign out')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
    justifyContent: 'space-between',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'rgba(121, 126, 137, 0.5)',
    borderBottomWidth: 0.5,
    padding: 20,
  },
  listItemFirst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'rgba(121, 126, 137, 0.5)',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    padding: 20,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    marginLeft: 20,
  },
  text3: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 19,
    letterSpacing: 1.6,
    marginLeft: 10,
  },
  btnContainer: {marginHorizontal: 20},
  button1: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.33)',
    padding: 12,
    borderRadius: 4,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 50,
  },
  button2: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 44,
    borderWidth: 1,
    backgroundColor: '#6a4dfd',
    padding: 12,
    borderRadius: 4,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 50,
  },
});
