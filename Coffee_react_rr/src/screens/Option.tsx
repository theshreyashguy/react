import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import {ArrowRightIcon} from 'react-native-heroicons/outline';
import {connect, useDispatch} from 'react-redux';
import {SHOW_SNACKBAR} from '../store/snackBarReducer';

const {width, height} = Dimensions.get('window');
function OptionScreen(props) {
  useEffect(() => {
    console.log(props.user);
    if (props.user.username !== '') {
      //console.log(props.user, 'user   ....');
      props.navigation.navigate('Home');
    }
    else {
      setTimeout(()=>props.navigation.replace('SignIn'),200);
    }
  }, []);
  const dispatch = useDispatch();
  const showSnackBar = () => {
    dispatch(
      SHOW_SNACKBAR({
        status: 'success',
        text: 'This is a success message!',
        position: 'bottom',
        containerStyle: {backgroundColor: 'green'},
      }),
    );
  };

  // const closeSnackBar = () => {
  //   dispatch(CLOSE_SNACKBAR());
  // };
  return (
    <View className="flex-1">
      <View style={styles.container}>
        <Image
          source={require('../assets/pngwing.com.png')}
          style={styles.logo}
        />
        <TouchableOpacity
          onPress={() => {
            // showSnackBar();
            // props.navigation.navigate('SignIn');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: 130,
            borderRadius: 15,
            backgroundColor: '#E1B990',
            paddingVertical: 10,
            paddingHorizontal: 2,
          }}>
          <Text style={{color: 'black'}}>Lets Start</Text>
          <ArrowRightIcon size={10} color={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 1 * height,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 1 * width,
    alignSelf: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    backgroundColor: '',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

const mapStateToProps = state => ({
  user: state.cart,
});

export default connect(mapStateToProps, null)(OptionScreen);
