import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native'
import * as React from 'react'
import { appColors } from '../constant/AppColors'
import { wp } from '../constant/Helpers';
import LoadingSkeletonView from './LoadingSkeletonView.jsx';
import { useAppContext } from '../AppContext.js';


export default function GenerateVideoButton({image1, image2, onPress}) {
    const [buttonStyle, setButtonStyle] = React.useState(styles.buttonContainerUnclickable);
    const [buttonPressColor, setButtonPressColor] = React.useState(appColors.lighterDark);
    const [textColor, setTextColor] = React.useState(appColors.lightColor);
    const { usesLeft, setUsesLeft, isPremium, setIsPremium } = useAppContext();

    React.useEffect(() => {
        if (image1 !== null && image2 !== null){
            setButtonStyle(styles.buttonContainerClickable);
            setButtonPressColor(appColors.generateButtonPressedColor);
            setTextColor(appColors.veryLightColor);
        }
        else{
            setButtonStyle(styles.buttonContainerUnclickable);
            setButtonPressColor(appColors.lighterDark);
            setTextColor(appColors.lightColor);
        }
    }, [image1, image2])

    if (usesLeft === null){
        console.log('it is null');
        return(
            <View style={[styles.rootContainer]}>
                <View style={styles.buttonContainer}>
                <LoadingSkeletonView color1={appColors.lighterDark} color2={appColors.weakLight}/>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.rootContainer}>
            <TouchableHighlight style={[styles.buttonContainer, buttonStyle]} underlayColor={buttonPressColor} onPress={onPress}>
                <View style={styles.iconTextContainer}>
                    <Text style={[styles.text, {color: textColor}]}>Create</Text>
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

        width: '96%',
        maxWidth: 500,
        height: 60,
        marginTop: 30,
        borderRadius: 10,
        marginBottom: 10,
    },

    buttonContainerClickable: {
        backgroundColor: appColors.generateButtonColor,
    },


    buttonContainerUnclickable: {
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
        fontSize: 17,
        fontFamily: appColors.fontSemiBold,
        textAlign: 'center',

        color: appColors.lightColor,
    },
})