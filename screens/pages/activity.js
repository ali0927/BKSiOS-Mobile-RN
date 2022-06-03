import React from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import clockImg from '../../assets/img/icons/clock.png';
import badgeMark from '../../assets/img/icons/verified.png';
import avatarImg from '../../assets/img/avatars/avatar2.jpg';

export const ActivityScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 15,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 12,
          }}>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              height: 97,
              width: 97,
              borderRadius: 8,
              overflow: "hidden",
              marginRight: 20,
            }}>
            <Image source={avatarImg} style={{width: '100%', height: '100%'}} />
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text style={{fontSize: 16, fontWeight: '700', color: '#fff'}}>
                Item Name
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#fff',
                    letterSpacing: 2,
                  }}>
                  QTY
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: '#fff',
                    marginLeft: 10,
                  }}>
                  1
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: 'rgba(255,255,255,0.66)',
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginTop: 10,
                marginBottom: 5,
              }}>
              Created by
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: '#fff',
              }}>
              Admin
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: 'rgba(255,255,255,0.66)',
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginTop: 10,
                marginBottom: 5,
              }}>
              Purchased by
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#fff',
                }}>
                Admin
              </Text>
              <Image source={badgeMark} style={styles.badgeMark} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Image source={clockImg} />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: 'rgba(255,255,255,0.66)',
                  letterSpacing: 0.5,
                  marginLeft: 10,
                }}>
                A week ago
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
    padding: 20,
  },
  avatarDiv: {
    position: 'relative',
    width: 140,
    height: 140,
    marginTop: -70,
    marginBottom: 30,
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
    borderColor: '#ee4f77',
    borderWidth: 3,
  },
  badgeMark: {
    backgroundColor: '#2f80ed',
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 1,
    width: 16,
    height: 16,
    marginLeft: 10,
  },
});
