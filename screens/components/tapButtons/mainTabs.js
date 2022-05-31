import * as React from 'react';
import {Image, StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ExplorerScreen} from '../../pages/explorer';
import {NewsScreen} from '../../pages/news';
import {NewsStackScreen} from './newsStack';
import {HomeStackScreen} from './homeStack';
import {AuthorScreen} from '../../pages/author';
import asdf from '../../../assets/img/avatars/avatar.jpg';
import homeImg from '../../../assets/img/icons/home.png';
import homeActImg from '../../../assets/img/icons/home-act.png';
import searchImg from '../../../assets/img/icons/search.png';
import searchActImg from '../../../assets/img/icons/search-act.png';
import menuImg from '../../../assets/img/icons/menu.png';
import menuActImg from '../../../assets/img/icons/menu-act.png';
import moveImg from '../../../assets/img/icons/move.png';
import moveActImg from '../../../assets/img/icons/move-act.png';
import bookImg from '../../../assets/img/icons/book-open.png';
import bookActImg from '../../../assets/img/icons/book-open-act.png';
import {useNavigation} from '@react-navigation/core';

const Tab = createBottomTabNavigator();
const THEME_COLOR = '#14142f';
const THEME_SEC_COLOR = '#887bff';

export default function MainTabs() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: THEME_SEC_COLOR,
            tabBarStyle: {
              backgroundColor: THEME_COLOR,
              paddingBottom: 30,
              marginBottom: -35,
              height: 80
            },
          }}>
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: status =><Image source={status.focused ? homeActImg : homeImg} />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Search"
            component={ExplorerScreen}
            options={{
              tabBarLabel: 'Search',
              tabBarIcon: (status) => <Image source={status.focused ? searchActImg : searchImg} />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Explore"
            component={NewsStackScreen}
            options={{
              tabBarLabel: 'Explore',
              tabBarIcon: (status) => <Image source={status.focused ? moveActImg : moveImg} />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="News"
            component={AuthorScreen}
            options={{
              tabBarLabel: 'News',
              tabBarIcon: status => <Image source={status.focused ? bookActImg : bookImg} />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="More"
            component={AuthorScreen}
            options={{
              tabBarLabel: 'More',
              tabBarIcon: (status) => <Image source={status.focused ? menuActImg : menuImg} />,
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: THEME_COLOR,
    backgroundColor: THEME_COLOR,
  },
});
