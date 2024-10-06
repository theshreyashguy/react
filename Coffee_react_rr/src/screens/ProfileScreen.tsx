import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  MapIcon,
  UserIcon,
  PhoneIcon,
  ShoppingBagIcon,
} from 'react-native-heroicons/outline';
import { connect, useDispatch } from 'react-redux';
import { setUser } from '../store/cartReducer';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
const ios = Platform.OS == 'ios';

function ProfileScreen(props) {
  const [user, setUserr] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const id = props.user.id;
  const dispatch = useDispatch();
  const setUserhook = async (payload) => {
    dispatch(
      setUser({
        username: payload.username,
        email: payload.email,
        phone: payload.phone,
        id: payload.id,
      })
    );
  };

  useEffect(() => {
    // Fetch user data from the server
    const fetchUserData = async () => {
      try {
        setUserr(props.user);
        setUsername(props.user.username);
        setEmail(props.user.email);
        setPhone(props.user.phone);
      } catch (error) {
        console.log('Failed to fetch user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      setUserhook({
        username,
        email,
        phone,
        id,
      });
      setIsEditing(false);
      console.log('Profile updated successfully');
    } catch (error) {
      console.log('Failed to update profile', error);
    }
  };

  const handleLogout = async () => {
    try {
      props.navigation.replace('SignIn');
    } catch (error) {
      console.log('Logout failed', error);
    }
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.topView}>
          <Image
            source={require('../assets/images/avatar.png')}
            style={styles.avatar}
          />

          <View style={styles.locationContainer}>
            <MapPinIcon size="25" color={themeColors.bgLight} />
            <Text style={styles.locationText}>New York, NYC</Text>
          </View>

        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <Text style={styles.headerText}>Profile</Text>

            <View style={styles.inputContainer}>
              <UserIcon style={styles.icon} color="#8B4513" size={24} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#8B4513"
                value={username}
                editable={isEditing}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.inputContainer}>
              <MapIcon style={styles.icon} color="#8B4513" size={24} />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#8B4513"
                value={email}
                editable={isEditing}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <PhoneIcon style={styles.icon} color="#8B4513" size={24} />
              <TextInput
                style={styles.input}
                placeholder="Phone number"
                placeholderTextColor="#8B4513"
                value={phone}
                editable={isEditing}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            {isEditing ? (
              <TouchableOpacity
                style={styles.button}
                onPress={handleUpdateProfile}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#8B4513',
  },
  avoidingView: {
    flex: 1,
    backgroundColor: '#8B4513',
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    color: themeColors.bgLight,
  },
  scrollView: {
    flexGrow: 1,
    marginTop:50
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 20,
    textAlign: 'center',
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
  button: {
    backgroundColor: '#8B4513',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  user: state.cart,
});

export default connect(mapStateToProps, null)(ProfileScreen);
