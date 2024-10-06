// notificationHandler.js
import PushNotification from 'react-native-push-notification';
import { store } from './background/persist';
import { setUser } from './store/cartReducer'; // Adjust the path as needed

export const showLocalNotification = (notification) => {
   // console.log(notification.body);
    //const payload = JSON.parse(notification.body).user;
    // i want to send payload from here 
    // console.log(payload , 'payladddd')
   
    PushNotification.localNotification({
        channelId: "coffee-app-channel",
        title: notification.title,
        message: notification.body,
        priority: 'high',
        importance: 'high',
        vibrate: true,
    });
};
