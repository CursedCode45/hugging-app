import { Platform } from 'react-native';


export const appColors = {
    background: '#0a0a0a',
    lighterDark: 'rgb(26, 25, 25)',
    weakDark: 'rgb(34, 34, 34)',
    bottomTab: 'rgba(30, 30, 30, 1)',
    mediumDark: '#676575',
    lightColor: '#88898a',
    veryLightColor: '#f2fbff',
    textColor: '#e6e9f5',

    buttonColor: '#4366e5',
    buttonPressColor: 'rgba(74, 113, 255, 1)',
    buttonPressedColor: 'rgba(32, 55, 139, 1)',

    closeButtonColor: '#0d2847', // 3
    closeButtonPressedColor: '#104d87', // 6
    closeButtonTextColor: '#70b8ff', // 11

    saveButtonColor: '#132d21', // 3
    saveButtonPressedColor: '#20573e', // 6
    saveButtonTextColor: '#3dd68c', // 11

    deleteButtonColor: '#3b1219', // 3
    deleteButtonPressedColor: '#72232d', // 6
    deleteButtonTextColor: '#ff9592', // 11

    orangeDarkColor: '#331e0b',
    orangeMediumColor: '#66350c',
    orangeLightColor: '#ffa057',

    addShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.95,
        shadowRadius: 20,
        elevation: 5,
    },

    addShadowLarge: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 5,
    },

    addGlow: {
        opacity: 0.8,
        shadowColor: '#f2fbff',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 15,
        shadowOpacity: 0.13,
    },

    fontSemiBold: Platform.select({android: 'Inter_600SemiBold', ios: 'Inter-SemiBold'}),
    fontExtraLight: Platform.select({android: 'Inter_200ExtraLight', ios: 'Inter-ExtraLight'}),
    fontThin: Platform.select({android: 'Inter_100Thin', ios: 'Inter-Thin'}),

}
