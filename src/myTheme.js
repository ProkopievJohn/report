import {
  cyan700, grey700, darkBlack, white, grey300, fullBlack, transparent
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

export const primary = cyan700
// '#0097a7'
export const primaryDark = '#006978'
export const primaryLight = '#56c8d8'
export const secondary = grey700
// '#616161'
export const secondaryDark = '#373737'
export const secondaryLight = '#8e8e8e'

export default {
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: primary,
    primary2Color: primaryDark,
    primary3Color: primaryLight,
    accent1Color: secondary,
    accent2Color: secondaryDark,
    accent3Color: secondaryLight,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: primary,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  },
  appBar: {
    color: transparent
  }
}
