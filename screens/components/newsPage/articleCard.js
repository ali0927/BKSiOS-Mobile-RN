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
        borderRadius: 16,
        overflow: 'hidden',
        margin: 20,
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('NewsDetail', {id: data.item.id})}>
        <Image
          source={{
            uri:
              'http://192.168.106.26:3000/api/upload/get_file?path=' +
              data.item.image,
          }}
          style={{width: '100%', height: 200}}
        />
      </TouchableOpacity>
      <View
        style={{
          position: 'relative',
          height: 250,
          backgroundColor: '#534f77',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: -50,
            left: 20,
            backgroundColor: '#6164ff',
            borderRadius: 12,
            width: 80,
            alignItems: 'center',
            paddingVertical: 5,
          }}
          onPress={() => console.log("Clicked News Button")}>
          <Text style={{fontSize: 18, color: '#fff', fontWeight: '700'}}>
            News
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('NewsDetail', {id: data.item.id})}>
          <Text style={{fontSize: 24, color: '#fff', fontWeight: '700'}}>
            {data.item.title}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            marginBottom: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={clockImg} style={{marginRight: 10}} />
            <Text style={{color: '#fff', fontSize: 16}}>
              {dateString(data.item.createdAt)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={messageImg} style={{marginRight: 10}} />
            <Text style={{color: '#fff', fontSize: 16}}>0</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
