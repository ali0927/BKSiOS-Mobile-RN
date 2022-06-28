import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {forgetPassword} from '../../helper/auth';
import {validateEmail} from '../../utils';
import Toast from 'react-native-toast-message';

export const ForgetPasswordScreen = () => {
  const [values, setValues] = useState({
    email: '',
  });
  const [validations, setValidations] = useState({
    email: '',
  });
  const [focusedItem, setFocusedItem] = useState('');

  const handleChange = (prop, value) => {
    setValidations(prevState => ({...prevState, [prop]: ''}));
    setValues({...values, [prop]: value});
  };

  const checkvalidations = () => {
    if (values.email === '') {
      setValidations({email: 'has-empty'});
      return false;
    } else if (!validateEmail(values.email)) {
      setValidations({email: 'has-danger'});
      return false;
    } else {
      setValidations({email: ''});
    }

    return true;
  };

  const send = async () => {
    if (!checkvalidations()) {
      return;
    }
    forgetPassword(values)
      .then(res => {
        if (res.success) {
          Toast.show({
            type: 'success',
            text1:
              'Email with reset password link was sent. please check your mailbox',
          });
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
          text1: 'Failed...',
          text2: error,
        });
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.subTitle}>Email</Text>
        <TextInput
          onFocus={() => setFocusedItem('TextInput1')}
          onBlur={() => setFocusedItem('')}
          style={
            focusedItem === 'TextInput1' ? styles.inputOnFocus : styles.input
          }
          value={values.email}
          autoCapitalize="none"
          onChangeText={val => handleChange('email', val.toLowerCase())}
        />
        {validations.email === 'has-empty' ? (
          <Text style={styles.errorText}>Email required</Text>
        ) : (
          <Text style={styles.errorText} />
        )}
        {validations.email === 'has-danger' ? (
          <Text style={styles.errorText}>Input Correct Format</Text>
        ) : (
          <Text style={styles.errorText} />
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => send()}>
        <Text style={styles.text3}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#14142f',
    padding: 20,
    paddingTop: 50,
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
  button: {
    marginTop: 30,
    paddingTop: 12,
    textAlignVertical: 'center',
    height: 44,
    backgroundColor: '#6a4dfd',
    borderRadius: 4,
    width: '100%',
  },
});
