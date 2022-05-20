import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Clipboard from '@react-native-clipboard/clipboard';

import {useToast} from 'react-native-toast-notifications';

import imgAvatar from '../../../assets/img/avatars/avatar.jpg';
import badgeMark from '../../../assets/img/icons/verified.png';
import socialImg1 from '../../../assets/img/icons/social1.png';
import socialImg2 from '../../../assets/img/icons/social2.png';
import socialImg3 from '../../../assets/img/icons/social3.png';
import socialImg4 from '../../../assets/img/icons/social4.png';
import copyImg from '../../../assets/img/icons/copy-32.png';

const SERVER_URL = 'http://localhost:3000';

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

export const Overview = () => {
  const [photo, setPhoto] = useState(null);

  const toast = useToast();

  const handleChoosePhoto = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'}, response => {
      console.log('ResponseImage', response);
      if (response) {
        setPhoto(response.assets[0]);
      }
    });
  };

  const handleUploadPhoto = () => {
    fetch(`${SERVER_URL}/api/upload`, {
      method: 'POST',
      body: createFormData(photo, {userId: '123'}),
    })
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

  const copyToClipboard = key => {
    toast.show('Copied', {
        type: "success",
        placement: "bottom",
        duration: 4000,
        offset: 400,
        animationType: "zoom-in",
      });
    if (key === 'wallet') {
      Clipboard.setString('XAVUW3sw3ZunitokcLtemEfX3tGuX2plateWdh');
    } else {
      Clipboard.setString('https://bksbackstage.io');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={handleChoosePhoto} style={styles.avatarDiv}>
          {photo ? (
            <Image source={{uri: photo.uri}} style={styles.avatarImg} />
          ) : (
            <Image source={imgAvatar} style={styles.avatarImg} />
          )}
          <Image source={badgeMark} style={styles.badgeMark} />
        </TouchableOpacity>
        {/* <Button title="Save" onPress={handleUploadPhoto} /> */}
      </View>
      <Text style={styles.text1}>Mislan</Text>
      <Text style={styles.text2}>
        Please insert below your Binance Smart Chain wallet address
      </Text>
      <View style={styles.clipboardDiv}>
        <TextInput
          style={styles.input}
          editable={false}
          value="XAVUW3sw3ZunitokcLtemEfX3tGuX2plateWdh"
        />
        <TouchableOpacity
          style={styles.copyImg}
          onPress={() => copyToClipboard('wallet')}>
          <Image source={copyImg} />
        </TouchableOpacity>
      </View>
      <View style={styles.clipboardDiv}>
        <TextInput
          style={styles.input}
          editable={false}
          value="https://bksbackstage.io"
        />
        <TouchableOpacity
          style={styles.copyImg}
          onPress={() => copyToClipboard('website')}>
          <Image source={copyImg} />
        </TouchableOpacity>
      </View>

      <View style={styles.socialDiv}>
        <Image source={socialImg1} style={styles.socialImg} />
        <Image source={socialImg2} style={styles.socialImg} />
        <Image source={socialImg3} style={styles.socialImg} />
        <Image source={socialImg4} style={styles.socialImg} />
      </View>
      <View style={styles.divider}></View>
      <View style={styles.followDiv}>
        <View>
          <Text style={styles.text1}>0</Text>
          <Text style={styles.text2}>Followrs</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('FollowButton Clicked')}>
          <Text style={styles.text3}>Follow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  avatarDiv: {
    position: 'relative',
    width: 200,
    height: 200,
    marginTop: -150,
    marginBottom: 30,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderColor: '#ee4f77',
    borderWidth: 3,
  },
  badgeMark: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    backgroundColor: '#2f80ed',
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 2,
    width: 30,
    height: 30,
  },
  clipboardDiv: {
    position: 'relative',
  },
  copyImg: {
    position: 'absolute',
    right: 10,
    top: 25,
    opacity: 0.7,
  },
  input: {
    height: 45,
    backgroundColor: '#534f77',
    marginTop: 20,
    padding: 8,
    paddingRight: 50,
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
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    backgroundColor: '#6164ff',
    borderRadius: 12,
  },
  socialDiv: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 30,
  },
  socialImg: {
    marginRight: 20,
    width: 30,
    height: 30,
  },
  followDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    width: '100%',
    backgroundColor: '#887bff',
    height: 2,
    marginTop: 20,
    marginBottom: 20,
  },
});
