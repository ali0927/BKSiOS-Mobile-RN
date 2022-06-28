import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ExplorerScreen} from '../../pages/explorer';
import {NewsStackScreen} from './newsStack';
import {HomeStackScreen} from './homeStack';
import {SearchScreen} from '../../pages/search';
import homeImg from '../../../assets/img/icons/home.png';
import homeActImg from '../../../assets/img/icons/home-act.png';
import searchImg from '../../../assets/img/icons/search.png';
import searchTopImg from '../../../assets/img/icons/search-top.png';
import searchActImg from '../../../assets/img/icons/search-act.png';
import menuImg from '../../../assets/img/icons/menu.png';
import menuActImg from '../../../assets/img/icons/menu-act.png';
import exploreImg from '../../../assets/img/icons/explore.png';
import exploreActImg from '../../../assets/img/icons/explore-act.png';
import newsImg from '../../../assets/img/icons/news.png';
import newsActImg from '../../../assets/img/icons/news-act.png';
import {MenuStackScreen} from './menuStack';

const Tab = createBottomTabNavigator();
const THEME_COLOR = '#14142f';
const THEME_SEC_COLOR = '#887bff';

export default function MainTabs() {
  const [focusedItem, setFocusedItem] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [searchValidation, setSearchValidation] = useState('');
  const handleChange = value => {
    setSearchValue(value);
  };

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
              height: 80,
            },
          }}>
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: status => (
                <Image source={status.focused ? homeActImg : homeImg} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
              tabBarLabel: 'Search',
              headerTitle: () => (
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.headerTitle}>Search</Text>
                  <View style={styles.searchContainer}>
                    <TextInput
                      onFocus={() => setFocusedItem(true)}
                      onBlur={() => setFocusedItem(false)}
                      placeholder="Search collections, items or users"
                      placeholderTextColor=" rgba(255, 255, 255, 0.33)"
                      style={focusedItem ? styles.inputOnFocus : styles.input}
                      value={searchValue}
                      autoCapitalize="none"
                      onChangeText={val => handleChange(val.toLowerCase())}
                    />
                    <Image source={searchTopImg} style={styles.searchImage} />
                  </View>
                </View>
              ),
              tabBarIcon: status => (
                <Image source={status.focused ? searchActImg : searchImg} />
              ),
              headerStyle: {
                height: 100,
                backgroundColor: THEME_COLOR,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Tab.Screen
            name="Explore"
            component={ExplorerScreen}
            options={{
              tabBarLabel: 'Explore',
              headerTitle: () => (
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.headerTitle}>Explore</Text>
                  <View style={styles.searchContainer}>
                    <TextInput
                      onFocus={() => setFocusedItem(true)}
                      onBlur={() => setFocusedItem(false)}
                      placeholder="Search collections, items or users"
                      placeholderTextColor=" rgba(255, 255, 255, 0.33)"
                      style={focusedItem ? styles.inputOnFocus : styles.input}
                      value={searchValue}
                      autoCapitalize="none"
                      onChangeText={val => handleChange(val.toLowerCase())}
                    />
                    <Image source={searchTopImg} style={styles.searchImage} />
                  </View>
                </View>
              ),
              tabBarIcon: status => (
                <Image source={status.focused ? exploreActImg : exploreImg} />
              ),
              headerStyle: {
                height: 100,
                backgroundColor: THEME_COLOR,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Tab.Screen
            name="News"
            component={NewsStackScreen}
            options={{
              tabBarLabel: 'News',
              tabBarIcon: status => (
                <Image source={status.focused ? newsActImg : newsImg} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="More"
            component={MenuStackScreen}
            options={{
              tabBarLabel: 'More',
              tabBarIcon: status => (
                <Image source={status.focused ? menuActImg : menuImg} />
              ),
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
  headerTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    marginBottom: 10,
    letterSpacing: 2,
  },
  searchContainer: {
    position: 'relative',
    borderRadius: 4,
    height: 36,
    width: '100%',
  },
  input: {
    width: 350,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: 8,
    paddingLeft: 45,
    color: 'white',
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  inputOnFocus: {
    // shadowColor: '#6a4dfd',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.8,
    // shadowRadius: 5,
    // borderColor: '#6a4dfd',
    border: 'none',
    borderColor: 'transparent',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    width: 350,
    height: 36,
    borderWidth: 1,
    padding: 8,
    paddingLeft: 45,
    color: 'white',
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  inputText: {
    color: '#fff',
  },
  searchImage: {
    position: 'absolute',
    top: 5,
    left: 10,
  },
});
