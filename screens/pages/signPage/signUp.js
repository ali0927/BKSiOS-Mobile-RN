import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import {signup} from '../../helper/auth';
import {validateEmail} from '../../utils';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

export const SignUpScreen = ({navigation}) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPwd: '',
  });
  const [validations, setValidations] = useState({
    name: '',
    email: '',
    password: '',
    confirmPwd: '',
  });
  const [focusedItem, setFocusedItem] = useState('');

  const userInfo = useSelector(state => state.userInfoReducer).userInfo;

  const handleChange = (prop, value) => {
    setValidations(prevState => ({...prevState, [prop]: ''}));
    setValues({...values, [prop]: value});
  };

  const checkvalidations = () => {
    if (values.name === '') {
      setValidations({name: 'has-empty', email: '', password: ''});
      return false;
    } else if (values.email === '') {
      setValidations({name: '', email: 'has-empty', password: ''});
      return false;
    } else if (!validateEmail(values.email)) {
      setValidations({name: '', email: 'has-danger', password: ''});
      return false;
    } else if (values.password === '') {
      setValidations({name: '', email: '', password: 'has-empty'});
      return false;
    } else if (values.password !== values.confirmPwd) {
      setValidations({
        name: '',
        email: '',
        password: '',
        confirmPwd: 'has-empty',
      });
      return false;
    } else {
      setValidations({name: '', email: '', password: ''});
    }

    return true;
  };

  const signUp = async () => {
    console.log('signup');
    if (!checkvalidations()) {
      return;
    }

    signup(values)
      .then(res => {
        if (res.success) {
          Toast.show({
            type: 'success',
            text1: 'Signup Success! Please Verify your email.',
          });
          return;
        } else {
          Toast.show({
            type: 'success',
            text1: res.message,
          });
        }
      })
      .catch(error => {
        Toast.show({
          type: 'success',
          text1: 'Signup failed...',
          text2: error,
        });
      });
  };

  useEffect(() => {
    if (userInfo) {
      navigation.navigate('HomeMain');
    }
  }, [userInfo, navigation]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.subTitle}>Name</Text>
          <TextInput
            onFocus={() => setFocusedItem('TextInput1')}
            onBlur={() => setFocusedItem('')}
            style={
              focusedItem === 'TextInput1' ? styles.inputOnFocus : styles.input
            }
            value={values.name}
            autoCapitalize="none"
            onChangeText={val => handleChange('name', val)}
          />
          {validations.name === 'has-empty' ? (
            <Text style={styles.errorText}>Name required*</Text>
          ) : (
            <Text style={styles.errorText} />
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.subTitle}>Email</Text>
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
            <Text style={styles.errorText}>Email required*</Text>
          ) : (
            <Text style={styles.errorText} />
          )}
          {validations.email === 'has-danger' ? (
            <Text style={styles.errorText}>Input Correct Format</Text>
          ) : (
            <Text style={styles.errorText} />
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.subTitle}>Password</Text>
          <TextInput
            onFocus={() => setFocusedItem('TextInput3')}
            onBlur={() => setFocusedItem('')}
            style={
              focusedItem === 'TextInput3' ? styles.inputOnFocus : styles.input
            }
            value={values.password}
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={val => handleChange('password', val)}
          />
          {validations.password === 'has-empty' ? (
            <Text style={styles.errorText}>Password required*</Text>
          ) : (
            <Text style={styles.errorText} />
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.subTitle}>Confirm Password</Text>
          <TextInput
            onFocus={() => setFocusedItem('TextInput4')}
            onBlur={() => setFocusedItem('')}
            style={
              focusedItem === 'TextInput4' ? styles.inputOnFocus : styles.input
            }
            value={values.confirmPwd}
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={val => handleChange('confirmPwd', val)}
          />
          {validations.confirmPwd === 'has-empty' ? (
            <Text style={styles.errorText}>Password doesn't match</Text>
          ) : (
            <Text style={styles.errorText} />
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={() => signUp()}>
          <Text style={styles.text3}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.askContainer}>
          <View style={styles.partLine} />
          <Text style={styles.text1}>Already have an account?</Text>
          <View style={styles.partLine} />
        </View>
        <TouchableOpacity style={styles.button1}>
          <Text
            style={styles.text3}
            onPress={() => navigation.navigate('SignIn')}>
            Sign in
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  img: {
    width: '70%',
    height: 52,
    marginBottom: 20,
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
