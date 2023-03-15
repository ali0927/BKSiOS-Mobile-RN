import {useNavigation} from '@react-navigation/core';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import arrowLeft from '../../../assets/img/icons/arrow-left.png';
import logoImg from '../../../assets/img/icons/logo-app.png';
import {CollectionScreen} from '../../pages/collection';
import {HomeScreen} from '../../pages/home';
import {ProfileAuthorScreen} from '../../pages/profileAuthor';
import {ForgetPasswordScreen} from '../../pages/signPage/ForgetPassword';
// import {PrivacyScreen} from '../../pages/signPage/privacy';
import {useTranslation} from 'react-i18next';
import {SignInScreen} from '../../pages/signPage/signIn';
import {SignUpScreen} from '../../pages/signPage/signUp';
import {EventDetailsScreen} from '../../pages/eventDetails';
import {useDispatch} from 'react-redux';

const HomeStack = createNativeStackNavigator();
const windowWidth = Dimensions.get('window').width;

export const HomeStackScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const Header = ({title}) => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrowLeft} />
        </TouchableOpacity>
        <Text style={styles.titleText}>{title}</Text>
        <View style={{width: 60}} />
      </View>
    );
  };
  useEffect(() => {
    navigation.addListener('focus', e => {
      dispatch({type: 'SET_TAB_INFO', payload: 'Home'});
      dispatch({type: 'SET_ITEM_MUTE_SEARCH', payload: true});
    });
  }, []);
  return (
    <HomeStack.Navigator
      initialRouteName="HomeMain"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#14142f',
        },
      }}>
      <HomeStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerTitle: () => <Header title={t('sign in')} />,
          headerBackVisible: false,
        }}
      />
      <HomeStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerTitle: () => <Header title={t('sign up')} />,
          headerBackVisible: false,
        }}
      />
      <HomeStack.Screen
        name="ForgetPassword"
        component={ForgetPasswordScreen}
        options={{
          headerTitle: () => <Header title={t('forgot password')} />,
          headerBackVisible: false,
        }}
      />
      <HomeStack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <View style={styles.homeHeaderContainer}>
              <Image
                source={logoImg}
                style={{width: 160, height: 46}}
                resizeMode="center"
              />
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="AuthorProfile"
        component={ProfileAuthorScreen}
        options={{
          headerTitle: () => <Header title={t('profile')} />,
          headerBackVisible: false,
        }}
      />
      <HomeStack.Screen
        name="Collection"
        component={CollectionScreen}
        options={{
          headerTitle: () => <Header title={t('collection')} />,
          headerBackVisible: false,
        }}
      />
      <HomeStack.Screen
        name="EventDetail"
        component={EventDetailsScreen}
        options={{
          headerTitle: () => <Header title={t('item')} />,
          headerBackVisible: false,
        }}
      />
      {/* <HomeStack.Screen name="Privacy" component={PrivacyScreen} /> */}
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleText: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    textAlign: 'right',
    letterSpacing: 1.03,
  },
  homeHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth - 30,
  },
  homeHeaderTitle: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
});
