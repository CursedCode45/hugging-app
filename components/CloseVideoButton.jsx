import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import { appColors } from '../constant/AppColors'
import BACK_SVG from '../assets/images/BackSvg'


export default function CloseVideoButton({onPress}) {
    return (
        <TouchableHighlight style={styles.rootContainer} underlayColor={appColors.tryAgainButtonPressedColor} onPress={onPress}>
            <View style={styles.iconTextContainer}>
                <View style={styles.iconContainer}>
                    <BACK_SVG color={appColors.generateButtonColor}/>
                </View>
                <Text style={styles.text}>Try again</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        justifyContent: 'center',
        alignItems: 'center',

        width: '90%',
        height: 60,
        marginTop: 10,
        borderRadius: 10,
        marginBottom: 10,

        backgroundColor: appColors.tryAgainButtonColor,
    },

    iconTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    iconContainer: {
        height: 23,
        width: 23,
        marginRight: 6,
    },

    text: {
        color: appColors.generateButtonColor,
        fontSize: 17,
        fontFamily: appColors.fontSemiBold,
        textAlign: 'center'
    },
})