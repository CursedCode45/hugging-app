import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import * as React from 'react'
import { appColors } from '../constant/AppColors'
import { wp } from '../constant/Helpers';


export default function GenerateVideoButton({image1, image2, onPress}) {
    const [buttonStyle, setButtonStyle] = React.useState(styles.buttonContainerUnclickable);
    const [buttonPressColor, setButtonPressColor] = React.useState(appColors.lighterDark);
    const [textColor, setTextColor] = React.useState(appColors.lightColor);

    React.useEffect(() => {
        if (image1 !== null && image2 !== null){
            setButtonStyle(styles.buttonContainerClickable);
            setButtonPressColor(appColors.closeButtonPressedColor);
            setTextColor(appColors.closeButtonTextColor);
        }
        else{
            setButtonStyle(styles.buttonContainerUnclickable);
            setButtonPressColor(appColors.lighterDark);
            setTextColor(appColors.lightColor);
        }
    }, [image1, image2])

    return (
        <View style={styles.rootContainer}>
            <TouchableHighlight style={[styles.buttonContainer, buttonStyle]} underlayColor={buttonPressColor} onPress={onPress}>
                <View style={styles.iconTextContainer}>
                    <Text style={[styles.text, {color: textColor}]}>Generate</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(100),
    },

    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',

        width: '85%',
        height: 50,
        marginTop: 10,
        borderRadius: 10,
        marginBottom: 10,
    },

    buttonContainerClickable: {
        borderWidth: 0.2,
        borderColor: appColors.closeButtonTextColor,
        backgroundColor: appColors.closeButtonColor,
    },


    buttonContainerUnclickable: {
        borderWidth: 0.2,
        borderColor: appColors.lightColor,
        backgroundColor: appColors.lighterDark,
    },

    iconTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '85%',
    },

    text: {
        fontSize: 18,
        fontFamily: appColors.fontSemiBold,
        textAlign: 'center',

        color: appColors.lightColor,
    },
})