import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import img1 from '../../../assets/img/avatars/avatar2.jpg';
import img2 from '../../../assets/img/avatars/avatar4.jpg';
import img3 from '../../../assets/img/avatars/avatar5.jpg';
import img4 from '../../../assets/img/avatars/avatar7.jpg';
import img5 from '../../../assets/img/avatars/avatar8.jpg';
import img6 from '../../../assets/img/avatars/avatar10.jpg';
import img7 from '../../../assets/img/avatars/avatar11.jpg';
import img8 from '../../../assets/img/avatars/avatar13.jpg';
import img9 from '../../../assets/img/avatars/avatar14.jpg';
import img10 from '../../../assets/img/avatars/avatar15.jpg';

import badgeMark from '../../../assets/img/icons/verified.png';
import arrowRight from '../../../assets/img/icons/arrow-right.png';
import arrowLeft from '../../../assets/img/icons/arrow-left.png';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

const data = [
  {
    id: 1,
    img: img1,
    name: 'miriuuu',
  },
  {
    id: 2,
    img: img2,
    name: 'fantraingle',
  },
  {
    id: 3,
    img: img3,
    name: 'llllily',
  },
  {
    id: 4,
    img: img4,
    name: 'oxyoxy',
  },
  {
    id: 5,
    img: img5,
    name: '1one',
  },
  {
    id: 6,
    img: img6,
    name: 'sc00ty',
  },
  {
    id: 7,
    img: img7,
    name: 'nickname',
  },
  {
    id: 8,
    img: img8,
    name: 'johndoe',
  },
  {
    id: 9,
    img: img9,
    name: 'kateblank',
  },
  {
    id: 10,
    img: img10,
    name: 'redalert',
  },
];

const BackstagersCarousel = () => {
  const [isViewAll, setViewAll] = useState(false);
  const [viewData, setViewData] = useState(data);
  useEffect(() => {
    if (isViewAll) {
      setViewData(data);
    } else {
      let tempData = data;
      setViewData(tempData.slice(0, 4));
    }
  }, [isViewAll]);
  return (
    <View style={styles.container}>
      <View style={styles.extraBtn}>
        <Text style={styles.extraText} onPress={() => setViewAll(!isViewAll)}>
          {!isViewAll ? 'View All' : 'View Less'}
        </Text>
        <Image
          source={!isViewAll ? arrowRight : arrowLeft}
          width={16}
          height={16}
          style={styles.arrowImg}
        />
      </View>

      {viewData &&
        viewData.map((item, i) => (
          <TouchableOpacity style={styles.cardContainer} key={item.id}>
            <Text style={styles.index}>{i + 1}</Text>
            <Image source={item.img} style={styles.img} />
            <Text style={styles.name}>@ {item.name}</Text>
            <Image source={badgeMark} style={styles.badgeMark} />
          </TouchableOpacity>
        ))}
    </View>
  );
};
export default BackstagersCarousel;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    margin: 20,
    marginTop: 10,
    marginBottom: 100,
  },
  extraBtn: {
    position: 'absolute',
    right: 0,
    top: -30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  extraText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    fontWeight: '400',
    color: '#fff',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 20,
    marginVertical: 8,
    width: '100%',
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
  },
  arrowImg: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  name: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginRight: 10,
  },
  index: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    marginRight: 20,
  },
  badgeMark: {
    backgroundColor: '#2f80ed',
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
    width: 16,
    height: 16,
  },
});
