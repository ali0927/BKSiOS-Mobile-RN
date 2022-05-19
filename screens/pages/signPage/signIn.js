import React, {useState} from 'react';
import {View, Button, TextInput, StyleSheet} from 'react-native';

export const SignInScreen = () => {
  const [userEmail, setUserEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const signUp = async () => {
    try {
      console.log('user successfully signed in!', success);
    } catch (err) {
      console.log('error signing in: ', err);
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Sign Up" onPress={() => signUp()} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#14142f"
  },
});
