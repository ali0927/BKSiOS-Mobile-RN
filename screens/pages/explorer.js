import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import img1 from '../../assets/img/cover/cover3.jpg';
import img2 from '../../assets/img/cover/cover4.jpg';
import img3 from '../../assets/img/cover/cover5.jpg';
import img4 from '../../assets/img/cover/cover6.jpg';
import img5 from '../../assets/img/cover/cover7.jpg';
import img6 from '../../assets/img/cover/cover8.jpg';
import img7 from '../../assets/img/cover/cover3.jpg';
import img8 from '../../assets/img/cover/cover4.jpg';
import img9 from '../../assets/img/cover/cover5.jpg';
import avaImg1 from '../../assets/img/avatars/avatar.jpg';
import avaImg2 from '../../assets/img/avatars/avatar2.jpg';
import avaImg3 from '../../assets/img/avatars/avatar3.jpg';
import avaImg4 from '../../assets/img/avatars/avatar4.jpg';
import avaImg5 from '../../assets/img/avatars/avatar5.jpg';
import avaImg6 from '../../assets/img/avatars/avatar6.jpg';
import avaImg7 from '../../assets/img/avatars/avatar7.jpg';
import avaImg8 from '../../assets/img/avatars/avatar8.jpg';
import avaImg9 from '../../assets/img/avatars/avatar9.jpg';
import badgeMark from '../../assets/img/icons/verified.png';
import likedImg from '../../assets/img/icons/like-empty.png';
export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

const data = [
  {
    id: 1,
    img: img4,
    avatar: avaImg1,
    name: 'Fed3',
    owner: 'Admin',
    price: 3,
  },
  {
    id: 2,
    img: img2,
    avatar: avaImg2,
    name: 'Fed3',
    owner: 'Admin',
    price: 2,
  },
  {
    id: 3,
    img: img3,
    avatar: avaImg3,
    name: 'Fed3',
    owner: 'Admin',
    price: 4,
  },
  {
    id: 4,
    img: img4,
    avatar: avaImg4,
    name: 'Fed3',
    owner: 'Admin',
    price: 3,
  },
  {
    id: 5,
    img: img5,
    avatar: avaImg5,
    name: 'Fed3',
    owner: 'Admin',
    price: 2,
  },
  {
    id: 6,
    img: img6,
    avatar: avaImg6,
    name: 'Fed3',
    owner: 'Admin',
    price: 4,
  },
  {
    id: 7,
    img: img7,
    avatar: avaImg7,
    name: 'Fed3',
    owner: 'Admin',
    price: 3,
  },
  {
    id: 8,
    img: img8,
    avatar: avaImg8,
    name: 'Fed3',
    owner: 'Admin',
    price: 1,
  },
  {
    id: 9,
    img: img9,
    avatar: avaImg9,
    name: 'Fed3',
    owner: 'Admin',
    price: 2,
  },
];

export const ExplorerScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {data.map(item => (
        <View style={styles.itemContainer} key={item.id}>
          <View style={styles.imageDiv}>
            <Image source={item.img} style={styles.img} />
          </View>
          <View style={styles.collectionMeta}>
            <View style={styles.detail}></View>
            <Text style={styles.name}>{item.name}</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
              }}>
              <View>
                <Text style={styles.info}>Collection</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginRight: 40,
                  }}>
                  <Image source={item.avatar} style={styles.avatar} />
                  <Text style={styles.owner}>{item.owner}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.info}>Creator</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <Image source={avaImg6} style={styles.avatar} />
                  <Text style={styles.owner}>Antonio</Text>
                  <Image source={badgeMark} style={styles.badgeMark} />
                </View>
              </View>
            </View>

            <View style={styles.divider}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: "center",
                width: '100%',
              }}>
              <View>
                <Text
                  style={{
                    ...styles.info,
                    marginBottom: 0,
                    marginTop: 0,
                    width: '100%',
                  }}>
                  Reserve Price
                </Text>
                <Text style={styles.price}>{item.price} &#8364;</Text>
              </View>
              <Image source={likedImg} />
              {/* <Text style={styles.price}>&#9825;</Text> */}
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
    margin: 'auto',
    overflow: 'hidden',
    padding: 20,
  },
  itemContainer: {
    marginTop: 30,
    height: 440,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
    borderRadius: 12,
  },
  img: {
    width: '100%',
    borderRadius: 16,
  },
  imageDiv: {
    position: 'relative',
    height: 220,
    overflow: 'hidden',
  },
  collectionMeta: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  divider: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    height: 2,
    marginTop: 20,
    marginBottom: 20,
  },
  name: {
    width: '100%',
    textAlign: 'left',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0.5,
    color: '#fff',
    marginBottom: 10,
  },
  info: {
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
    marginTop: 15,
  },
  owner: {
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 20,
    color: '#fff',
    fontWeight: '700',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  price: {
    textAlign: 'left',
    fontSize: 24,
    marginTop: 0,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  badgeMark: {
    backgroundColor: '#2f80ed',
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
    width: 16,
    height: 16,
    marginLeft: 10,
  },
});
