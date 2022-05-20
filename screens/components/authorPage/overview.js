import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Button,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import imgAvatar from '../../../assets/img/avatars/avatar.jpg';
import badgeMark from '../../../assets/img/avatars/avatar.jpg';
import socialImg1 from '../../../assets/img/icons/social1.png';
import socialImg2 from '../../../assets/img/icons/social2.png';
import socialImg3 from '../../../assets/img/icons/social3.png';
import socialImg4 from '../../../assets/img/icons/social4.png';

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

  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={handleChoosePhoto} style={styles.avatarDiv}>
          <Image
            source={{uri: photo ? photo.uri : imgAvatar}}
            style={styles.avatarImg}
          />
        </TouchableOpacity>
        <Image source={badgeMark} />
        {/* <Button title="Save" onPress={handleUploadPhoto} /> */}
      </View>
        
      <Text style={styles.text1}>Mislan</Text>
      <Text style={styles.text2}>
        Please insert below your Binance Smart Chain wallet address
      </Text>
      <TextInput
        style={styles.input}
        editable={false}
        value="XAVUW3sw3ZunitokcLtemEfX3tGuX2plateWdh"
      />
      <TextInput
        style={styles.input}
        editable={false}
        value="https://bksbackstage.io"
      />
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
    padding: 20,
  },
  avatarDiv: {
    width: 250,
    height: 250,
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 3,
    marginTop: -150
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: 20
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
