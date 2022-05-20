import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import imgAvatar from '../../../assets/img/avatars/avatar.jpg';
import badgeMark from '../../../assets/img/avatars/avatar.jpg';
import socialImg1 from '../../../assets/img/avatars/avatar.jpg';
import socialImg2 from '../../../assets/img/avatars/avatar.jpg';
import socialImg3 from '../../../assets/img/avatars/avatar.jpg';
import socialImg4 from '../../../assets/img/avatars/avatar.jpg';

export const Overview = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarDiv}>
        <Image source={imgAvatar} />
        <Image source={badgeMark} />
      </View>
      <Text style={styles.text1}>Mislan</Text>
      <Text style={styles.text2}>
        Please insert below your Binance Smart Chain wallet address
      </Text>
      <TextInput
        style={styles.input}
        editable = {false}
        value="XAVUW3sw3ZunitokcLtemEfX3tGuX2plateWdh"
      />
      <TextInput
        style={styles.input}
        editable = {false}
        value="https://bksbackstage.io"
      />
      <View style={styles.socialDiv}>
        <Image source={socialImg1} />
        <Image source={socialImg2} />
        <Image source={socialImg3} />
        <Image source={socialImg4} />
      </View>
      <View style={styles.divider}></View>
      <View style={styles.followDiv}>
        <View>
          <Text style={styles.text1}>0</Text>
          <Text style={styles.text2}>Followrs</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("FollowButton Clicked")}>
          <Text style={styles.text3}>Follow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    height: 55,
    backgroundColor: '#534f77',
    marginTop: 20,
    padding: 8,
    paddingLeft: 20,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  text1: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  text2: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 30,
  },
  text3: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    width: 160,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  button: {
      alignItems: "center",
      justifyContent: "center",
      height: 52,
    backgroundColor: '#6164ff',
    borderRadius: 12,
  },
  socialDiv: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  followDiv: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
  }
});
