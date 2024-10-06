// notificationManager.js
import messaging from '@react-native-firebase/messaging';
import { showLocalNotification } from './notificationHandler'; // Ensure this path is correct

export const registerAppWithFCM = async () => {
    await messaging().registerDeviceForRemoteMessages();
};

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
};

export const handleNotificationListeners = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Notification caused app to open from background state:', remoteMessage.notification);
    });

    messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', remoteMessage);
        showLocalNotification(remoteMessage.notification);
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
        showLocalNotification(remoteMessage.notification);
    });
};
