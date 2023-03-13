import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import arrowLeft from '../../../assets/img/icons/arrow-left.png';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {SearchScreen} from '../../pages/search';
import SearchActImg from '../../../assets/img/icons/search-act.svg';
import SearchTopImg from '../../../assets/img/icons/search-top.svg';
import SearchImg from '../../../assets/img/icons/search.svg';
import {ProfileAuthor1Screen} from '../../pages/profileAuthor1';
import {EventDetails1Screen} from '../../pages/eventDetails1';

const THEME_COLOR = '#14142f';
const SearchStack = createNativeStackNavigator();
const windowWidth = Dimensions.get('window').width;
export const SearchStackScreen = () => {
  const [focusedItem, setFocusedItem] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const navigation = useNavigation();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const handleChange = value => {
    setSearchValue(value);
    dispatch({type: 'SET_SEARCH_INFO', payload: value});
  };

  const Header = ({title, goTo}) => {
    const currentCollection = useSelector(
      state => state.collectionInfoReducer,
    ).currentCollection;
    console.log('Current Collection:', currentCollection);
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() =>
            goTo === 'SearchMain'
              ? navigation.navigate('SearchMain')
              : navigation.navigate('AuthorProfile1', {item: currentCollection})
          }>
          <Image source={arrowLeft} />
        </TouchableOpacity>
        <Text style={styles.titleText}>{title}</Text>
        <View style={{width: 60}} />
      </View>
    );
  };
  useEffect(() => {
    navigation.addListener('tabPress', e => {
      dispatch({type: 'SET_TAB_INFO', payload: 'Explore'});
    });
  }, [navigation]);
  return (
    <SearchStack.Navigator
      initialRouteName="SearchMain"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#14142f',
          headerShown: false,
        },
      }}>
      <SearchStack.Screen
        name="SearchMain"
        component={SearchScreen}
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
          headerStyle: styles.headerStyle,
        }}
      />
      <SearchStack.Screen
        name="AuthorProfile1"
        component={ProfileAuthor1Screen}
        options={{
          headerTitle: () => (
            <Header title={t('profile')} goTo={'SearchMain'} />
          ),
          headerBackVisible: false,
        }}
      />
      <SearchStack.Screen
        name="EventDetail1"
        component={EventDetails1Screen}
        options={{
          headerTitle: () => (
            <Header title={t('item')} goTo={'AuthorProfile1'} />
          ),
          headerBackVisible: false,
        }}
      />
    </SearchStack.Navigator>
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
    fontWeight: '700',
    textAlign: 'right',
    letterSpacing: 1.03,
  },
  searchContainer: {
    width: windowWidth - 20,
    position: 'relative',
    borderRadius: 4,
    height: 36,
    width: '100%',
  },
  searchImage: {
    position: 'absolute',
    top: 5,
    left: 10,
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
    // shadowColor: '#6a4dfd',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.8,
    // shadowRadius: 5,
    // borderColor: '#6a4dfd',
    // border: 'none',
    borderColor: 'transparent',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    width: windowWidth - 35,
    // width: 350,
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
  headerTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    marginBottom: 10,
    letterSpacing: 2,
  },
  headerStyle: {
    height: 100,
    backgroundColor: THEME_COLOR,
  },
});
