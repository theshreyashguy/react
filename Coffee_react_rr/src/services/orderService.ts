import {Alert} from 'react-native';
import {order} from '../network/order';
// import createPayment from './paymentService';
// import uuid from 'react-native-uuid';
// import updateOrder from './updateOrder';

export default async function createOrder(payload: any) {
  try {
    const responce = await order.createOrder(payload);
    if (!responce.status) {

      //const paymentId = uuid.v4(); // Converts numeric timestamp to string
      // const paymentPayload = {
      //   paymentId,
      //   orderId: payload.orderId,
      //   amount: payload.totalAmount,
      //   paymentDate: new Date().toISOString(),
      //   status: 'Pending', // Set initial status
      // };
      // const payment = createPayment(paymentPayload);
      // console.log('payment responce',payment);
      // // payment.then((value)=>{
      // //   updateOrder(payload);
      // // })
      Alert.alert('Order Created', 'Complete order');
    } else {
      Alert.alert('Wrong Credentials', 'Order Service error');
    }
  } catch (error) {
    console.log(error);
  }
}
