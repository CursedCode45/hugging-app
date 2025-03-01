import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import DELETE_SVG from '../assets/images/DeleteSvg'
import React from 'react'
import { appColors } from '../constant/AppColors'


export default function DeleteVideoButton({onPress}) {
  return (
    <TouchableHighlight style={styles.rootContainer} underlayColor={appColors.deleteButtonPressedColor} onPress={onPress}>
        <View style={styles.iconTextContainer}>
            <View style={styles.iconContainer}>
                <DELETE_SVG color={appColors.deleteButtonTextColor}/>
            </View>
            <Text style={styles.text}>Delete</Text>
        </View>
        
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
    rootContainer: {
        justifyContent: 'center',
        alignItems: 'center',

        width: '100%',
        height: 50,
        borderRadius: 5,
        flex: 1,

        backgroundColor: appColors.deleteButtonColor,
    },

    iconTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    iconContainer: {
        height: '100%',
        width: '20%',
        marginRight: 6,
    },

    text: {
        color: appColors.deleteButtonTextColor,
        fontSize: 15,
        textAlign: 'center',
        fontFamily: appColors.fontSemiBold
    },
})