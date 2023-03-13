import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HomeActImg from '../../../assets/img/icons/home-act.svg';
import HomeImg from '../../../assets/img/icons/home.svg';
import MenuActImg from '../../../assets/img/icons/menu-act.svg';
import MenuImg from '../../../assets/img/icons/menu.svg';
import NewsActImg from '../../../assets/img/icons/news-act.svg';
import NewsImg from '../../../assets/img/icons/news.svg';
import SearchActImg from '../../../assets/img/icons/search-act.svg';
import SearchTopImg from '../../../assets/img/icons/search-top.svg';
import SearchImg from '../../../assets/img/icons/search.svg';
import {HomeStackScreen} from './homeStack';
import {SearchStackScreen} from './searchStack';
import {MenuStackScreen} from './menuStack';
import {NewsStackScreen} from './newsStack';

const Tab = createBottomTabNavigator();
const THEME_COLOR = '#14142f';
const windowWidth = Dimensions.get('window').width;

export default function MainTabs() {
  const [focusedItem, setFocusedItem] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const countryInfo = useSelector(
    state => state.locationInfoReducer,
  ).locationInfo;

  const handleChange = value => {
    setSearchValue(value);
    dispatch({type: 'SET_SEARCH_INFO', payload: value});
  };

  useEffect(() => {
    console.log('CountryInfo:', countryInfo);
    if (countryInfo === 'TR') {
      i18n.changeLanguage('tr');
    } else {
      i18n.changeLanguage('en');
    }
  }, [countryInfo]);

  const getRate = async () => {
    const config = {
      method: 'get',
      url: 'https://api.apilayer.com/exchangerates_data/latest?base=EUR&symbols=TRY,GBP,USD',
      headers: {
        apikey: '8VsK9lieiuTIQ49CLs4aIoP5jAmLawjT',
      },
    };
    const res = await axios(config);
    console.log('Get Rate: ', res.data.rates);
    dispatch({type: 'SET_RATE_TRY', payload: res.data.rates.TRY});
    dispatch({type: 'SET_RATE_GBP', payload: res.data.rates.GBP});
    dispatch({type: 'SET_RATE_USD', payload: res.data.rates.USD});
  };

  const getIPaddress = async () => {
    const request = await fetch('https://ipinfo.io/json?token=eb1a719d60ef95');
    const json = await request.json();
    console.log('location: ', json.country);
    dispatch({type: 'SET_LOCATION_INFO', payload: json.country});
  };

  useEffect(() => {
    getIPaddress();
    getRate();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#6a4dfd',
            tabBarInactiveTintColor: '#797e89',
            tabBarStyle: styles.tabBarStyle,
            tabBarLabelStyle: styles.tabBarLabelStyle,
          }}>
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarLabel: t('home'),
              tabBarIcon: status =>
                status.focused ? <HomeActImg /> : <HomeImg />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchStackScreen}
            options={{
              tabBarLabel: t('explore'),
              headerTitle: () => (
                <View style={{alignItems: 'center', width: windowWidth - 30}}>
                  <Text style={styles.headerTitle}>{t('explore')}</Text>
                  <View style={styles.searchContainer}>
                    <TextInput
                      onFocus={() => setFocusedItem(true)}
                      onBlur={() => setFocusedItem(false)}
                      placeholder={t('explore')}
                      placeholderTextColor=" rgba(255, 255, 255, 0.33)"
                      style={focusedItem ? styles.inputOnFocus : styles.input}
                      value={searchValue}
                      autoCapitalize="none"
                      onChangeText={val => handleChange(val.toLowerCase())}
                    />
                    <SearchTopImg style={styles.searchImage} />
                  </View>
                </View>
              ),
              tabBarIcon: status =>
                status.focused ? <SearchActImg /> : <SearchImg />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="News"
            component={NewsStackScreen}
            options={{
              tabBarLabel: t('news'),
              tabBarIcon: status =>
                status.focused ? <NewsActImg /> : <NewsImg />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="More"
            component={MenuStackScreen}
            options={{
              tabBarLabel: t('more'),
              tabBarIcon: status =>
                status.focused ? <MenuActImg /> : <MenuImg />,
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: THEME_COLOR,
    paddingBottom: 30,
    marginBottom: Platform.OS === 'ios' ? -35 : -20,
    height: 80,
  },
  tabBarLabelStyle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '700',
    letterSpacing: -0.1,
  },
  headerStyle: {
    height: 100,
    backgroundColor: THEME_COLOR,
  },
  container: {
    flex: 1,
    backgroundColor: THEME_COLOR,
  },
  headerTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 20,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    lineHeight: 26,
    marginBottom: 10,
    letterSpacing: 2,
  },
  searchContainer: {
    width: windowWidth - 20,
    position: 'relative',
    borderRadius: 4,
    height: 36,
    width: '100%',
  },
  input: {
    width: windowWidth - 35,
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
    borderColor: 'transparent',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    width: windowWidth - 35,
    height: 36,
    borderWidth: 1,
    padding: 8,
    paddingLeft: 45,
    color: 'white',
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  searchImage: {
    position: 'absolute',
    top: 5,
    left: 10,
  },
});
