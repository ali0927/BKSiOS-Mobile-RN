import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import badgeMark from '../../assets/img/icons/verified.png';
import telegramImg from '../../assets/img/icons/telegram.png';
import globalImg from '../../assets/img/icons/globe.png';
import mediumImg from '../../assets/img/icons/medium.png';
import twitterImg from '../../assets/img/icons/twitter.png';
import facebookImg from '../../assets/img/icons/facebook.png';
import instagramImg from '../../assets/img/icons/instagram.png';
import copyImg from '../../assets/img/icons/copy.png';
import CollectionCarousel from '../components/homePage/collectionCarousel';
import config from '../helper/config';

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

export const ProfileAuthorScreen = ({route}) => {
  const [collectionData, setCollectionData] = useState();
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
    fetch(`${config.API_BASE_URL}/api/upload`, {
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
    Toast.show({
      type: 'success',
      text1: 'Copied',
      text2: 'You can paste these characters...  👋',
    });
    if (key === 'wallet') {
      Clipboard.setString('XAVUW3sw3ZunitokcLtemEfX3tGuX2plateWdh');
    } else {
      Clipboard.setString('https://bksbackstage.io');
    }
  };

  useEffect(() => {
    console.log('PPPP', route.params.item);
    setCollectionData(route.params.item);
  });
  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            height: 224,
          }}
        />
        {collectionData && (
          <View style={{paddingHorizontal: 20, paddingBottom: 50}}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.avatarDiv}>
                <Image
                  source={{
                    uri:
                      config.API_BASE_URL +
                      '/api/upload/get_file?path=' +
                      collectionData.picture_small,
                  }}
                  style={styles.avatarImg}
                />
              </View>

              {/* <TouchableOpacity
              onPress={handleChoosePhoto}
              style={styles.avatarDiv}>
              {photo ? (
                <Image source={{uri: photo.uri}} style={styles.avatarImg} />
              ) : (
                <Image source={imgAvatar} style={styles.avatarImg} />
              )}
            </TouchableOpacity> */}
              {/* <Button title="Save" onPress={handleUploadPhoto} /> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.text1}>{collectionData.name}</Text>
              <Image source={badgeMark} style={styles.badgeMark} />
            </View>
            <Text style={styles.idText}>{collectionData.category}</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <Text style={styles.subTitle}>Wallet</Text>
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
            <Text style={styles.subTitle}>Links</Text>
            <View style={styles.socialDiv}>
              <TouchableOpacity style={styles.socialImg}>
                <Image source={globalImg} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialImg}>
                <Image source={telegramImg} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialImg}>
                <Image source={mediumImg} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialImg}>
                <Image source={twitterImg} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialImg}>
                <Image source={facebookImg} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialImg}>
                <Image source={instagramImg} />
              </TouchableOpacity>
            </View>
            <View style={styles.followDiv}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.text1}>
                  {collectionData.creator.followers}
                </Text>
                <Text style={{...styles.description, marginTop: 0}}>
                  followrs
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('FollowButton Clicked')}>
                <Text style={styles.text3}>Follow</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider}></View>
            <Text style={styles.subtitle}>Hot Collections</Text>
            <CollectionCarousel />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
  },
  avatarDiv: {
    position: 'relative',
    width: 140,
    height: 140,
    marginTop: -70,
    marginBottom: 30,
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
  },
  clipboardDiv: {
    position: 'relative',
  },
  copyImg: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  input: {
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginTop: 10,
    padding: 8,
    paddingRight: 50,
    paddingLeft: 20,
    color: 'white',
    borderRadius: 4,
    fontSize: 18,
    fontWeight: '500',
  },
  text1: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginRight: 10,
  },
  text2: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 30,
  },
  text3: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  idText: {
    color: '#6a4dfd',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.66)',
    marginTop: 10,
    letterSpacing: 1.2,
  },
  subTitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.66)',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginTop: 30,
  },
  button: {
    justifyContent: 'center',
    height: 44,
    width: 140,
    backgroundColor: '#6a4dfd',
    borderRadius: 4,
  },
  socialDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  socialImg: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: 10,
    borderRadius: 4,
  },
  followDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  divider: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    height: 1,
    marginTop: 40,
    marginBottom: 40,
  },
});
