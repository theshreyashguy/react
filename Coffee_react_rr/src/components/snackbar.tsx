import React, { useEffect } from 'react';
import { View, Platform, Text } from 'react-native';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './snackbar.style';
import Animated, {
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
} from 'react-native-reanimated';
import { CustomTouchableOpacity } from './custom-touchable-opacity';

interface SnackbarProps {
  status?: 'success' | 'warning' | 'info' | 'error' | 'downloadsuccess' | 'downloadfailed';
  text: string;
  theme: any;
  containerStyle?: any;
  position?: 'bottom' | 'top';
  faildata: any;
}

const SnackBarcompoment = (props: SnackbarProps) => {
  const Styles = styles('success');
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setTimeout(() => {
    //  props.onCloseSnackBar();
    }, 3000);
  }, []);

  const containerStyle = [

      ( Styles.success),
  ];

  return (
    <ThemeProvider theme={props.theme}>
      <Animated.View
        entering={  SlideInUp}
        exiting={ SlideOutUp}
         style={containerStyle}
      >
        <Text
          style={{
            color:
               props.theme.PRIMARY_TEXT_COLOR,
          }}
        >
          { 'Okay got it!'}
        </Text>
      </Animated.View>
    </ThemeProvider>
  );
};




export default SnackBarcompoment;
