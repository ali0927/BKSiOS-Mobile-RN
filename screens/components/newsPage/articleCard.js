import React from 'react';
import DateObject from 'react-date-object';
import {TouchableOpacity, View, Text, Image} from 'react-native';

export const ArticleCard = data => {
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
        backgroundColor: 'green',
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        margin: 20,
      }}>
      <Image
        source={{
          uri:
            'http://192.168.106.26:3000/api/upload/get_file?path=' +
            data.item.image,
        }}
        style={{width: '100%', height: 200, backgroundColor: 'red'}}
      />
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
          }}>
          <Text style={{fontSize: 18, color: '#fff', fontWeight: '700'}}>
            New
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
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
          <Text style={{color: '#fff'}}>{dateString(data.item.createdAt)}</Text>
          <Text style={{color: '#fff'}}>0</Text>
        </View>
      </View>
    </View>
  );
};
