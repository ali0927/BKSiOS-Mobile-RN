import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import imgLogo from '../../../assets/img/logo.png';
import {login, verifyEmail} from '../../helper/auth';
import {validateEmail} from '../../utils';

export const SignInScreen = ({navigation}) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [validations, setValidations] = useState({
    email: '',
    password: '',
  });
  const [checked, setChecked] = useState(false);

  const handleChange = (prop, value) => {
    setValidations(prevState => ({...prevState, [prop]: ''}));
    setValues({...values, [prop]: value});
    console.log('Values', values);
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
          AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
          navigation.navigate('Home');
        } else {
          console.log('Error while signing...');
        }
      })
      .catch(error => {
        console.log('Login failed...', error);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={imgLogo} style={styles.img} />
      <View style={{position: 'relative'}}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={values.email}
          autoCapitalize="none"
          placeholderTextColor="white"
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
      <View style={{position: 'relative'}}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={values.password}
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={val => handleChange('password', val)}
        />
        {validations.password == 'has-empty' ? (
          <Text style={styles.errorText}>Password required</Text>
        ) : (
          <Text style={styles.errorText}></Text>
        )}
      </View>
      <CheckBox
        style={styles.checkBox}
        onClick={() => {
          setChecked(!checked);
        }}
        isChecked={checked}
        checkBoxColor={'#534f77'}
        rightTextStyle={styles.checkBoxText}
        rightText={'Remember Me'}
      />
      <TouchableOpacity style={styles.button} onPress={() => signIn()}>
        <Text style={styles.text3}>Sign In</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginTop: 30, marginBottom: 20}}>
        <Text style={styles.text1}>Don't have an account?</Text>
        <Text
          style={styles.text2}
          onPress={() => navigation.navigate('SignUp')}>
          Sign up!
        </Text>
      </View>
      <Text
        style={styles.text2}
        onPress={() => navigation.navigate('ForgetPassword')}>
        Forgot password?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#534f77',
    marginHorizontal: 10,
    marginVertical: 20,
    padding: 8,
    paddingLeft: 20,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  errorText: {
    position: 'absolute',
    bottom: -25,
    left: 15,
    fontSize: 18,
    marginBottom: 20,
    color: '#b00020',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14142f',
  },
  img: {
    width: '70%',
    height: 52,
    marginBottom: 20,
  },
  text1: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    height: 40,
    marginRight: 20,
  },
  text2: {
    color: '#6164ff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    height: 40,
  },
  text3: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    height: 40,
    width: '100%',
  },
  button: {
    marginTop: 30,
    paddingTop: 10,
    backgroundColor: '#6164ff',
    borderRadius: 12,
    width: 350,
    margin: 10,
  },
  checkBox: {
    width: 350,
    height: 20,
    marginTop: 20,
  },
  checkBoxText: {
    color: '#fff',
    fontSize: 16,
  },
});
