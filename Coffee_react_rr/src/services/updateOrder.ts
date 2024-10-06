import {Alert} from 'react-native';
import {order} from '../network/order';
import uuid from 'react-native-uuid';

export default async function updateOrder(payload: any,id : any) {
  try {
    const responce = await order.updateOrder(payload,id);
    if (!responce.status) {
      const paymentId = uuid.v4(); // Converts numeric timestamp to string
      const paymentPayload = {
        paymentId,
        orderId: payload.orderId,
        amount: payload.totalAmount,
        paymentDate: new Date().toISOString(),
        status: 'Pending', // Set initial status
      };
      
    } else {
      Alert.alert('Wrong Credentials', 'user already exist');
    }
  } catch (error) {
    console.log(error);
  }
}
