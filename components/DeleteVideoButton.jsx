import { StyleSheet, Text, View, TouchableHighlight, Button } from 'react-native'
import DELETE_SVG from '../assets/images/DeleteSvg'
import React from 'react'
import { appColors } from '../constant/AppColors'


export default function DeleteVideoButton({onPress}) {
  return (
    <View style={styles.rootContainer}>
        <Button color={appColors.deleteButtonTextColor} title='Delete this video' style={styles.text} onPress={onPress}/>
    </View>
  )
}

const styles = StyleSheet.create({
    rootContainer: {
        justifyContent: 'center',
        alignItems: 'center',

        width: '100%',
        height: 60,
        borderRadius: 5,
        flex: 1,

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