import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import rightArrowImg from '../../assets/img/icons/arrow-right.png';
import profileImg from '../../assets/img/icons/user2.png';
import activityImg from '../../assets/img/icons/activity.png';
import settingsImg from '../../assets/img/icons/settings2.png';
import aboutImg from '../../assets/img/icons/about.png';

export const MenuHomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => console.log('Clicked Item')}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={profileImg} style={{marginRight: 20}} />
          <Text style={styles.title}>Profile</Text>
        </View>
        <Image source={rightArrowImg} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => console.log('Clicked Item')}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={activityImg} style={{marginRight: 20}} />
          <Text style={styles.title}>Activity</Text>
        </View>
        <Image source={rightArrowImg} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => console.log('Clicked Item')}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={settingsImg} style={{marginRight: 20}} />
          <Text style={styles.title}>App Settings</Text>
        </View>
        <Image source={rightArrowImg} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => console.log('Clicked Item')}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={aboutImg} style={{marginRight: 20}} />
          <Text style={styles.title}>About</Text>
        </View>
        <Image source={rightArrowImg} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'rgba(121, 126, 137, 0.5)',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
});
