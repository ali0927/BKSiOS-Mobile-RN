import React, {useState} from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import CheckBox from 'react-native-check-box';
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
      <CheckBox
        style={styles.checkBox}
        onClick={()=>{
            setChecked(!checked)
          }}
        isChecked={checked}
        checkBoxColor={'#534f77'}
        rightTextStyle={styles.checkBoxText}
        rightText={'Remember Me'}
    />
      <TouchableOpacity style={styles.button} onPress={() => signUp()}>
        <Text style={styles.text3}>Sign In</Text>
      </TouchableOpacity>
      <View style={{flexDirection: "row", marginTop: 30, marginBottom: 20}}>
        <Text style={styles.text1}>Don't have an account?</Text>
        <Text style={styles.text2} onPress={() => navigation.navigate("SignUp")}>Sign up!</Text>
      </View>
      <Text style={styles.text2} onPress={() => navigation.navigate("ForgetPassword")}>Forgot password?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginRight: 20
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
      color: "#fff",
      fontSize: 16
  }
});
