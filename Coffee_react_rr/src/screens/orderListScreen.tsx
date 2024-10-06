import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Text, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import OrderComponent from '../components/orderComponent';
import { order } from '../network/order';
import { BellIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const OrderListScreen = (props) => {
  const [orders, setOrders] = useState([]);
  const { navigation } = props;
  const te = props.route.params;

  useEffect(() => {
    const getOrders = async () => {
      try {
        const fetchedOrders = await order.getOrdersByUser(te.userId);
        console.log(fetchedOrders,'fetch orders');
        setOrders(fetchedOrders.orders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    getOrders();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <OrderComponent order={item} />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/images/avatar.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>

        <View style={styles.locationContainer}>
          <MapPinIcon size={25} color={themeColors.bgLight} />
          <Text style={styles.locationText}>New York, NYC</Text>
        </View>

        <BellIcon size={27} color="black" />
      </View>

      <View style={styles.carouselContainer}>
        <Carousel
          data={orders}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth * 0.8}
          sliderHeight={screenHeight}
          itemHeight={screenHeight * 0.4}
          vertical={true}
          loop={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop:screenWidth*0.05,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  carouselContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default OrderListScreen;
