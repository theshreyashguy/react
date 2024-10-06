import { StyleSheet } from 'react-native';
import { colorOptions, lightTheme } from './Theme';

export const styles = (theme) =>
  StyleSheet.create({
    snackBar: {
      fontSize: 14,
      textAlign: 'center',
      color: lightTheme.SECONDARY_TEXT_COLOR,
      display: 'flex',
      alignSelf: 'center',
      flex: 1,
      flexDirection: 'row',
      zIndex: 10,
      width: '85%',
      justifyContent: 'space-between',
      position: 'absolute',
      padding: 8,
      paddingHorizontal: 16,
      borderRadius: 10,
    },

    success: {
      backgroundColor: colorOptions.palette.success,
    },
    warning: {
      backgroundColor: colorOptions.palette.warning,
    },
    error: {
      backgroundColor: colorOptions.palette.error,
    },
    info: {
      backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
      shadowColor: colorOptions.palette.black00,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius: 8,
      color: colorOptions.palette.black01,
    },
  });
