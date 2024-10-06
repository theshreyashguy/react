import {Alert} from 'react-native';
import {order} from '../network/order';
// import {payment} from '../Payment/payment';

export default async function createPayment(payload: any) {
  try {
    const responce = await order.createPayment(payload);
    console.log('create paymet method recieved payload: ',payload);
    if (!responce.status) {
     // payment('500', user.email, user.phone, user.username);
      return responce;
    } else {
      Alert.alert('Wrong Credentials', 'Payment Service Error');
    }
  } catch (error) {
    console.log(error);
  }
}
