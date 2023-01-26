import {useNavigation} from '@react-navigation/core';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
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
import searchTopImg from '../../../assets/img/icons/search-top.png';
import {EventDetailsScreen} from '../../pages/eventDetails';
// import {PrivacyScreen} from '../../pages/signPage/privacy';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {ExplorerScreen} from '../../pages/explorer';

const ExplorerStack = createNativeStackNavigator();
const windowWidth = Dimensions.get('window').width;
export const ExplorerStackScreen = () => {
  const [focusedItem, setFocusedItem] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const navigation = useNavigation();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const handleChange = value => {
    setSearchValue(value);
    dispatch({type: 'SET_SEARCH_INFO', payload: value});
  };
  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Explorer')}>
          <Image source={arrowLeft} />
        </TouchableOpacity>
        <Text style={styles.titleText}>{t('item')}</Text>
        <View style={{width: 60}} />
      </View>
    );
  };

  return (
    <ExplorerStack.Navigator
      initialRouteName="Explorer"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#14142f',
          headerShown: false,
        },
      }}>
      <ExplorerStack.Screen
        name="Explorer"
        component={ExplorerScreen}
        options={{
          tabBarLabel: t('explore'),
          headerTitle: () => (
            <View
              style={{
                alignItems: 'center',
                width: windowWidth - 40,
                paddingVertical: 15,
              }}>
              <Text style={styles.headerTitle}>{t('explore')}</Text>
              <View style={styles.searchContainer}>
                <TextInput
                  onFocus={() => setFocusedItem(true)}
                  onBlur={() => setFocusedItem(false)}
                  placeholder={t('search items, collections, and creators')}
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
          //   headerShown: false,
          headerBackVisible: false,
        }}
      />
      <ExplorerStack.Screen
        name="EventDetail"
        component={EventDetailsScreen}
        options={{
          headerTitle: () => <Header title={t('item')} />,
          headerBackVisible: false,
        }}
      />
    </ExplorerStack.Navigator>
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
});
