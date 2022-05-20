import React, {useState} from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import {SafeAreaView} from 'react-native-safe-area-context';
import imgLogo from '../../../assets/img/logo.png';

export const SignUpScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [checked, setChecked] = React.useState(false);

  const signUp = async () => {
    try {
      console.log('user successfully signed in!', success);
    } catch (err) {
      console.log('error signing in: ', err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={imgLogo} style={styles.img} />
      <TextInput
        style={styles.input}
        placeholder="Name"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={val => setUserEmail(val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={val => setUserEmail(val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={val => setPwd(val)}
      />
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
        <Text style={styles.text2}>Privacy Policy</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => signUp()}>
        <Text style={styles.text3}>Sign Up</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginTop: 30, marginBottom: 20}}>
        <Text style={styles.text1}>Already have an account?</Text>
        <Text
          style={styles.text2}
          onPress={() => navigation.navigate('SignIn')}>
          Sign In!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14142f',
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#534f77',
    margin: 10,
    padding: 8,
    paddingLeft: 20,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
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
