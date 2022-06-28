import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {getAllCollections} from '../../helper/event';
import badgeMark from '../../../assets/img/icons/verified.png';
import {useNavigation} from '@react-navigation/core';
import config from '../../helper/config';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.4);

const CollectionCard = ({item}) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('AuthorProfile', {item: item})}>
        <View style={styles.container}>
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
            <View style={styles.collectionAvatar}>
              <Image
                source={{
                  uri:
                    config.API_BASE_URL +
                    '/api/upload/get_file?path=' +
                    item.picture_small,
                }}
                style={styles.avatarImg}
              />
              <Image source={badgeMark} style={styles.badgeMark} />
            </View>
            <Text
              style={styles.collectionName}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.collectionNumber}>{item.category}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
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
    <View style={{marginVertical: 10}}>
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
    flex: 1,
    justifyContent: 'flex-end',
    width: 140,
    marginRight: 5,
    height: 140,
    borderRadius: 12,
    backgroundColor: 'pink',
    overflow: 'hidden',
  },
  collectionImg: {
    height: 80,
  },
  collectionMeta: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#14142f',
    borderWidth: 1,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderColor: '#ffffff44',
  },
  collectionAvatar: {
    borderRadius: 12,
    marginTop: -25,
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
    width: 40,
    height: 40,
    borderColor: '#14142f',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#d878e1',
  },
  collectionName: {
    width: '80%',
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    marginVertical: 10,
    fontWeight: '700',
  },
  collectionNumber: {
    width: '100%',
    textAlign: 'center',
    fontSize: 10,
    color: '#bdbdbd',
    fontWeight: '500',
  },
});
