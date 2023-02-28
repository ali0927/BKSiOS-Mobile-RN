import Clipboard from '@react-native-clipboard/clipboard';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Toast from 'react-native-toast-message';

import Modal from 'react-native-modal';
import imgAvatar from '../../assets/img/avatars/avatar.jpg';
import copyImg from '../../assets/img/icons/copy.png';
import editImg from '../../assets/img/icons/edit.png';
import facebookImg from '../../assets/img/icons/facebook.png';
import globalImg from '../../assets/img/icons/globe.png';
import instagramImg from '../../assets/img/icons/instagram.png';
import mediumImg from '../../assets/img/icons/medium.png';
import telegramImg from '../../assets/img/icons/telegram.png';
import twitterImg from '../../assets/img/icons/twitter.png';
import uploadImg from '../../assets/img/icons/upload.png';
import badgeMark from '../../assets/img/icons/verified.png';
import {
  changeAvatar,
  changePassword,
  changeSocial,
  getAllUserAvatars,
  getAllUserBackgrounds,
} from '../helper/user';
// import {validateEmail} from '../utils';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {updateProfile} from '../helper/auth';

export const ProfileScreen = () => {
  const {t} = useTranslation();

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

  const initialGeneralValidations = {
    name: '',
    email: '',
    mobileNumber: '',
    website: '',
    walletAddress: '',
    backgroundImg: '',
    description: '',
  };

  const initalSocialValidations = {
    facebook: '',
    twitter: '',
    instagram: '',
    medium: '',
  };

  const handleGeneralChange = (prop, value) => {
    setGeneralChanged(true);
    setGeneralValidations(initialGeneralValidations);
    setGeneralValues({...generalValues, [prop]: value});
  };
  const handleSocialChange = (prop, value) => {
    setSocialChanged(true);
    setSocialValidations({...initalSocialValidations});
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
        ...initialGeneralValidations,
        name: 'has-empty',
      });
      return false;
    } else if (!ValidateEmail(generalValues.email)) {
      setGeneralValidations({
        ...initialGeneralValidations,
        email: 'has-empty',
      });
      return false;
    } else if (!isMobileValid()) {
      setGeneralValidations({
        ...initialGeneralValidations,
        mobileNumber: 'has-empty',
      });
      return false;
    } else {
      setGeneralValidations(initialGeneralValidations);
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
  const ValidateEmail = input => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  };
  const isMobileValid = () => {
    let str = generalValues.mobileNumber;
    const len = str.length;
    for (let i = 0; i < len; i++) {
      if ((str[i] < '0' || str[i] > '9') && str[i] !== '+' && str[i] !== ' ')
        return false;
    }
    while (str[0] === '+' || str[0] === '0') str = str.slice(1);
    console.log(str);
    let _len = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] >= '0' && str[i] <= '9') _len++;
    }
    if (_len > 11) return false;
    return true;
  };
  const saveGeneral = async () => {
    if (!checkGeneralValidations()) return;

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
      website: generalValues.website,
      description: generalValues.description,
    })
      .then(res => {
        if (res.success) {
          Toast.show({
            type: 'success',
            text1: 'Saved successfully!',
          });
          setGeneralChanged(false);
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
    if (!checkSocialValidations()) return;

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
    console.log('savePwd', pwdValues);
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
    console.log('Current user', JSON.parse(userInfo));
    if (JSON.parse(userInfo)) {
      setCurrentUser(JSON.parse(userInfo).user);
      setGeneralValues({
        ...generalValues,
        name: JSON.parse(userInfo).user.name,
        email: JSON.parse(userInfo).user.email,
        mobileNumber: JSON.parse(userInfo).user.phone,
        website: JSON.parse(userInfo).user.website,
        walletAddress: JSON.parse(userInfo).user.wallet_address,
        backgroundImg: JSON.parse(userInfo).user.background,
        description: JSON.parse(userInfo).user.description,
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
          <Text style={styles.idText}>{currentUser?.email}</Text>
          <Text style={styles.description}>{currentUser?.description}</Text>
          <Text style={styles.walletTitle}>{t('wallet')}</Text>
          <View style={styles.clipboardDiv}>
            <Text
              style={styles.inputWallet}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {currentUser?.wallet_address}
            </Text>
            <TouchableOpacity
              style={styles.copyImg}
              onPress={() => {
                currentUser?.wallet_address !== null &&
                  copyToClipboard('wallet');
              }}>
              <Image source={copyImg} />
            </TouchableOpacity>
          </View>
          <Text style={styles.walletTitle}>{t('links')}</Text>
          <View style={styles.socialDiv}>
            <TouchableOpacity
              style={styles.socialImg}
              onPress={() => Linking.openURL('https://bksbackstage.io')}>
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
                Linking.openURL('https://bksbackstageofficial.medium.com')
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
          <Text style={styles.title}>{t('profile settings')}</Text>
          {/* General Settings */}
          <View>
            {/* separate title View */}
            <View style={styles.flexBase}>
              <Text style={styles.categoryTitle}>{t('general')}</Text>
              <View style={styles.restLine} />
            </View>
            {/* General Forms */}
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>{t('name')}</Text>
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
                <Text style={styles.errorText}>{t('name required')}*</Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>{t('email')}</Text>
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
                <Text style={styles.errorText}>
                  {t('valid email required')}*
                </Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>{t('mobile number')}</Text>
              <TextInput
                onFocus={() => setFocusedItem('mobileInput')}
                onBlur={() => setFocusedItem('')}
                style={
                  focusedItem === 'mobileInput'
                    ? styles.inputOnFocus
                    : styles.input
                }
                value={generalValues.mobileNumber !== null ? generalValues.mobileNumber : ""}
                autoCapitalize="none"
                onChangeText={val => handleGeneralChange('mobileNumber', val)}
              />
              {generalValidations.mobileNumber === 'has-empty' ? (
                <Text style={styles.errorText}>
                  {t('valid mobile number required')}*
                </Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>{t('website')}</Text>
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
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>{t('BSC wallet address')}</Text>
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
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>{t('background image')}</Text>
              <View style={styles.backImgUploadContiner}>
                <TouchableOpacity
                  onPress={() => setBackModalVisible(true)}
                  style={styles.backImgUpload}>
                  <Image source={uploadImg} />
                  <Text style={styles.backImgUploadTxt}>{t('upload')}</Text>
                </TouchableOpacity>
                {backgroundImgModal()}
                {/* <Button title="Save" onPress={handleUploadPhoto} /> */}
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>{t('description')}</Text>
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
                <Text style={styles.errorText}>
                  {t('description required')}*
                </Text>
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
                {t('save')}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Social Media */}
          <View>
            {/* separate title View */}
            <View style={styles.flexBase}>
              <Text style={styles.categoryTitle}>{t('social media')}</Text>
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
                <Text style={styles.errorText}>
                  {t('correct URL required')}*
                </Text>
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
                <Text style={styles.errorText}>
                  {t('correct URL required')}*
                </Text>
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
                <Text style={styles.errorText}>
                  {t('correct URL required')}*
                </Text>
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
                <Text style={styles.errorText}>
                  {t('correct URL required')}*
                </Text>
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
                {t('save')}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Change Password */}
          <View>
            {/* separate title View */}
            <View style={styles.flexBase}>
              <Text style={styles.categoryTitle}>{t('change password')}</Text>
              <View style={styles.restLine} />
            </View>
            {/* Change Password Forms */}
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>{t('old password')}</Text>
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
                <Text style={styles.errorText}>
                  {t('old password required')}*
                </Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>{t('new password')}</Text>
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
                <Text style={styles.errorText}>
                  {t('new password required')}*
                </Text>
              ) : (
                <Text style={styles.errorText} />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>{t('confirm password')}</Text>
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
                  {t('confirm password does not match')}*
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
                {t('change password')}
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
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
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
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
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
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    letterSpacing: 1.02,
    marginVertical: 30,
  },
  categoryTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
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
  inputWallet: {
    fontFamily: 'SpaceGrotesk-Medium',
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginTop: 10,
    padding: 12,
    paddingRight: 60,
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
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
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
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    marginRight: 10,
  },
  text31: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  text3: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.33)',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
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
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 30,
    letterSpacing: 1.15,
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
