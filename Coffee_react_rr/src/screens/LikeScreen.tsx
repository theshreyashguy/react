import { View, Text, Image, TouchableOpacity, TextInput, Dimensions, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {themeColors} from '../theme';
import { StatusBar } from 'expo-status-bar';
import Carousel from 'react-native-snap-carousel';
import { BellIcon, ShoppingBagIcon,MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { MapPinIcon } from 'react-native-heroicons/solid'
import { addToLiked , removeFromLikes} from '../store/cartReducer';
import { connect } from 'react-redux';
import LikeCard from '../components/likeCard';

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
function LikeScreen(props) {
  const {coffeeitems} = props 
  useEffect(()=>{
    console.log(coffeeitems.itemsliked,'jollll')
 },[coffeeitems])

  return (
    <View className="flex-1 relative bg-white">
      <StatusBar />

      <Image 
        source={require('../assets/images/beansBackground1.png')} 
        style={{height: height*0.2}} 
        className="w-full absolute -top-5 opacity-10" />
      <SafeAreaView className={ios? '-mb-8': ''}>
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-normal items-center">
        <TouchableOpacity onPress={()=>props.navigation.navigate('Profile')}>
          <Image
            source={require('../assets/images/avatar.png')}
            className="h-9 w-9 rounded-full"
          />
          </TouchableOpacity>

          <View className="flex-row items-center space-x-2">
            <MapPinIcon size="25" color={themeColors.bgLight} />
            <Text className="font-semibold text-base" style = {{color:'black'}}>New York, NYC</Text>
          </View>
          {/* <TouchableOpacity onPress={()=>props.navigation.navigate('PastOrders',{ userId : userId, coffeeItems : props.cartItems })}>
          <ShoppingBagIcon size="27" color="black" />
          </TouchableOpacity> */}
        </View>
        {/* search bar */}
        <View className="mx-5 shadow" style={{marginTop: height*0.045}}>
          <View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6]">
            <TextInput placeholder='Search' className="p-4 flex-1 font-semibold text-gray-700" />
            <TouchableOpacity 
              className="rounded-full p-2" 
              style={{backgroundColor: themeColors.bgLight}}>
              <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
          
      </SafeAreaView>
      {coffeeitems.itemsliked.length  == 0  ? <Text  style = {{color:'black'}}>Oops none till now</Text> : null }

      {/* coffee cards */}
      <View className={`overflow-visible flex justify-center flex-1 mb-8 ${ios? 'mt-10':''}`}>
        <View>
          <Carousel
            containerCustomStyle={{overflow: 'visible'}}
            data={coffeeitems.itemsliked}
            renderItem={({item})=> <LikeCard item={item} />}
            firstItem={0}
            loop={false}
            inactiveSlideScale={0.75}
            inactiveSlideOpacity={0.75}
            sliderWidth={width}
            itemWidth={width*0.63}
            slideStyle={{display: 'flex', alignItems: 'center'}}
          />
        </View>
        
      </View>
      
      
    </View>
   
  )
}


const mapDispatchToProps = {
  addToLiked,
  removeFromLikes
};

const mapStateToProps = (state) => ({
  coffeeitems: state.cart,
});

export default connect(mapStateToProps, mapDispatchToProps)(LikeScreen);