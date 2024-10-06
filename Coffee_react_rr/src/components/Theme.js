import { Text, TextInput } from 'react-native';

export const base = {
  FONT_SIZE_TINY: '8px',
  FONT_SIZE_DATE: '10px',
  FONT_SIZE_SMALL: '12px',
  FONT_SIZE_MEDIUM: '14px',
  FONT_SIZE_REGULAR: '16px',
  FONT_SIZE_LARGE: '18px',
  FONT_SIZE_EXTRA_LARGE: '24px',
  FONT_SIZE_MASSIVE: '34px',

  FONT_WEIGHT_LIGHT: '200',
  FONT_WEIGHT_MEDIUM: '500',
  FONT_WEIGHT_BOLD: '700',

  PRIMARY_FONT_FAMILY: 'HindMadurai-Regular',
  PRIMARY_FONT_FAMILY_MEDIUM: 'HindMadurai-Medium',
  PRIMARY_FONT_FAMILY_BOLD: 'HindMadurai-SemiBold',

  SECONDARY_FONT_FAMILY: 'Product-Sans-Regular',
  SECONDARY_FONT_FAMILY_ITALIC: 'Product-Sans-Italic',

  BRAND_COLOR: '#FF5E6D',
  BRAND_COLOR_LIGHT: '#FFEFF1',
};

export const darkTheme = {
  PRIMARY_BACKGROUND_COLOR: 'rgba(41,41,41,100)',
  // PRIMARY_BACKGROUND_COLOR_LIGHT: "rgba(41,41,41,0.9)",
  PRIMARY_BACKGROUND_COLOR_LIGHT: '#3e3e3e',

  SECONDARY_BACKGROUND_COLOR: '#ffffff',
  SECONDARY_BACKGROUND_COLOR_LIGHT: '#f7f7f7',

  PRIMARY_TEXT_COLOR: '#ffffff',
  PRIMARY_TEXT_COLOR_LIGHT: '#f7f7f7',
  SECONDARY_TEXT_COLOR: 'rgba(41,41,41,100)',
  PRIMARY_TEXT_BACKGROUND_COLOR: 'rgba(41,41,41,100)',
  SECONDARY_TEXT_BACKGROUND_COLOR: '#ffffff',

  SELECTED_ICON_COLOR: '#ffffff',
  DESELECTED_ICON_COLOR: '#A1A1A1',

  NEW_FONT_COLOR: '#FFFFFF',
  NEW_BACKGROUND_COLOR: '#2F2F2F',
  DIVIDER_BACKGROUND: '#1c1c1c',
};
export const lightTheme = {
  PRIMARY_BACKGROUND_COLOR: '#ffffff',
  PRIMARY_BACKGROUND_COLOR_LIGHT: '#f7f7f7',

  SECONDARY_BACKGROUND_COLOR: 'rgba(41,41,41,100)',
  SECONDARY_BACKGROUND_COLOR_LIGHT: '#797979',

  PRIMARY_TEXT_COLOR: 'rgba(41,41,41,100)',
  PRIMARY_TEXT_COLOR_LIGHT: '#a09999',
  SECONDARY_TEXT_COLOR: '#ffffff',
  PRIMARY_TEXT_BACKGROUND_COLOR: '#ffffff',
  SECONDARY_TEXT_BACKGROUND_COLOR: 'rgba(41,41,41,100)',

  SELECTED_ICON_COLOR: '#FF5E6D',
  DESELECTED_ICON_COLOR: '#A1A1A1',

  NEW_FONT_COLOR: '#595959',
  NEW_BACKGROUND_COLOR: '#FFFFFF',
  DIVIDER_BACKGROUND: '#f3f3f3',
};

export const colorOptions = {
  palette: {
    lightGrey: '#dee2e6',
    error: '#F83232',
    info: '#2196F3',
    success: '#6CC070',
    dark: 'rgba(41,41,41,100)',
    light: '#ffffff',
    warning: '#FF9800',
    transparent: 'transparent',

    blueff: '#0000ff',
    black04: 'rgba(0,0,0,0.4)',
    black00: '#000',
    black01: 'rgba(0, 0, 0, 0.1)',

    greyE0: '#E0E0E0',

    whiteff: '#ffffff',

    red05: '#e30505',

    yellow02: '#d9e002',

    green00: '#2ae600',
    green137: '#77A137',

    blue080: '#194080',
    blueffx: '#e0f1ff',
    blue8f2: '#99c8f2',
  },
  orange: {
    PRIMARY_COLOR_FAINT: '#FFF3E0',
    PRIMARY_COLOR_LIGHT: '#FFB74D',
    PRIMARY_COLOR: '#FF9800',
    PRIMARY_COLOR_BOLD: '#EF6C00',
    PRIMARY_FOREGROUND_COLOR: '#ffffff',
  },
  red: {
    PRIMARY_COLOR_FAINT: '#FFEBEE',
    PRIMARY_COLOR_LIGHT: '#E57373',
    PRIMARY_COLOR: '#F44336',
    PRIMARY_COLOR_BOLD: '#C62828',
    PRIMARY_FOREGROUND_COLOR: '#ffffff',
  },
  blue: {
    PRIMARY_COLOR_FAINT: '#E3F2FD',
    PRIMARY_COLOR_LIGHT: '#64B5F6',
    PRIMARY_COLOR: '#2196F3',
    PRIMARY_COLOR_BOLD: '#1565C0',
    PRIMARY_FOREGROUND_COLOR: '#ffffff',
  },
  cyan: {
    PRIMARY_COLOR_FAINT: '#E0F7FA',
    PRIMARY_COLOR_LIGHT: '#4DD0E1',
    PRIMARY_COLOR: '#00BCD4',
    PRIMARY_COLOR_BOLD: '#00838F',
    PRIMARY_FOREGROUND_COLOR: '#ffffff',
  },
  teal: {
    PRIMARY_COLOR_FAINT: '#E0F2F1',
    PRIMARY_COLOR_LIGHT: '#4DB6AC',
    PRIMARY_COLOR: '#009688',
    PRIMARY_COLOR_BOLD: '#00695C',
    PRIMARY_FOREGROUND_COLOR: '#ffffff',
  },
  gray: {
    PRIMARY_COLOR_FAINT: '#FAFAFA',
    PRIMARY_COLOR_LIGHT: '#E0E0E0',
    PRIMARY_COLOR: '#9E9E9E',
    PRIMARY_COLOR_BOLD: '#424242',
    PRIMARY_FOREGROUND_COLOR: '#ffffff',
  },
  purlple: {
    PRIMARY_COLOR_FAINT: '#EDE7F6',
    PRIMARY_COLOR_LIGHT: '#9575CD',
    PRIMARY_COLOR: '#673AB7',
    PRIMARY_COLOR_BOLD: '#4527A0',
    PRIMARY_FOREGROUND_COLOR: '#ffffff',
  },
  green: {
    PRIMARY_COLOR_FAINT: '#E8F5E9',
    PRIMARY_COLOR_LIGHT: '#81C784',
    PRIMARY_COLOR: '#4CAF50',
    PRIMARY_COLOR_BOLD: '#2E7D32',
    PRIMARY_FOREGROUND_COLOR: '#ffffff',
  },
};

export const initTheme = () => {
  Text['defaultProps'] = Text['defaultProps'] || {};
  Text['defaultProps'].allowFontScaling = false;
  TextInput['defaultProps'] = Text['defaultProps'] || {};
  TextInput['defaultProps'].allowFontScaling = false;
};
