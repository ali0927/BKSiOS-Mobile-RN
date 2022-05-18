import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {collectionList} from '../constant/collections';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

const renderItem = ({item}) => {
  return (
    <ImageBackground
      style={styles.container}
      source={item.picture_small}
      resizeMode="cover">
      <View style={styles.collectionMeta}>
        <View style={styles.collectionAvatar}>
          <Image source={item.creator.avatar} style={styles.avatarImg} />
        </View>
        <Text style={styles.collectionName}>{item.name}</Text>
        <Text style={styles.collectionNumber}>{item.category}</Text>
      </View>
    </ImageBackground>
  );
};

const CollectionCarousel = () => {
  return (
    <View style={{marginVertical: 10}}>
      <Carousel
        data={collectionList}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
      />
    </View>
  );
};
export default CollectionCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    width: '100%',
    marginRight: 30,
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
  },
  collectionMeta: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingTop: 0,
    paddingBottom: 20,
    paddingLeft: 0,
    backgroundColor: '#14142f',
    borderWidth: 1,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderColor: '#887bff',
  },
  collectionAvatar: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginTop: -30,
    marginBottom: 10,
    position: 'relative',
  },
  avatarImg: {
    width: '100%',
    height: "100%",
    borderRadius: 16,
    border: '1px solid #14142f',
  },
  collectionName: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    marginBottom: 5,
  },
  collectionNumber: {
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    color: '#bdbdbd',
    fontWeight: '400',
  },
});
