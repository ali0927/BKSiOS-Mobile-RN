import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {login} from '../../helper/auth';
import {validateEmail} from '../../utils';
import {useDispatch} from 'react-redux';

export const SignInScreen = ({navigation}) => {
  const dispatch = useDispatch();

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
    if (!checkvalidations()) return;
    login(values)
      .then(res => {
        if (res.success) {
          dispatch({type: 'SET_USER_INFO', payload: JSON.stringify(res.data)});
          navigation.navigate('HomeMain');
        } else {
          alert(res.message);
        }
      })
      .catch(error => {
        alert('Login Failed...');
        console.log('Login failed...', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{position: 'relative', width: '100%'}}>
        <Text style={styles.subTitle}>Email</Text>
        <TextInput
          onFocus={() => setFocusedItem('TextInput2')}
          onBlur={() => setFocusedItem('')}
          style={
            focusedItem === 'TextInput2' ? styles.inputOnFocus : styles.input
          }
          value={values.email}
          autoCapitalize="none"
          onChangeText={val => handleChange('email', val)}
        />
        {validations.email == 'has-empty' ? (
          <Text style={styles.errorText}>Email required</Text>
        ) : (
          <Text style={styles.errorText}></Text>
        )}
        {validations.email == 'has-danger' ? (
          <Text style={styles.errorText}>Input Correct Format</Text>
        ) : (
          <Text style={styles.errorText}></Text>
        )}
      </View>
      <View style={{position: 'relative', width: '100%'}}>
        <Text style={styles.subTitle}>Password</Text>
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
        {validations.password == 'has-empty' ? (
          <Text style={styles.errorText}>Password required</Text>
        ) : (
          <Text style={styles.errorText}></Text>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => signIn()}>
        <Text style={styles.text3}>Sign In</Text>
      </TouchableOpacity>
      <Text
        style={styles.text2}
        onPress={() => navigation.navigate('ForgetPassword')}>
        Forgot password?
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 50,
          marginBottom: 30,
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 1,
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.33)',
          }}></View>
        <Text style={styles.text1}>Don't have an account?</Text>
        <View
          style={{
            height: 1,
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.33)',
          }}></View>
      </View>
      <TouchableOpacity style={styles.button1} onPress={() => signIn()}>
        <Text
          style={styles.text3}
          onPress={() => navigation.navigate('SignUp')}>
          Sign up
        </Text>
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
  input: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.33)',
    padding: 8,
    paddingLeft: 20,
    color: 'white',
    borderRadius: 4,
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
    fontSize: 18,
    fontWeight: '500',
  },
  errorText: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    fontSize: 14,
    fontWeight: '600',
    color: '#b00020',
  },
  img: {
    width: '70%',
    height: 52,
    marginBottom: 20,
  },
  text1: {
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginHorizontal: 10,
    letterSpacing: 1.6,
  },
  text2: {
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 20,
    letterSpacing: 1.6,
  },
  text3: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    height: 40,
    width: '100%',
    letterSpacing: 1.6,
  },
  subTitle: {
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
  button1: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.33)',
    padding: 12,
    borderRadius: 4,
    fontSize: 18,
    fontWeight: '500',
  },
});
