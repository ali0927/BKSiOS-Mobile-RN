import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {HomeHero} from '../components/homePage/homeHero';
import CollectionCarousel from '../components/homePage/collectionCarousel';
import EventsCarousel from '../components/homePage/eventsCarousel';
import BackstagersCarousel from '../components/homePage/backstagersCarousel';
import backImg from '../../assets/img/home/home-background.png';

export const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={backImg} style={styles.backImg} />
      <ScrollView>
        <View>
          <HomeHero navigation={navigation} />
        </View>
        <View>
          <Text style={styles.subtitle}>Hot Collections</Text>
          <CollectionCarousel />
        </View>
        <View>
          <Text style={styles.subtitle}>Latest Events</Text>
          <EventsCarousel navigation={navigation} />
        </View>
        <View>
          <Text style={styles.subtitle}>Backstagers</Text>
          <BackstagersCarousel />
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
  },
  subtitle: {
    color: 'white',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    textAlign: 'left',
    marginTop: 30,
    paddingLeft: 20,
  },
  divider: {
    width: '100%',
    backgroundColor: '#887bff',
    height: 2,
    marginTop: 50,
    marginBottom: 20,
  },
});
