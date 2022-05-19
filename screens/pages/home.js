import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {HomeHero} from '../components/homePage/homeHero';
import CollectionCarousel from '../components/homePage/collectionCarousel';
import EventsCarousel from '../components/homePage/eventsCarousel';
import BackstagersCarousel from '../components/homePage/backstagersCarousel';
import ExploreCarousel from '../components/homePage/exploreCarousel';
import GetStarted from '../components/getStarted';

export const HomeScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <HomeHero navigation = {navigation}/>
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
        <View style={styles.divider}></View>
        <Text style={styles.subtitle}>Get started creating & selling your NFTs</Text>
        <GetStarted />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  divider: {
    width: "100%",
    backgroundColor: "#887bff",
    height: 2,
    marginTop: 50,
    marginBottom: 20
  },
});
