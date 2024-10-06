import React, { useEffect } from 'react';
import {useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppNavigation from './src/navigation/AppNavigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/background/persist';
import { registerAppWithFCM  , handleNotificationListeners , requestUserPermission} from './src/notificationManager';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    registerAppWithFCM();
    requestUserPermission();
    handleNotificationListeners();
}, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> 
       <AppNavigation/>
     </PersistGate>
   </Provider>

  );
}

export default App;
