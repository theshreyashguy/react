import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { MapIcon, LockClosedIcon } from 'react-native-heroicons/outline';
import { auth } from '../network/auth';
import {setUser} from '../store/cartReducer';
import { useDispatch } from 'react-redux';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';



const { height } = Dimensions.get('window');

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
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
   

  const isFormValid = email && password;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '789493108885-gtg15bnohd9iiq6oo5jkbi8e9g0qk004.apps.googleusercontent.com'
     
    });
  //  console.log('done');
  }, []);

  // Google Login
  const handleGoogleLogin = async () => {
    const data = await GoogleSignin.signIn();
    console.log(data.user.email,'user');
    try {
     // const signInData = { username: data.user.email, password: password };
      const responce = await auth.currentUser(data.user.email);
      console.log('responce',responce);
      if(!responce.status){
        const payload = responce.user;  
        await  setUserhook(payload)
        navigation.replace('Home');
     }
      else{
        Alert.alert("Wrong Credentials",'user do not exist')
      }
    } catch (error) {
      console.log(error);
    }
  };
  // id: string;
  // name: string | null;
  // email: string;
  // photo: string | null;
  // familyName: string | null;
  // givenName: string | null;
  return (
    <KeyboardAvoidingView
      style={styles.avoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View className="flex-1" style={{ backgroundColor: '#8B4513' }}>
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
            }}
          >
            <View style={styles.container}>
              <Text style={styles.headerText}>Sign In</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={styles.createAccountButton}
              >
                <Text style={styles.createAccountText}>Create Account</Text>
              </TouchableOpacity>

              <View style={styles.inputContainer}>
                <MapIcon style={styles.icon} color="#8B4513" size={24} />
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor="#8B4513"
                  value={email}
                  onChangeText={setEmail}
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
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.loginButton,
                  {
                    borderColor: isFormValid ? '#8B4513' : 'red',
                    borderWidth: 1,
                  },
                ]}
                onPress={async () => {
                  if (isFormValid) {
                    ///navigation.replace('Home');
                    try {
                      const signInData = { username: email, password: password };
                      const responce = await auth.signIn(signInData);
                      //console.log(responce);
                      if(!responce.status){
                        const payload = responce.user;  
                        await  setUserhook(payload)
                        navigation.replace('Home');
                     }
                      else{
                        Alert.alert("Wrong Credentials",'user already exist or wrong credentials')
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }
                }}
                disabled={!isFormValid}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <View style={styles.socialLoginContainer}>
                <TouchableOpacity style={styles.socialButton} onPress={()=>handleGoogleLogin()}>
                  <Image source={require('../assets/icons/google.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Image source={require('../assets/icons/facebook.png')} />
                </TouchableOpacity>
              </View>
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
  createAccountButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  createAccountText: {
    color: '#8B4513',
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

