import React, { ForwardedRef, forwardRef, useRef } from 'react';
import { GestureResponderEvent, TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface CustomTouchableOpacityProps extends TouchableOpacityProps {
  label?: string;
  debounceDelay?: number;
  style?: any;
}

export const CustomTouchableOpacity = forwardRef(
  (props: CustomTouchableOpacityProps, ref: ForwardedRef<TouchableOpacity>) => {
    const { onPress, debounceDelay = 500, activeOpacity = 0.7, ...rest } = props;

    const previousPressedTimestamp = useRef(0);

    const onPressDebounce = (event: GestureResponderEvent) => {
      const buttonPressedTimestamp = Date.now();
      if (buttonPressedTimestamp > previousPressedTimestamp.current + debounceDelay) {
        onPress?.(event);
      }
      previousPressedTimestamp.current = buttonPressedTimestamp;
    };

    return (
      <TouchableOpacity
        ref={ref}
        activeOpacity={activeOpacity}
        onPress={onPress && onPressDebounce}
        {...rest}
      />
    );
  }
);
