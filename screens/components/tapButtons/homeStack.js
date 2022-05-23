import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUpScreen } from "../../pages/signPage/signUp";
import {SignInScreen} from "../../pages/signPage/signIn";
import { ForgetPasswordScreen } from "../../pages/signPage/ForgetPassword";
import { HomeScreen } from "../../pages/home";
import { EventDetailsScreen } from "../../pages/eventDetails";

const HomeStack = createNativeStackNavigator();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="SignIn" component={SignInScreen} />
      <HomeStack.Screen name="SignUp" component={SignUpScreen} />
      <HomeStack.Screen name="ForgetPassword" component={ForgetPasswordScreen}/>
      <HomeStack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }} />
      <HomeStack.Screen name="EventDetail" component={EventDetailsScreen}/>
    </HomeStack.Navigator>
  );
}