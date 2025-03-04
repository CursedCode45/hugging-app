import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import { appColors } from '../constant/AppColors'
import DIAMOND_SVG from '../assets/images/DiamondSvg'
import GetPro from './GetPro';


export default function GetProButton({filename, setShowWatermark}){
    const [showGetProScreen, setShowGetProScreen] = React.useState(false);
    function onGetProPress(){
        setShowGetProScreen(true);
    }

    if(showGetProScreen){
        return(
            <GetPro setShowGetProScreen={setShowGetProScreen} setShowWatermark={setShowWatermark} filename={filename}/>
        )
    }
    return (
        <TouchableHighlight style={styles.rootContainer} underlayColor={appColors.closeButtonPressedColor} onPress={onGetProPress}>
            <View style={styles.iconTextContainer}>
                <View style={styles.iconContainer}>
                    <DIAMOND_SVG color={appColors.closeButtonTextColor}/>
                </View>
                <Text style={styles.text}>Remove Watermark</Text>
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

        backgroundColor: appColors.closeButtonColor,
        marginTop: 10,
    },

    iconTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    iconContainer: {
        height: '80%',
        width: '15%',
        marginRight: 6,
    },

    text: {
        color: appColors.closeButtonTextColor,
        fontSize: 12,
        fontFamily: appColors.fontSemiBold,
        textAlign: 'center'
    },
})