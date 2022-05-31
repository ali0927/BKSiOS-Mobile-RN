import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUpScreen} from '../../pages/signPage/signUp';
import {SignInScreen} from '../../pages/signPage/signIn';
import {ForgetPasswordScreen} from '../../pages/signPage/ForgetPassword';
import {PrivacyScreen} from '../../pages/signPage/privacy';
import {HomeScreen} from '../../pages/home';
import {EventDetailsScreen} from '../../pages/eventDetails';
import {Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import logoImg from '../../../assets/img/icons/logo.png';
import arrowLeft from '../../../assets/img/icons/arrow-left.png';

const HomeStack = createNativeStackNavigator();
const THEME_COLOR = '#14142f';
const THEME_SEC_COLOR = '#887bff';

export const HomeStackScreen = () => {
  const userInfo = useSelector(state => state.userInfoReducer).userInfo;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const signOut = () => {
    if (userInfo) {
      dispatch({type: 'CLEAR_USER_INFO'});
    } else {
      navigation.navigate('SignIn');
    }
  };
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME_COLOR,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: '600',
                }}>
                Sign In
              </Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={arrowLeft} />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: '600',
                }}>
                Sign Up
              </Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={arrowLeft} />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen
        name="ForgetPassword"
        component={ForgetPasswordScreen}
        options={{
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: '600',
                }}>
                Forgot Password
              </Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={arrowLeft} />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={logoImg} style={{width: 28, height: 28}} />
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: '600',
                }}>
                BACKSTAGE
              </Text>
            </View>
          ),
          headerRight: () => (
            <Button
              onPress={() => signOut()}
              title={userInfo ? 'SignOut' : ''}
              color="#fff"
            />
          ),
        }}
      />
      <HomeStack.Screen name="EventDetail" component={EventDetailsScreen} />
      <HomeStack.Screen name="Privacy" component={PrivacyScreen} />
    </HomeStack.Navigator>
  );
};
