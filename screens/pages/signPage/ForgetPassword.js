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
import {forgetPassword} from '../../helper/auth';
import {validateEmail} from '../../utils';

export const ForgetPasswordScreen = ({navigation}) => {
  const [values, setValues] = useState({
    email: '',
  });
  const [validations, setValidations] = useState({
    email: '',
  });
  const [checked, setChecked] = useState(true);

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
    if (!checkvalidations()) return;
    forgetPassword(values)
      .then(res => {
        if (res.success) {
          alert(
            'Email with reset password link was sent. please check your mailbox',
          );
        } else {
          alert(res.message);
        }
      })
      .catch(error => {
        alert('Failed...');
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
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          alignItems: 'center',
          width: 350,
        }}>
        <CheckBox
          style={styles.checkBox}
          onClick={() => {
            setChecked(!checked);
          }}
          isChecked={checked}
          checkBoxColor={'#534f77'}
          rightTextStyle={styles.checkBoxText}
          rightText={''}
        />
        <Text style={styles.text1}>I agree to the</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
          <Text style={styles.text2}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => send()}>
        <Text style={styles.text3}>Submit</Text>
      </TouchableOpacity>
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
    marginRight: 10,
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
    width: 30,
    height: 30,
    marginTop: -12,
  },
});
