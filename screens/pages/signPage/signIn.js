import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {login} from '../../helper/auth';
import {validateEmail} from '../../utils';

export const SignInScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [validations, setValidations] = useState({
    email: '',
    password: '',
  });
  const [focusedItem, setFocusedItem] = useState('');

  const handleChange = (prop, value) => {
    setValidations(prevState => ({...prevState, [prop]: ''}));
    setValues({...values, [prop]: value});
  };

  const checkvalidations = () => {
    if (values.email === '') {
      setValidations({email: 'has-empty', password: ''});
      return false;
    } else if (!validateEmail(values.email)) {
      setValidations({email: 'has-danger', password: ''});
      return false;
    } else if (values.password === '') {
      setValidations({email: '', password: 'has-empty'});
      return false;
    } else {
      setValidations({email: '', password: ''});
    }

    return true;
  };

  const signIn = async () => {
    if (!checkvalidations()) {
      return;
    }
    login(values)
      .then(res => {
        if (res.success) {
          AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
          dispatch({type: 'SET_USER_INFO', payload: JSON.stringify(res.data)});
          navigation.navigate('HomeMain');
        } else {
          Toast.show({
            type: 'error',
            text1: res.message,
          });
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Login Failed...',
          text2: error,
        });
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.subTitle}>{t('email')}</Text>
          <TextInput
            onFocus={() => setFocusedItem('TextInput2')}
            onBlur={() => setFocusedItem('')}
            style={
              focusedItem === 'TextInput2' ? styles.inputOnFocus : styles.input
            }
            value={values.email}
            autoCapitalize="none"
            onChangeText={val => handleChange('email', val.toLowerCase())}
          />
          {validations.email === 'has-empty' ? (
            <Text style={styles.errorText}>{t('email required')}</Text>
          ) : (
            <Text style={styles.errorText} />
          )}
          {validations.email === 'has-danger' ? (
            <Text style={styles.errorText}>{t('input correct format')}</Text>
          ) : (
            <Text style={styles.errorText} />
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.subTitle}>{t('password')}</Text>
          <TextInput
            onFocus={() => setFocusedItem('TextInput1')}
            onBlur={() => setFocusedItem('')}
            style={
              focusedItem === 'TextInput1' ? styles.inputOnFocus : styles.input
            }
            value={values.password}
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={val => handleChange('password', val)}
          />
          {validations.password === 'has-empty' ? (
            <Text style={styles.errorText}>{t('password required')}</Text>
          ) : (
            <Text style={styles.errorText} />
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={() => signIn()}>
          <Text style={styles.text3}>{t('sign in')}</Text>
        </TouchableOpacity>
        <Text
          style={styles.text2}
          onPress={() => navigation.navigate('ForgetPassword')}>
          {t('forgot password?')}
        </Text>
        <View style={styles.askContainer}>
          <View style={styles.partLine} />
          <Text style={styles.text1}>{t("don't have an account?")}</Text>
          <View style={styles.partLine} />
        </View>
        <TouchableOpacity style={styles.button1}>
          <Text
            style={styles.text3}
            onPress={() => navigation.navigate('SignUp')}>
            {t('sign up')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
  },
  scrollContainer: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.33)',
    padding: 8,
    paddingLeft: 20,
    color: 'white',
    borderRadius: 4,
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 18,
    fontWeight: '500',
  },
  inputOnFocus: {
    shadowColor: '#6a4dfd',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderColor: '#6a4dfd',
    width: '100%',
    height: 44,
    borderWidth: 1,
    padding: 8,
    paddingLeft: 20,
    color: 'white',
    borderRadius: 4,
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 18,
    fontWeight: '500',
  },
  errorText: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 1,
    color: '#ff4e4e',
  },
  text1: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginHorizontal: 10,
    letterSpacing: 1,
  },
  text2: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 20,
    letterSpacing: 1,
  },
  text3: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    height: 40,
    width: '100%',
    letterSpacing: 1.5,
  },
  subTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 30,
    marginBottom: 10,
    letterSpacing: 1.4,
  },
  askContainer: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 30,
    alignItems: 'center',
  },
  partLine: {
    height: 1,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.33)',
  },
  button: {
    marginTop: 30,
    paddingTop: 12,
    textAlignVertical: 'center',
    height: 44,
    backgroundColor: '#6a4dfd',
    borderRadius: 4,
    width: '100%',
  },
  button1: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.33)',
    padding: 12,
    borderRadius: 4,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 50,
  },
});
