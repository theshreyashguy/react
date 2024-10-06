import { View, Text, Image, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { StarIcon } from 'react-native-heroicons/solid';
import {  MinusIcon } from 'react-native-heroicons/outline';
import {  addToLiked , removeFromLikes} from '../store/cartReducer';
import { connect } from 'react-redux';
const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
function LikeCard(props) {
    //console.log(item)
    const item = props.item;
    const id = item.id
 // const navigation = useNavigation();
  return (

      <View 
        style={{
          borderRadius: 40, 
          backgroundColor: themeColors.bgDark, 
          height: ios? height*0.4 : height*0.56, 
          width: width*0.65,
        }} 
        >
        <View 
        style={{
          shadowColor: 'black',
          shadowRadius: 30,
          shadowOffset: {width: 0, height: 30},
          shadowOpacity: 0.8,
          marginTop: ios? -(height*0.08): 15,
        }}
        className="flex-row justify-center">
          <Image 
            source={require(`../assets/images/coffee2.png`)} 
            className="h-40 w-40" 
          />
        </View>
          <View className={`px-5 flex-1 justify-between ${ios? 'mt-5': ''}`}>
            <View className="space-y-3 mt-3">
              <Text className="text-3xl text-white font-semibold z-10">
                {item.name}
              </Text>
              <View style={{backgroundColor: 'rgba(255,255,255,0.2)'}} 
                className="flex-row items-center rounded-3xl p-1 px-2 space-x-1 w-16">
                <StarIcon size="15" color="white" />
                <Text className="text-base font-semibold text-white">{item.stars}</Text>
              </View>
              <View className="flex-row space-x-1 z-10 mb-6">
                <Text className="text-base text-white font-semibold opacity-60">
                  Volume 
                </Text>
                <Text className="text-base text-white font-semibold"> {item.volume}</Text>
              </View>
            </View>
            

            <View style={{
              backgroundColor: ios? themeColors.bgDark: 'transparent',
              shadowColor: themeColors.bgDark,
              shadowRadius: 25,
              shadowOffset: {width: 0, height: 40},
              shadowOpacity: 0.8,
            }} className="flex-row justify-between items-center mb-5">
              <Text className="text-white font-bold text-lg">$ {item.price}</Text>
              <TouchableOpacity 
              onPress={()=> {
                // remove like
                console.log(item)
               props.removeFromLikes({...item})
              }}
              style={{
                shadowColor: 'black',
                shadowRadius: 40,
                shadowOffset: {width: -20, height: -10},
                shadowOpacity: 1,
              }} className="p-4 bg-white rounded-full">
                <MinusIcon size="25" strokeWidth={2} color={themeColors.bgDark} />
              </TouchableOpacity>
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
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(LikeCard);