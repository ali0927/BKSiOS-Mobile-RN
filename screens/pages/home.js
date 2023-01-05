import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import {useDispatch} from 'react-redux';
import backImg from '../../assets/img/home/home-background.png';
import CollectionCarousel from '../components/homePage/collectionCarousel';
import EventsArtsCarousel from '../components/homePage/eventsArtsCarousel';
import EventsCarousel from '../components/homePage/eventsCarousel';
import EventsServicesCarousel from '../components/homePage/eventsServicesCarousel';
import {HomeHero} from '../components/homePage/homeHero';

const deviceWidth = Dimensions.get('window').width;
export const HomeScreen = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const getData = async () => {
    // get Data from Storage
    try {
      const data = await AsyncStorage.getItem('userInfo');
      if (data !== null) {
        console.log('Saved AsyncStorage Data:::', data);
        dispatch({type: 'SET_USER_INFO', payload: data});
        // return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  // const result = AsyncStorage.getItem('userInfo');
  // dispatch({type: 'SET_USER_INFO', payload: JSON.stringify(result)});
  return (
    <View style={styles.container}>
      <Image source={backImg} style={styles.backImg} />
      <ScrollView>
        <View>
          <HomeHero navigation={navigation} />
        </View>
        <View>
          <Text style={styles.subtitle}>{t('hot collections')}</Text>
          <CollectionCarousel />
        </View>
        <View>
          <Text style={styles.subtitle}>{t('latest events')}</Text>
          <EventsCarousel navigation={navigation} />
        </View>
        <View>
          <Text style={styles.subtitle}>{t('latest digital arts')}</Text>
          <EventsArtsCarousel navigation={navigation} />
        </View>
        <View>
          <Text style={styles.subtitle}>{t('latest services')}</Text>
          <EventsServicesCarousel navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
  },
  backImg: {
    position: 'absolute',
    width: deviceWidth,
  },
  subtitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    textAlign: 'left',
    marginTop: 30,
    paddingLeft: 20,
  },
});
