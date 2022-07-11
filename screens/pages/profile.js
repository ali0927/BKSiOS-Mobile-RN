import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import Toast from 'react-native-toast-message';

import imgAvatar from '../../assets/img/avatars/avatar.jpg';
import badgeMark from '../../assets/img/icons/verified.png';
import telegramImg from '../../assets/img/icons/telegram.png';
import globalImg from '../../assets/img/icons/globe.png';
import mediumImg from '../../assets/img/icons/medium.png';
import twitterImg from '../../assets/img/icons/twitter.png';
import facebookImg from '../../assets/img/icons/facebook.png';
import instagramImg from '../../assets/img/icons/instagram.png';
import copyImg from '../../assets/img/icons/copy.png';
import editImg from '../../assets/img/icons/edit.png';
import uploadImg from '../../assets/img/icons/upload.png';
import Modal from 'react-native-modal';
import {
  changeAvatar,
  changeSocial,
  changePassword,
  getAllUserAvatars,
  getAllUserBackgrounds,
} from '../helper/user';
import {validateEmail} from '../utils';
import {useSelector} from 'react-redux';
import {updateProfile} from '../helper/auth';

const SERVER_URL = 'http://localhost:3000';

export const ProfileScreen = () => {
  const userInfo = useSelector(state => state.userInfoReducer).userInfo;

  const [backModalVisible, setBackModalVisible] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [userAvatars, setUserAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [userBackgrounds, setUserBackgrounds] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState('');
  const [focusedItem, setFocusedItem] = useState('');
  const [generalValues, setGeneralValues] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    website: '',
    walletAddress: '',
    backgroundImg: '',
    description: '',
  });
  const [socialValues, setSocialValues] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
    medium: '',
  });
  const [pwdValues, setPwdValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [generalValidations, setGeneralValidations] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    website: '',
    walletAddress: '',
    backgroundImg: '',
    description: '',
  });
  const [socialValidations, setSocialValidations] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
    medium: '',
  });
  const [pwdValidations, setPwdValidations] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [generalChanged, setGeneralChanged] = useState(false);
  const [socialChanged, setSocialChanged] = useState(false);
  const [pwdChanged, setPwdChanged] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleGeneralChange = (prop, value) => {
    setGeneralChanged(true);
    setGeneralValidations(prevState => ({...prevState, [prop]: ''}));
    setGeneralValues({...generalValues, [prop]: value});
  };
  const handleSocialChange = (prop, value) => {
    setSocialChanged(true);
    setSocialValidations(prevState => ({...prevState, [prop]: ''}));
    setSocialValues({...socialValues, [prop]: value});
  };
  const handlePwdChange = (prop, value) => {
    setPwdChanged(true);
    setPwdValidations(prevState => ({...prevState, [prop]: ''}));
    setPwdValues({...pwdValues, [prop]: value});
  };

  const checkGeneralValidations = () => {
    if (generalValues.name === '') {
      setGeneralValidations({
        name: 'has-empty',
        email: '',
        mobileNumber: '',
        website: '',
        walletAddress: '',
        backgroundImg: '',
        description: '',
        password: '',
      });
      return false;
    } else if (generalValues.email === '') {
      setGeneralValidations({
        name: '',
        email: 'has-empty',
        mobileNumber: '',
        website: '',
        walletAddress: '',
        backgroundImg: '',
        description: '',
      });
      return false;
    } else if (!validateEmail(generalValues.email)) {
      setGeneralValidations({
        name: '',
        email: 'has-danger',
        mobileNumber: '',
        website: '',
        walletAddress: '',
        backgroundImg: '',
        description: '',
      });
      return false;
    } else if (generalValues.mobileNumber === '') {
      setGeneralValidations({
        name: '',
        email: '',
        mobileNumber: 'has-empty',
        website: '',
        walletAddress: '',
        backgroundImg: '',
        description: '',
      });
      return false;
    } else if (generalValues.website === '') {
      setGeneralValidations({
        name: '',
        email: '',
        mobileNumber: '',
        website: 'has-empty',
        walletAddress: '',
        backgroundImg: '',
        description: '',
      });
      return false;
    } else if (generalValues.walletAddress === '') {
      setGeneralValidations({
        name: '',
        email: '',
        mobileNumber: '',
        website: '',
        walletAddress: 'has-empty',
        backgroundImg: '',
        description: '',
      });
      return false;
    } else if (generalValues.backgroundImg === '') {
      setGeneralValidations({
        name: '',
        email: '',
        mobileNumber: '',
        website: '',
        walletAddress: '',
        backgroundImg: 'has-empty',
        description: '',
      });
      return false;
    } else if (generalValues.description === '') {
      setGeneralValidations({
        name: '',
        email: '',
        mobileNumber: '',
        website: '',
        walletAddress: '',
        backgroundImg: '',
        description: 'has-empty',
      });
      return false;
    } else {
      setGeneralValidations({
        name: '',
        email: '',
        mobileNumber: '',
        website: '',
        walletAddress: '',
        backgroundImg: '',
        description: '',
      });
    }
    return true;
  };
  const checkSocialValidations = () => {
    if (socialValues.facebook === '') {
      setSocialValidations({
        facebook: 'has-empty',
        instagram: '',
        twitter: '',
        medium: '',
      });
      return false;
    } else if (socialValues.instagram === '') {
      setSocialValidations({
        facebook: '',
        instagram: 'has-empty',
        twitter: '',
        medium: '',
      });
      return false;
    } else if (socialValues.twitter === '') {
      setSocialValidations({
        facebook: '',
        instagram: '',
        twitter: 'has-empty',
        medium: '',
      });
      return false;
    } else if (socialValues.medium === '') {
      setSocialValidations({
        facebook: '',
        instagram: '',
        twitter: '',
        medium: 'has-empty',
      });
      return false;
    } else {
      setSocialValidations({
        facebook: '',
        instagram: '',
        twitter: '',
        medium: '',
      });
    }
    return true;
  };
  const checkPwdValidations = () => {
    if (pwdValues.oldPassword === '') {
      setPwdValidations({
        oldPassword: 'has-empty',
        newPassword: '',
        confirmPassword: '',
      });
      return false;
    } else if (pwdValues.newPassword === '') {
      setPwdValidations({
        oldPassword: '',
        newPassword: 'has-empty',
        confirmPassword: '',
      });
      return false;
    } else if (pwdValues.newPassword !== pwdValues.confirmPassword) {
      setPwdValidations({
        oldPassword: '',
        newPassword: '',
        confirmPassword: 'has-empty',
      });
      return false;
    } else {
      setPwdValidations({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
    return true;
  };

  const saveGeneral = async () => {
    updateProfile({
      name: generalValues.name,
      email: generalValues.email,
      phone: generalValues.mobileNumber,
      wallet_address: generalValues.walletAddress,
      background: generalValues.backgroundImg,
      facebook: currentUser.facebook,
      instagram: currentUser.instagram,
      twitter: currentUser.twitter,
      medium: currentUser.medium,
      wallet_address_near: currentUser.wallet_address_near,
    })
      .then(res => {
        if (res.success) {
          Toast.show({
            type: 'success',
            text1: 'Updating General Data Success!',
          });
          console.log('general save response', res);
        } else {
          const message = res.message ? res.message : 'failed';
          Toast.show({
            type: 'error',
            text1: message,
          });
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Failed!',
        });
      });
    console.log('saveGeneral', generalValues);
  };
  const saveSocial = async () => {
    console.log('saveGeneral', socialValues);
    changeSocial(socialValues).then(res => {
      if (res.success) {
        Toast.show({
          type: 'success',
          text1: 'Saved successfully!',
        });
      } else {
        const message = res.message ? res.message : 'Failed';
        Toast.show({
          type: 'error',
          text1: message,
        });
      }
    });
  };
  const savePwd = async () => {
    console.log('saveGeneral', pwdValues);
    if (!checkPwdValidations()) {
      console.log('Validation for pwd failed!');
      return;
    } else {
      changePassword({
        old_password: pwdValues.oldPassword,
        new_password: pwdValues.newPassword,
      }).then(res => {
        if (res.success) {
          Toast.show({
            type: 'success',
            text1: 'Password Changed!',
          });
        } else {
          const message = res.message ? res.message : 'Failed';
          Toast.show({
            type: 'error',
            text1: message,
          });
        }
      });
      Toast.show({
        type: 'success',
        text1: 'Validation for pwd Success!',
      });
    }
  };

  const copyToClipboard = key => {
    Toast.show({
      type: 'success',
      text1: 'Copied',
      text2: 'You can paste these characters...  👋',
    });
    if (key === 'wallet') {
      Clipboard.setString(currentUser?.wallet_address);
    } else {
      Clipboard.setString('https://bksbackstage.io');
    }
  };

  const imageUrl = src => {
    if (src === '/img/avatars/avatar.jpg') {
      return require('../../assets/img/avatars/avatar.jpg');
    } else if (src === '/img/avatars/avatar2.jpg') {
      return require('../../assets/img/avatars/avatar2.jpg');
    } else if (src === '/img/avatars/avatar3.jpg') {
      return require('../../assets/img/avatars/avatar3.jpg');
    } else if (src === '/img/avatars/avatar4.jpg') {
      return require('../../assets/img/avatars/avatar4.jpg');
    } else if (src === '/img/avatars/avatar5.jpg') {
      return require('../../assets/img/avatars/avatar5.jpg');
    } else if (src === '/img/avatars/avatar6.jpg') {
      return require('../../assets/img/avatars/avatar6.jpg');
    } else if (src === '/img/avatars/avatar7.jpg') {
      return require('../../assets/img/avatars/avatar7.jpg');
    } else if (src === '/img/avatars/avatar8.jpg') {
      return require('../../assets/img/avatars/avatar8.jpg');
    } else if (src === '/img/bg/bg-small.png') {
      return require('../../assets/img/bg/bg-small.png');
    } else if (src === '/img/bg/bg-small2.png') {
      return require('../../assets/img/bg/bg-small2.png');
    } else if (src === '/img/bg/bg-small3.png') {
      return require('../../assets/img/bg/bg-small3.png');
    } else if (src === '/img/bg/bg-small4.png') {
      return require('../../assets/img/bg/bg-small4.png');
    } else if (src === '/img/bg/bg-small5.png') {
      return require('../../assets/img/bg/bg-small5.png');
    } else if (src === '/img/bg/bg-small6.png') {
      return require('../../assets/img/bg/bg-small6.png');
    }
  };

  const saveAvatar = () => {
    const fd = {path: selectedAvatar};
    changeAvatar(fd)
      .then(res => {
        if (res.success) {
          setAvatarChanged(false);
          Toast.show({
            type: 'success',
            text1: 'Avatar has changed!',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Failed one Avatar uploading...!',
          });
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Failed two Avatar uploading...!',
        });
      });
  };
  const avatarImgModal = () => {
    return (
      <Modal
        isVisible={avatarModalVisible}
        onBackdropPress={() => setAvatarModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select User Avatar</Text>
          <View style={styles.modalAvatarContainer}>
            {userAvatars.map((icon, index) => (
              <TouchableOpacity
                style={styles.modalAvatarItem}
                key={index}
                onPress={() => {
                  setSelectedAvatar(icon.src);
                  setAvatarChanged(true);
                  setAvatarModalVisible(false);
                }}>
                <Image source={imageUrl(icon.src)} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    );
  };

  const backgroundImgModal = () => {
    return (
      <Modal
        isVisible={backModalVisible}
        onBackdropPress={() => setBackModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select User Background</Text>
          <View style={styles.modalAvatarContainer}>
            {userBackgrounds.map((icon, index) => (
              <TouchableOpacity
                style={styles.modalAvatarItem}
                key={index}
                onPress={() => {
                  setGeneralValues({...generalValues, backgroundImg: icon.src});
                  setSelectedBackground(icon.src);
                  setBackModalVisible(false);
                }}>
                <Image source={imageUrl(icon.src)} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    );
  };

  useEffect(() => {
    console.log('Current user', JSON.parse(userInfo).user);
    if (JSON.parse(userInfo)) {
      setCurrentUser(JSON.parse(userInfo).user);
      setGeneralValues({
        ...generalValues,
        name: JSON.parse(userInfo).user.name,
        email: JSON.parse(userInfo).user.email,
        mobileNumber: JSON.parse(userInfo).user.phone,
        website: '',
        walletAddress: JSON.parse(userInfo).user.wallet_address,
        backgroundImg: JSON.parse(userInfo).user.background,
        description: '',
      });
      setSocialValues({
        ...socialValues,
        facebook: JSON.parse(userInfo).user.facebook,
        instagram: JSON.parse(userInfo).user.instagram,
        twitter: JSON.parse(userInfo).user.twitter,
        medium: JSON.parse(userInfo).user.medium,
      });
      setSelectedBackground(JSON.parse(userInfo).user.background);
      setSelectedAvatar(JSON.parse(userInfo).user.avatar);
    }
    getAllUserAvatars().then(res => {
      if (res.success) {
        setUserAvatars(res.useravatars);
      }
    });
    getAllUserBackgrounds().then(res => {
      if (res.success) {
        setUserBackgrounds(res.userbackgrounds);
      }
    });
  }, [userInfo]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainBackgroundImg}>
          {selectedBackground ? (
            <Image
              source={imageUrl(selectedBackground)}
              style={styles.backgroundImg}
            />
          ) : (
            <></>
          )}
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarDiv}>
              {selectedAvatar ? (
                <Image
                  source={imageUrl(selectedAvatar)}
                  style={styles.avatarImg}
                />
              ) : (
                <Image source={imgAvatar} style={styles.avatarImg} />
              )}
              <TouchableOpacity
                style={styles.editImgDiv}
                onPress={() => setAvatarModalVisible(true)}>
                <Image source={editImg} />
              </TouchableOpacity>
            </View>
          </View>
          {avatarChanged && (
            <TouchableOpacity
              style={styles.button1}
              onPress={() => saveAvatar()}>
              <Text style={styles.text31}>Save</Text>
            </TouchableOpacity>
          )}
          {avatarImgModal()}
          <View style={styles.flexCenter}>
            <Text style={styles.text1}>{currentUser?.name}</Text>
            <Image source={badgeMark} style={styles.badgeMark} />
          </View>
          <Text style={styles.idText}>@{currentUser?.name}</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <Text style={styles.walletTitle}>Wallet</Text>
          <View style={styles.clipboardDiv}>
            <TextInput
              style={styles.input}
              editable={false}
              value={currentUser?.wallet_address}
            />
            <TouchableOpacity
              style={styles.copyImg}
              onPress={() => copyToClipboard('wallet')}>
              <Image source={copyImg} />
            </TouchableOpacity>
          </View>
          <Text style={styles.walletTitle}>Links</Text>
          <View style={styles.socialDiv}>
            <TouchableOpacity
              style={styles.socialImg}
              onPress={() => Linking.openURL('https://t.me/BKSBackstage')}>
              <Image source={globalImg} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialImg}
              onPress={() => Linking.openURL('https://t.me/BKSBackstage')}>
              <Image source={telegramImg} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialImg}
              onPress={() =>
                Linking.openURL('https://medium.com/BackstageBks')
              }>
              <Image source={mediumImg} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialImg}
              onPress={() =>
                Linking.openURL('https://twitter.com/BackstageBks')
              }>
              <Image source={twitterImg} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialImg}
              onPress={() =>
                Linking.openURL('https://www.facebook.com/BKSBackstage')
              }>
              <Image source={facebookImg} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialImg}
              onPress={() =>
                Linking.openURL('https://www.instagram.com/bksbackstage/?hl=en')
              }>
              <Image source={instagramImg} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Profile Settings</Text>
          {/* General Settings */}
          <View>
            {/* separate title View */}
            <View style={styles.flexBase}>
              <Text style={styles.categoryTitle}>General</Text>
              <View style={styles.restLine} />
            </View>
            {/* General Forms */}
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Name</Text>
              <TextInput
                onFocus={() => setFocusedItem('nameInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'nameInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={generalValues.name}
                autoCapitalize="none"
                onChangeText={val => handleGeneralChange('name', val)}
              />
              {generalValidations.name === 'has-empty' ? (
                <Text style={styles.errorText}>Name required*</Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Email</Text>
              <TextInput
                onFocus={() => setFocusedItem('emailInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'emailInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={generalValues.email}
                autoCapitalize="none"
                onChangeText={val => handleGeneralChange('email', val)}
              />
              {generalValidations.email === 'has-empty' ? (
                <Text style={styles.errorText}>Email required*</Text>
              ) : (
                <Text style={styles.errorText} />
              )}
              {generalValidations.email === 'has-danger' ? (
                <Text style={styles.errorText}>Input Correct Format</Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Mobile Number</Text>
              <TextInput
                onFocus={() => setFocusedItem('mobileInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'mobileInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={generalValues.mobileNumber}
                autoCapitalize="none"
                onChangeText={val => handleGeneralChange('mobileNumber', val)}
              />
              {generalValidations.mobileNumber === 'has-empty' ? (
                <Text style={styles.errorText}>Mobile Number required*</Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Website</Text>
              <TextInput
                onFocus={() => setFocusedItem('websiteInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'websiteInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={generalValues.website}
                autoCapitalize="none"
                onChangeText={val => handleGeneralChange('website', val)}
              />
              {generalValidations.website === 'has-empty' ? (
                <Text style={styles.errorText}>Website required*</Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>BSC Wallet Address</Text>
              <TextInput
                onFocus={() => setFocusedItem('walletInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'walletInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={generalValues.walletAddress}
                autoCapitalize="none"
                onChangeText={val => handleGeneralChange('walletAddress', val)}
              />
              {generalValidations.walletAddress === 'has-empty' ? (
                <Text style={styles.errorText}>Wallet Address required*</Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Background Image</Text>
              <View style={styles.backImgUploadContiner}>
                <TouchableOpacity
                  onPress={() => setBackModalVisible(true)}
                  style={styles.backImgUpload}>
                  <Image source={uploadImg} />
                  <Text style={styles.backImgUploadTxt}>Upload</Text>
                </TouchableOpacity>
                {backgroundImgModal()}
                {/* <Button title="Save" onPress={handleUploadPhoto} /> */}
              </View>
              {generalValidations.backgroundImg === 'has-empty' ? (
                <Text style={styles.errorText}>Background Image required*</Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Description</Text>
              <TextInput
                onFocus={() => setFocusedItem('DescriptionInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'DescriptionInput'
                    ? styles.multiInputOnFocus
                    : styles.multiInput
                }
                value={generalValues.description}
                multiline
                numberOfLines={4}
                autoCapitalize="none"
                onChangeText={val => handleGeneralChange('description', val)}
              />
              {generalValidations.description === 'has-empty' ? (
                <Text style={styles.errorText}>Description required*</Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <TouchableOpacity
              style={generalChanged ? styles.button1 : styles.button}
              onPress={() => {
                generalChanged
                  ? saveGeneral()
                  : console.log('there is nothing to save');
              }}>
              <Text style={generalChanged ? styles.text31 : styles.text3}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
          {/* Social Media */}
          <View>
            {/* separate title View */}
            <View style={styles.flexBase}>
              <Text style={styles.categoryTitle}>Social Media</Text>
              <View style={styles.restLine} />
            </View>
            {/* General Forms */}
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Facebook</Text>
              <TextInput
                onFocus={() => setFocusedItem('FacebookInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'FacebookInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={socialValues.facebook}
                autoCapitalize="none"
                onChangeText={val => handleSocialChange('facebook', val)}
              />
              {socialValidations.facebook === 'has-empty' ? (
                <Text style={styles.errorText}>Facebook required*</Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Instagram</Text>
              <TextInput
                onFocus={() => setFocusedItem('InstagramInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'InstagramInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={socialValues.instagram}
                autoCapitalize="none"
                onChangeText={val => handleSocialChange('instagram', val)}
              />
              {socialValidations.instagram === 'has-empty' ? (
                <Text style={styles.errorText}>Instagram required*</Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Twitter</Text>
              <TextInput
                onFocus={() => setFocusedItem('TwitterInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'TwitterInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={socialValues.twitter}
                autoCapitalize="none"
                onChangeText={val => handleSocialChange('twitter', val)}
              />
              {socialValidations.twitter === 'has-empty' ? (
                <Text style={styles.errorText}>Twitter required*</Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Medium</Text>
              <TextInput
                onFocus={() => setFocusedItem('MediumInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'MediumInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={socialValues.medium}
                autoCapitalize="none"
                onChangeText={val => handleSocialChange('medium', val)}
              />
              {socialValidations.medium === 'has-empty' ? (
                <Text style={styles.errorText}>Medium required*</Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <TouchableOpacity
              style={socialChanged ? styles.button1 : styles.button}
              onPress={() => {
                socialChanged
                  ? saveSocial()
                  : console.log('there is nothing to save');
              }}>
              <Text style={socialChanged ? styles.text31 : styles.text3}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
          {/* Change Password */}
          <View>
            {/* separate title View */}
            <View style={styles.flexBase}>
              <Text style={styles.categoryTitle}>Change Password</Text>
              <View style={styles.restLine} />
            </View>
            {/* Change Password Forms */}
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Old Password</Text>
              <TextInput
                onFocus={() => setFocusedItem('oldPwdInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'oldPwdInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                secureTextEntry={true}
                value={pwdValues.oldPassword}
                autoCapitalize="none"
                onChangeText={val => handlePwdChange('oldPassword', val)}
              />
              {pwdValidations.oldPassword === 'has-empty' ? (
                <Text style={styles.errorText}>Old Password required*</Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>New Password</Text>
              <TextInput
                onFocus={() => setFocusedItem('newPwdInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'newPwdInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                secureTextEntry={true}
                value={pwdValues.newPassword}
                autoCapitalize="none"
                onChangeText={val => handlePwdChange('newPassword', val)}
              />
              {pwdValidations.newPassword === 'has-empty' ? (
                <Text style={styles.errorText}>New Password required*</Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>Confirm Password</Text>
              <TextInput
                onFocus={() => setFocusedItem('confirmPwdInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'confirmPwdInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                secureTextEntry={true}
                value={pwdValues.confirmPassword}
                autoCapitalize="none"
                onChangeText={val => handlePwdChange('confirmPassword', val)}
              />
              {pwdValidations.confirmPassword === 'has-empty' ? (
                <Text style={styles.errorText}>
                  Confirm Password must equal with New Password*
                </Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <TouchableOpacity
              style={pwdChanged ? styles.button1 : styles.button}
              onPress={() => {
                pwdChanged
                  ? savePwd()
                  : console.log('There is nothing to save');
              }}>
              <Text style={pwdChanged ? styles.text31 : styles.text3}>
                Change Password
              </Text>
            </TouchableOpacity>
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
  },
  mainBackgroundImg: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    height: 224,
  },
  mainContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderColor: '#ededed',
    borderWidth: 1,
  },
  flexCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeMark: {
    backgroundColor: '#2f80ed',
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 1,
    width: 16,
    height: 16,
  },
  backImgUploadContiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  backImgUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.33)',
    marginTop: 10,
    width: '100%',
    borderRadius: 4,
  },
  backImgUploadTxt: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    textTransform: 'uppercase',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1.15,
  },
  modalContainer: {
    backgroundColor: '#14142f',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#887bff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },
  modalTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  modalAvatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  modalAvatarItem: {
    width: 60,
    height: 60,
    marginBottom: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  clipboardDiv: {
    position: 'relative',
  },
  editImgDiv: {
    position: 'absolute',
    bottom: 5,
    right: 0,
    backgroundColor: '#6a4dfd',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  copyImg: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1.02,
    marginVertical: 30,
  },
  categoryTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    color: 'rgba(255, 255, 255, 0.66)',
    textTransform: 'uppercase',
    marginRight: 10,
  },
  restLine: {
    height: 0.5,
    backgroundColor: '#fff',
    flex: 1,
  },
  flexBase: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  input: {
    fontFamily: 'SpaceGrotesk-Medium',
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.33)',
    marginTop: 10,
    padding: 8,
    paddingRight: 50,
    paddingLeft: 20,
    color: '#fff',
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '400',
  },
  inputOnFocus: {
    fontFamily: 'SpaceGrotesk-Medium',
    shadowColor: '#6a4dfd',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderColor: '#6a4dfd',
    marginTop: 10,
    width: '100%',
    height: 44,
    borderWidth: 1,
    padding: 8,
    paddingLeft: 20,
    color: '#fff',
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '400',
  },
  multiInput: {
    fontFamily: 'SpaceGrotesk-Medium',
    height: 88,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.33)',
    marginTop: 10,
    padding: 15,
    paddingRight: 50,
    paddingLeft: 20,
    color: 'white',
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '400',
  },
  multiInputOnFocus: {
    fontFamily: 'SpaceGrotesk-Medium',
    shadowColor: '#6a4dfd',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderColor: '#6a4dfd',
    marginTop: 10,
    width: '100%',
    height: 88,
    borderWidth: 1,
    padding: 15,
    paddingLeft: 20,
    color: 'white',
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '400',
  },
  errorText: {
    fontFamily: 'SpaceGrotesk-Medium',
    position: 'absolute',
    bottom: -20,
    left: 0,
    fontSize: 14,
    fontWeight: '600',
    color: '#b00020',
  },
  text1: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginRight: 10,
  },
  text31: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  text3: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.33)',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  idText: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#6a4dfd',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: 10,
    textTransform: 'lowercase',
  },
  description: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.66)',
    marginTop: 10,
    letterSpacing: 0.5,
  },
  walletTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.66)',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 30,
  },
  subTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 14,
    color: '#fff',
    fontWeight: '400',
    letterSpacing: 1.05,
    marginTop: 30,
  },
  button: {
    justifyContent: 'center',
    height: 44,
    backgroundColor: 'rgba(106, 77, 253, 0.33)',
    borderRadius: 4,
    marginTop: 30,
    marginBottom: 50,
  },
  button1: {
    justifyContent: 'center',
    height: 44,
    backgroundColor: '#6a4dfd',
    borderRadius: 4,
    marginTop: 30,
    marginBottom: 50,
  },
  socialDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  socialImg: {
    width: 44,
    height: 44,
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
});
