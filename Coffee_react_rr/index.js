/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';



PushNotification.configure({
  // Called when a remote or local notification is opened or received
  onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);

      // Process the notification if necessary
      if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
  },
  // Required for iOS permissions
  requestPermissions: Platform.OS === 'ios',
});

// Create a channel for Android
PushNotification.createChannel(
  {
      channelId: "coffee-app-channel", // (required) Unique ID for channel
      channelName: "Coffee App Channel", // (required) Name of the channel
      channelDescription: "A channel to categorize your notifications", // Description of the channel
      soundName: "default", // Sound to play when a notification is displayed
      importance: 4, // Android importance level: max, high, default, low, min
      vibrate: true, // Enable vibration for notifications
  },
  (created) => console.log(`createChannel returned '${created}'`) // Callback to check if the channel was created
);

// Register background handler for Firebase Messaging
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
  showLocalNotification(remoteMessage.notification);
});

// Helper function to show local notification
const showLocalNotification = (notification) => {
  PushNotification.localNotification({
      channelId: "coffee-app-channel", // Ensure you use the same channelId
      title: notification.title,
      message: notification.body,
      priority: 'high',
      importance: 'high',
      ongoing: true, // Make notification persistent
  });
};

AppRegistry.registerComponent(appName, () => App);



