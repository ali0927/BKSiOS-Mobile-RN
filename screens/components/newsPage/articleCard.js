import React from 'react';
import DateObject from 'react-date-object';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import messageImg from '../../../assets/img/icons/message.png';
import clockImg from '../../../assets/img/icons/clock.png';
import {useNavigation} from '@react-navigation/core';

export const ArticleCard = data => {
  const navigation = useNavigation();
  console.log('This is Article Card', data.item);
  const dateString = d => {
    var date = new DateObject({
      date: new Date(d),
    });
    return date.format('MMMM DD, YYYY');
  };
  return (
    <View
      style={{
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        marginVertical: 10,
        height: 400,
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('NewsDetail', {id: data.item.id})}>
        <Image
          source={{
            uri:
              'http://192.168.106.26:3000/api/upload/get_file?path=' +
              data.item.image,
          }}
          style={{width: '100%', height: 200, backgroundColor: 'pink'}}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          justifyContent: 'space-between',
          padding: 15,
        }}>
        <View>
          <TouchableOpacity
            style={{
              alignItems: 'flex-start',
            }}
            onPress={() => console.log('Clicked News Button')}>
            <Text
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.66)',
                fontWeight: '500',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
                borderRadius: 12,
                paddingVertical: 6,
                paddingHorizontal: 10,
                marginBottom: 5,
              }}>
              News
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('NewsDetail', {id: data.item.id})
            }>
            <Text
              style={{
                fontSize: 24,
                color: '#fff',
                fontWeight: '700',
                letterSpacing: 1.05,
              }}
              numberOfLines={3}>
              {data.item.title}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={clockImg} style={{marginRight: 10}} />
            <Text
              style={{
                color: 'rgba(255, 255, 255, 0.66)',
                fontSize: 12,
                fontWeight: '400',
                letterSpacing: 1.05,
              }}>
              {dateString(data.item.createdAt)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={messageImg} style={{marginRight: 5}} />
            <Text
              style={{
                color: 'rgba(255, 255, 255, 0.66)',
                fontSize: 12,
                fontWeight: '400',
              }}>
              0
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
