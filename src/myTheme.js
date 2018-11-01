// export const primary = '#7894a0'
// export const primaryDark = '#4b6672'
// export const primaryLight = '#a8c4d1'

export const primary = '#5fb7e0'
export const primaryDark = '#1f87ae'
export const primaryLight = '#95e9ff'

export const primaryText = '#fff'

// export const secondary = '#5fb7e0'
// export const secondaryDark = '#1f87ae'
// export const secondaryLight = '#95e9ff'

export const secondary = '#7894a0'
export const secondaryDark = '#4b6672'
export const secondaryLight = '#a8c4d1'

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
    },
    action: {
      selected: primary
    }
  }
}
