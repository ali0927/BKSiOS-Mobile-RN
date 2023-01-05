import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {getAllCollections} from '../../helper/event';
// import badgeMark from '../../../assets/img/icons/verified.png';
import {useNavigation} from '@react-navigation/core';
import config from '../../helper/config';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const CollectionCard = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Collection', {item: item})}
      style={styles.cardContainer}>
      <Image
        style={styles.collectionImg}
        source={{
          uri:
            config.API_BASE_URL +
            '/api/upload/get_file?path=' +
            item.picture_large,
        }}
        key={item.id}
      />
      <View style={styles.collectionMeta}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AuthorProfile', {item: item})}
          style={styles.collectionAvatar}>
          <Image
            source={{
              uri:
                config.API_BASE_URL +
                '/api/upload/get_file?path=' +
                item.picture_small,
            }}
            style={styles.avatarImg}
          />
          {/* <Image source={badgeMark} style={styles.badgeMark} /> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AuthorProfile', {item: item})}>
          <Text
            style={styles.collectionName}
            ellipsizeMode="tail"
            numberOfLines={2}>
            {item.name}
          </Text>
        </TouchableOpacity>
        <Text style={styles.collectionNumber}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

const renderItem = ({item, index}) => {
  return <CollectionCard item={item} index={index} />;
};

const CollectionCarousel = ({navigation}) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getAllCollections().then(res => {
      if (res.success) {
        setCollections(res.collections);
      } else {
        console.log('ERROR:::', res);
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      {collections.length > 0 && (
        <Carousel
          data={collections}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
        />
      )}
    </View>
  );
};
export default CollectionCarousel;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    marginRight: 5,
    height: 340,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    overflow: 'hidden',
    borderWidth: 1,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  collectionImg: {
    height: 170,
  },
  collectionMeta: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 170,
    backgroundColor: '#14142f',
  },
  collectionAvatar: {
    borderRadius: 12,
    marginTop: -50,
    position: 'relative',
  },
  badgeMark: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#2f80ed',
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 2,
    width: 15,
    height: 15,
  },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.66)',
    marginBottom: 5,
  },
  collectionName: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    lineHeight: 24,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    marginVertical: 10,
    fontFamily: 'SpaceGrotesk-Medium',
  },
  collectionNumber: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 20,
    color: 'rgba(255, 255, 255, 0.66)',
    fontWeight: '400',
    fontFamily: 'SpaceGrotesk-Medium',
  },
});
