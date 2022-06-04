import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUpScreen} from '../../pages/signPage/signUp';
import {SignInScreen} from '../../pages/signPage/signIn';
import {ForgetPasswordScreen} from '../../pages/signPage/ForgetPassword';
import {PrivacyScreen} from '../../pages/signPage/privacy';
import {HomeScreen} from '../../pages/home';
import {EventDetailsScreen} from '../../pages/eventDetails';
import {useNavigation} from '@react-navigation/core';
import logoImg from '../../../assets/img/icons/logo.png';
import arrowLeft from '../../../assets/img/icons/arrow-left.png';
import {ProfileAuthorScreen} from '../../pages/profileAuthor';

const HomeStack = createNativeStackNavigator();
const THEME_COLOR = '#14142f';

export const HomeStackScreen = () => {
  const navigation = useNavigation();

  return (
    <HomeStack.Navigator
      initialRouteName="HomeMain"
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
        name="HomeMain"
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
        }}
      />
      <HomeStack.Screen
        name="EventDetail"
        component={EventDetailsScreen}
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
                Item
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
        name="AuthorProfile"
        component={ProfileAuthorScreen}
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
                Profile
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
      <HomeStack.Screen name="Privacy" component={PrivacyScreen} />
    </HomeStack.Navigator>
  );
};
