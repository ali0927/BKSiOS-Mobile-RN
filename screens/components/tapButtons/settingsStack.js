import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUpScreen } from "../../pages/signPage/signUp";
import {SignInScreen} from "../../pages/signPage/signIn";
import { ForgetPasswordScreen } from "../../pages/signPage/ForgetPassword";
import { ProfileScreen } from "../../pages/profile";

const SettingsStack = createNativeStackNavigator();

export const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Profile" component={ProfileScreen} />
    </SettingsStack.Navigator>
  );
}