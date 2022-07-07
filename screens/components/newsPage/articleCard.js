import React from 'react';
import DateObject from 'react-date-object';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import messageImg from '../../../assets/img/icons/message.png';
import clockImg from '../../../assets/img/icons/clock.png';
import {useNavigation} from '@react-navigation/core';
import config from '../../helper/config';

export const ArticleCard = data => {
  const navigation = useNavigation();
  const dateString = d => {
    var date = new DateObject({
      date: new Date(d),
    });
    return date.format('MMMM DD, YYYY');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('NewsDetail', {id: data.item.id})}>
        <Image
          source={{
            uri:
              config.API_BASE_URL +
              '/api/upload/get_file?path=' +
              data.item.image,
          }}
          style={styles.backImg}
        />
      </TouchableOpacity>
      <View style={styles.metaData}>
        <View>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => console.log('Clicked News Button')}>
            <Text style={styles.categoryBtnTxt}>News</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('NewsDetail', {id: data.item.id})
            }>
            <Text style={styles.articleTitle} numberOfLines={3}>
              {data.item.title}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardFooterContainer}>
          <View style={styles.flexRow}>
            <Image source={clockImg} style={styles.msgImg} />
            <Text style={styles.createdAtTxt}>
              {dateString(data.item.createdAt)}
            </Text>
          </View>
          <View style={styles.flexRow}>
            <Image source={messageImg} style={styles.msgImg} />
            <Text style={styles.createdAtTxt}>0</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 10,
    height: 400,
  },
  backImg: {
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  metaData: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    justifyContent: 'space-between',
    padding: 15,
  },
  articleTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 24,
    lineHeight: 26,
    color: '#fff',
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    letterSpacing: 0.5,
  },
  categoryBtn: {
    alignItems: 'center',
    marginBottom: 10,
    height: 24,
    width: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  categoryBtnTxt: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: 'rgba(255,255,255,0.66)',
    paddingVertical: 4,
  },
  cardFooterContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createdAtTxt: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  msgImg: {
    marginRight: 5,
  },
});
