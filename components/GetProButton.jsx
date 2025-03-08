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
        <TouchableHighlight style={styles.rootContainer} underlayColor={appColors.generateButtonPressedColor} onPress={onGetProPress}>
            <View style={styles.iconTextContainer}>
                <Text style={styles.text}>Save without watermark</Text>
            </View>
        </TouchableHighlight>
    )
}


const styles = StyleSheet.create({
    rootContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 60,
        borderRadius: 10,

        backgroundColor: appColors.generateButtonColor,
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
        color: appColors.veryLightColor,
        fontSize: 18,
        fontFamily: appColors.fontSemiBold,
        textAlign: 'center'
    },
})