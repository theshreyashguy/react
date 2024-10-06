import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { order as orderNetwork } from '../network/order';
import { coffeeItems } from '../constants';

const OrderComponent = ({ order }) => {
  const getCoffeeName = (coffeeId) => {
    const coffee = coffeeItems.find(item => item.id === coffeeId);
    return coffee ? coffee.name : 'Unknown Coffee';
  };

  const [paymentObject, setPayment] = useState(null);

  useEffect(() => {
    const getPayment = async () => {
      try {
        const response = await orderNetwork.getPaymentById(order.paymentId);
      //  console.log(response.payment,'payment responce');
        setPayment(response.payment);
      } catch (error) {
        console.log(error);
      }
    };

    getPayment();
  }, []);

  const renderPaymentStatus = () => {
    if (!paymentObject) {
      return <Text style={styles.status}>Loading payment status...</Text>;
    }

    switch (paymentObject.status) {
      case 'Completed':
        return <Text style={[styles.status, styles.completed]}>Payment Completed</Text>;
      case 'Pending':
        return (
          <View>
            <Text style={[styles.status, styles.pending]}>Payment Pending</Text>
            <Button title="Complete Payment" onPress={() => {/* handle payment completion */}} />
          </View>
        );
      case 'Failed':
        return <Text style={[styles.status, styles.failed]}>Payment Failed</Text>;
      default:
        return (
          <View>
            <Text style={[styles.status, styles.pending]}>Payment Pending</Text>
            <Button title="Complete Payment" onPress={() => {/* handle payment completion */}} />
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>Date: {new Date(order.orderDate).toLocaleDateString()}</Text>
      <Text style={styles.total}>Total Amount: ${order.totalAmount.toFixed(2)}</Text>

      {order.items.map(item => (
        <View key={item.coffeeId} style={styles.itemContainer}>
          <Image
            source={coffeeItems.find(coffee => coffee.id === item.coffeeId).image}
            style={styles.image}
          />
          <Text style={styles.itemName}>{getCoffeeName(item.coffeeId)}</Text>
          <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        </View>
      ))}

      {renderPaymentStatus()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    flex: 1,
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  completed: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
  failed: {
    color: 'red',
  },
});

export default OrderComponent;
