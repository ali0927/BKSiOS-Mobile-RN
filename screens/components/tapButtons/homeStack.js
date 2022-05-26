import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUpScreen} from '../../pages/signPage/signUp';
import {SignInScreen} from '../../pages/signPage/signIn';
import {ForgetPasswordScreen} from '../../pages/signPage/ForgetPassword';
import { PrivacyScreen } from '../../pages/signPage/privacy';
import {HomeScreen} from '../../pages/home';
import {EventDetailsScreen} from '../../pages/eventDetails';
import {Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

const HomeStack = createNativeStackNavigator();

export const HomeStackScreen = () => {
  const userInfo = useSelector(state => state.userInfoReducer).userInfo;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const signOut = () => {
    if(userInfo) {
      dispatch({type: 'CLEAR_USER_INFO'})
    } else {
      navigation.navigate('SignIn');
    }
  };
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="SignIn" component={SignInScreen} />
      <HomeStack.Screen name="SignUp" component={SignUpScreen} />
      <HomeStack.Screen
        name="ForgetPassword"
        component={ForgetPasswordScreen}
      />
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerRight: () => (
            <Button
              onPress={() => signOut()}
              title={userInfo ? 'SignOut' : 'SignIn'}
              color="#000"
            />
          ),
        }}
      />
      <HomeStack.Screen name="EventDetail" component={EventDetailsScreen} />
      <HomeStack.Screen name="Privacy" component={PrivacyScreen} />
    </HomeStack.Navigator>
  );
};
