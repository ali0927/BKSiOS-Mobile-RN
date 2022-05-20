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

export const ProfileDetails = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [isDetails, setIsDetails] = useState(true);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: 20,
        }}>
        <Text style={styles.text3}>{isDetails ? "Profile Details" : "Change Password"}</Text>
        <TouchableOpacity onPress={() => setIsDetails(!isDetails)}>
          <Text style={styles.text2}>{isDetails ? "Change Password " : "Profile Details "}&#10148;</Text>
        </TouchableOpacity>
      </View>
      {isDetails && (
        <View>
          <Text style={styles.text1}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => setUserEmail(val)}
          />
          <Text style={styles.text1}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => setUserEmail(val)}
          />
          <Text style={styles.text1}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => setUserEmail(val)}
          />
          <Text style={styles.text1}>Background</Text>
          <TextInput
            style={styles.input}
            placeholder="Background"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => setUserEmail(val)}
          />
          <TouchableOpacity style={styles.button} onPress={() => signIn()}>
            <Text style={styles.text3}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
      {!isDetails&& <View>
          <Text style={styles.text1}>Old Password</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={val => setUserEmail(val)}
          />
          <Text style={styles.text1}>New Password</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={val => setUserEmail(val)}
          />
          <Text style={styles.text1}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={val => setUserEmail(val)}
          />
          
          <TouchableOpacity style={styles.button} onPress={() => signIn()}>
            <Text style={styles.text3}>Change</Text>
          </TouchableOpacity>
        </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  text1: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    width: 350,
    marginLeft: 20,
    marginTop: 15,
  },
  text2: {
    color: '#6164ff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  text3: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  button: {
    marginTop: 30,
    paddingTop: 10,
    backgroundColor: '#6164ff',
    borderRadius: 12,
    width: 350,
    margin: 10,
    height: 50,
  },
});
