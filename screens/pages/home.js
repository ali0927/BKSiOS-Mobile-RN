import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {HomeHero} from '../components/homeHero';
import CollectionCarousel from '../components/collectionCarousel';
import {windowHeight} from '../../config/config';
import EventsCarousel from '../components/eventsCarousel';
import BackstagersCarousel from '../components/backstagersCarousel';
import ExploreCarousel from '../components/exploreCarousel';
import GetStarted from '../components/getStarted';

export const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <HomeHero />
      </View>
      <View>
        <Text style={styles.subtitle}>Hot Collections</Text>
        <CollectionCarousel />
      </View>
      <View>
        <Text style={styles.subtitle}>Latest Events</Text>
        <EventsCarousel />
      </View>
      <View>
        <Text style={styles.subtitle}>Backstagers</Text>
        <BackstagersCarousel />
      </View>
      <View>
        <Text style={styles.subtitle}>Explore</Text>
        <ExploreCarousel />
      </View>
      <View>
        <Text style={styles.subtitle}>Get started creating & selling your NFTs</Text>
        <GetStarted />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: windowHeight,
    backgroundColor: '#14142f',
  },
  subtitle: {
    color: 'white',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },
  
});
