import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SavedScreen from '../screens/SavedScreen';
import LikeScreen from '../screens/LikeScreen';
import {  LogBox, Platform, View } from 'react-native';
import ProductScreen from '../screens/ProductScreen';
import { themeColors } from '../theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeIcon as HomeOutline, HeartIcon as HeartOutline, ShoppingBagIcon as BagOutline } from 'react-native-heroicons/outline';
import {HomeIcon as HomeSolid, HeartIcon as HeartSolid, ShoppingBagIcon as BagSolid} from 'react-native-heroicons/solid';
import OptionScreen from '../screens/Option';
import SignInScreen from '../screens/SIgnIn';
import ProfileScreen from '../screens/ProfileScreen';
import SignUpScreen from '../screens/SignUp';
import { connect, useSelector } from 'react-redux';
///import SnackBarcompoment from '../components/snackbar';
import OrderListScreen from '../screens/orderListScreen';
 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ios = Platform.OS == 'ios';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function AppNavigation(props) {
  const {showsnackbar} = props;
 //console.log(props);
 return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        contentStyle: {backgroundColor: 'white'}
      }}>
        <Stack.Screen name="Option" options={{headerShown: false}} component={OptionScreen} />
        <Stack.Screen name="SignIn" options={{headerShown: false}} component={SignInScreen} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeTabs} />
        <Stack.Screen name="Product" options={{headerShown: false}} component={ProductScreen} />
        <Stack.Screen name="Profile" options={{headerShown: false}} component={ProfileScreen} />
        <Stack.Screen name="PastOrders" options={{headerShown: false}} component={OrderListScreen} />
      </Stack.Navigator>
      {/* {showsnackbar ? <SnackBarcompoment text={''} theme={undefined} faildata={undefined} /> : null}  */}
    </NavigationContainer>
  )
  
}

function HomeTabs(){
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => menuIcons(route, focused),
        tabBarStyle: {
          marginBottom: 20,
          height: 75,
          alignItems: 'center',
          
          borderRadius: 100,
          marginHorizontal: 20,
          backgroundColor: themeColors.bgLight,

        },
        tabBarItemStyle: {
          marginTop: ios? 30: 0,
          
        }
      })}
      
      >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="favourite" component={LikeScreen} />
      <Tab.Screen name="cart" component={SavedScreen} />
    </Tab.Navigator>
  )
}

const menuIcons = (route : any, focused : any)=> {
  let icon;
  

  if (route.name === 'home') {
    icon =  focused? <HomeSolid size="30" color={themeColors.bgLight} /> : <HomeOutline size="30" strokeWidth={2} color="white" />
  } else if (route.name === 'favourite') {
    icon =  focused? <HeartSolid size="30" color={themeColors.bgLight} /> : <HeartOutline size="30" strokeWidth={2} color="white" />
  }else if(route.name==='cart'){
    icon =  focused? <BagSolid size="30" color={themeColors.bgLight} /> : <BagOutline size="30" strokeWidth={2} color="white" />
  }

  
  let buttonClass = focused? "bg-white": "";
  return (
    <View className={"flex items-center rounded-full p-3 shadow " + buttonClass}>
      {icon}
    </View>
  )
}


const mapStateToProps = (state) => ({
  showsnackbar: state.cart.showSnackBar,
});

export default connect(mapStateToProps)(AppNavigation);