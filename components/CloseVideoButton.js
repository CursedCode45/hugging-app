import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import { appColors } from '../constant/AppColors'
import BACK_SVG from '../assets/images/BackSvg'


export default function CloseVideoButton({onPress}) {
    return (
        <TouchableHighlight style={styles.rootContainer} underlayColor={appColors.closeButtonPressedColor} onPress={onPress}>
            <View style={styles.iconTextContainer}>
                <View style={styles.iconContainer}>
                    <BACK_SVG color={appColors.closeButtonTextColor}/>
                </View>
                <Text style={styles.text}>Go Back</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        justifyContent: 'center',
        alignItems: 'center',

        width: '90%',
        height: 50,
        marginTop: 10,
        borderRadius: 10,
        marginBottom: 10,

        borderWidth: 0.2,
        borderColor: appColors.closeButtonTextColor,
        backgroundColor: appColors.closeButtonColor,
    },

    iconTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    iconContainer: {
        height: 25,
        width: 25,
        marginRight: 6,
    },

    text: {
        color: appColors.closeButtonTextColor,
        fontSize: 18,
        fontFamily: appColors.fontSemiBold,
        textAlign: 'center'
    },
})