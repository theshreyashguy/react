import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {themeColors} from '../theme';
import {StatusBar} from 'expo-status-bar';
import Carousel from 'react-native-snap-carousel';
import {ShoppingBagIcon , MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {MapPinIcon} from 'react-native-heroicons/solid';
import {addToCart, removeFromCart,removeAllFromCart} from '../store/cartReducer';
import {connect} from 'react-redux';
import OrderCard from '../components/orderCard';
import createOrder from '../services/orderService';
import uuid from 'react-native-uuid';
import { payment } from '../Payment/payment';

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
function SavedScreen(props) {
  //const [activeCategory, setActiveCategory] = useState(1);
  //console.log(props.user.id);
  console.log(props.cartItems.length, props.cartItems.length  == undefined ? false : true );
  const {cartItems , user} = props;
  const userId = `${user.id}`;
  const totalAmount = cartItems.reduce((total, item) => {
    return total + parseFloat(item.price) * item.volume; // Assuming volume is the quantity
  }, 0);
  const items = cartItems.map(item => ({
    coffeeId: item.id,
    quantity: item.volume,
  }));

  return (
    <View className="flex-1 relative bg-white">
      <StatusBar />

      <Image
        source={require('../assets/images/beansBackground1.png')}
        style={{height: height * 0.2}}
        className="w-full absolute -top-5 opacity-10"
      />
      <SafeAreaView className={ios ? '-mb-8' : ''}>
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center">
          <TouchableOpacity onPress={()=>props.navigation.navigate('Profile')}>
          <Image
            source={require('../assets/images/avatar.png')}
            className="h-9 w-9 rounded-full"
          />
          </TouchableOpacity>

          <View className="flex-row items-center space-x-2">
            <MapPinIcon size="25" color={themeColors.bgLight} />
            <Text className="font-semibold text-base">New York, NYC</Text>
          </View>
          <TouchableOpacity onPress={()=>props.navigation.navigate('PastOrders',{ userId : userId, coffeeItems : props.cartItems })}>
          <ShoppingBagIcon size="27" color="black" />
          </TouchableOpacity>
        </View>
        {/* search bar */}
        
      </SafeAreaView>

      {/* coffee cards */}
      <View
        className={`overflow-visible flex justify-center flex-1 mb-0 ${
          ios ? 'mt-10' : ''
        }`} style = {{marginTop:height*0.07}}>
        <View>
          <Carousel
            containerCustomStyle={{overflow: 'visible'}}
            data={cartItems}
            renderItem={({item}) => <OrderCard item={item} />}
            firstItem={0}
            loop={false}
            inactiveSlideScale={0.75}
            inactiveSlideOpacity={0.75}
            sliderWidth={width}
            itemWidth={width * 0.63}
            slideStyle={{display: 'flex', alignItems: 'center'}}
          />
        </View>
      </View>

      <TouchableOpacity
        disabled={(props.cartItems.length  == undefined || props.cartItems.length  == 0  ? true : false) }
        onPress={async ( ) => {
          const orderId =uuid.v4() ;
          const paymentId = uuid.v4();
          const payload = {
            userId,
            orderId,
            paymentId,
            items,
            totalAmount,
            orderDate: new Date().toISOString(),
          };
         // console.log(payload);
          createOrder(payload).then(()=>{
            props.removeAllFromCart();
            payment(totalAmount, user.email, user.phone, user.username);
          });

        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: width * 0.3,
          borderRadius: 15,
          backgroundColor: themeColors.bgLight,
          paddingVertical: 10,
          paddingHorizontal: 2,
          alignSelf: 'center',
          marginBottom: 5,
          borderWidth: 0.5,
        }}>
        <Text style={{color: 'black'}}>Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapDispatchToProps = {
  addToCart,
  removeFromCart,
  removeAllFromCart
};

const mapStateToProps = state => ({
  cartItems: state.cart.items,
  user: state.cart,
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedScreen);
