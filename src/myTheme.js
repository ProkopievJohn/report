// import {
//   cyan700, grey700, darkBlack, white, grey300, fullBlack
// } from 'material-ui/styles/colors'
// import { fade } from 'material-ui/utils/colorManipulator'

export const primary = '#7894a0'
export const primaryDark = '#4b6672'
export const primaryLight = '#a8c4d1'
export const primaryText = '#fff'

export const secondary = '#5fb7e0'
export const secondaryDark = '#1f87ae'
export const secondaryLight = '#95e9ff'
export const secondaryText = '#fff'

export default {
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary: {
      main: primary,
      dark: primaryDark,
      light: primaryLight,
      contrastText: primaryText
    },
    secondary: {
      main: secondary,
      dark: secondaryDark,
      light: secondaryLight,
      contrastText: secondaryText
    }
    // textColor: darkBlack,
    // alternateTextColor: white,
    // canvasColor: white,
    // borderColor: grey300,
    // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: primary,
    // clockCircleColor: fade(darkBlack, 0.07),
    // shadowColor: fullBlack
  }
}
