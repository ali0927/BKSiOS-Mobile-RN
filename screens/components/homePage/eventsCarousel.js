import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/core';
import {getLatestEventCards} from '../../helper/event';
import Countdown from 'react-countdown';
import likeImg from '../../../assets/img/icons/liked-white.png';
import config from '../../helper/config';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const CompletionList = () => <Text style={styles.leftTime}>EVENT STARTED</Text>;

const pad = (num, size = 2) => {
  const s = '000000000' + num;
  return s.substr(s.length - size);
};

const renderer = ({days, hours, minutes, seconds, completed}) => {
  if (completed) {
    return <CompletionList />;
  } else {
    return (
      <Text style={styles.leftTime}>
        {days} DAYS {pad(hours)}h {pad(minutes)}m {pad(seconds)}s
      </Text>
    );
  }
};

const EventCountDown = ({date}) => {
  const d = new Date(date);
  return <Countdown date={d} renderer={renderer} />;
};

const EventCard = ({item}) => {
  const navigation = useNavigation();
  const addons = item.addons === '' ? [] : JSON.parse(item.addons);
  let addonPrice = 0;
  addons.forEach(addon => {
    addonPrice += Number(addon.price);
  });

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('EventDetail', {item: item})}
      style={styles.cardContainer}>
      <Image
        source={{
          uri:
            config.API_BASE_URL +
            '/api/upload/get_file?path=' +
            item.picture_small,
        }}
        style={styles.img}
      />
      <View style={styles.collectionMeta}>
        <Text style={styles.name}>{item.name}</Text>
        <EventCountDown date={new Date(item.date).toISOString()} />
        <View style={styles.details}>
          <View style={styles.detailContainer}>
            <Text style={styles.info}>Date </Text>
            <Text style={styles.infoVal}>
              {new Date(item.date).toISOString().toString().split('T')[0]}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.info}>Location</Text>
            <Text style={styles.infoVal}>{item.location}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.footerDetails}>
          <View>
            <Text style={styles.info}>Current price</Text>
            <Text style={styles.price}>{item.price + addonPrice} €</Text>
          </View>
          <Image source={likeImg} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const renderItem = ({item, index}) => {
  return <EventCard item={item} index={index} />;
};

const EventsCarousel = () => {
  const [latestEvents, setLatestEvents] = useState([]);

  useEffect(() => {
    getLatestEventCards().then(res => {
      if (res.success) {
        setLatestEvents(res.eventcards);
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      {latestEvents && (
        <Carousel
          data={latestEvents}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
        />
      )}
    </View>
  );
};
export default EventsCarousel;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 15,
    width: '100%',
    marginRight: 30,
    borderRadius: 12,
  },
  img: {
    width: '100%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    height: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  leftTime: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 10,
    lineHeight: 16,
    color: '#fff',
    fontWeight: '400',
    letterSpacing: 2,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#6a4dfd',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  collectionMeta: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
    paddingLeft: 0,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  details: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 10,
  },
  detailContainer: {
    width: '50%',
  },
  divider: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    height: 1,
    marginTop: 10,
    marginBottom: 20,
  },
  footerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontFamily: 'SpaceGrotesk-Medium',
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
  },
  info: {
    fontFamily: 'SpaceGrotesk-Medium',
    width: '100%',
    textAlign: 'left',
    fontSize: 10,
    lineHeight: 12,
    color: 'rgba(255, 255, 255, 0.66)',
    fontWeight: '400',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  infoVal: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginTop: 7,
  },
  price: {
    textAlign: 'left',
    fontSize: 24,
    marginTop: 5,
    color: '#fff',
    letterSpacing: 1,
    fontWeight: '700',
  },
});
