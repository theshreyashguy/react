import React, {useState} from 'react';
import {
  View,
  Text,
 // Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  MapIcon,
  LockClosedIcon,
  UserIcon,
  PhoneIcon,
} from 'react-native-heroicons/outline';
import {auth}  from '../network/auth';
import messaging from '@react-native-firebase/messaging';
//import { store } from '../background/persist';
import {setUser} from '../store/cartReducer';
import { useDispatch } from 'react-redux';

const {height} = Dimensions.get('window');

export default function SignUpScreen({navigation}) {
  // Define state variables to hold input values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const setUserhook = async (payload)=>{
    dispatch(setUser({
    username: payload.username,
    email: payload.email,
    phone: payload.phone,
    id: payload.id
  }));
}

  // Check if all inputs are filled
  const isFormValid = username && email && phone && password;

  // function setUser(arg0: { username: any; email: any; phone: any; }): any {
  //   throw new Error('Function not implemented.');
  // }

  return (
    <KeyboardAvoidingView
      style={styles.avoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View className="flex-1" style={{backgroundColor: '#8B4513'}}>
          <View
            style={{
              marginTop: height * 0.3,
              backgroundColor: 'white',
              flex: 1,
              borderTopStartRadius: 50,
              borderTopEndRadius: 50,
              borderTopColor: 'black',
              borderBottomColor: 'white',
              borderWidth: 0.2,
            }}>
            <View style={styles.container}>
              <Text style={styles.headerText}>Sign Up</Text>

              <View style={styles.inputContainer}>
                <UserIcon style={styles.icon} color="#8B4513" size={24} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#8B4513"
                  value={username}
                  onChangeText={setUsername} // Update username state
                />
              </View>

              <View style={styles.inputContainer}>
                <MapIcon style={styles.icon} color="#8B4513" size={24} />
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor="#8B4513"
                  value={email}
                  onChangeText={setEmail} // Update email state
                />
              </View>

              <View style={styles.inputContainer}>
                <PhoneIcon style={styles.icon} color="#8B4513" size={24} />
                <TextInput
                  style={styles.input}
                  placeholder="Phone number"
                  placeholderTextColor="#8B4513"
                  value={phone}
                  onChangeText={setPhone} // Update phone state
                  keyboardType="phone-pad" // Set keyboard type for phone input
                />
              </View>

              <View style={styles.inputContainer}>
                <LockClosedIcon style={styles.icon} color="#8B4513" size={24} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#8B4513"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword} // Update password state
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.loginButton,
                  {
                    borderColor: isFormValid ? '#8B4513' : 'red', // Change border color based on form validity
                    borderWidth: 1,
                  },
                ]}
                onPress={async () => {
                  if (isFormValid) {
                    try {
                      const token = await messaging().getToken();
                      const signUpData = {
                        username,
                        email,
                        phone,
                        password,
                        token,
                      };
                      console.log(token);
                      const responce  = await auth.signUp(signUpData);
                      // console.log(responce.status,'respoce lodd');
                      if(!responce.status){
                        
                        const payload = responce.user;  
                        // console.log(payload.username, payload);
                       
                      await  setUserhook(payload)
                       navigation.replace('Home');
                      }
                      else{
                        Alert.alert("Wrong Credentials",'user already exist')
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }
                }}
                disabled={!isFormValid} // Disable button if form is not valid
                
              >
                <Text style={styles.loginButtonText}>Sign Up</Text>
              </TouchableOpacity>

              {/* <View style={styles.socialLoginContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <Image source={require('../assets/icons/facebook.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Image source={require('../assets/icons/google.png')} />
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  avoidingView: {
    flex: 1,
    backgroundColor: '#8B4513',
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#8B4513',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#8B4513',
  },
  loginButton: {
    backgroundColor: '#8B4513',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    marginHorizontal: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: '#8B4513',
    borderRadius: 15,
  },
});
