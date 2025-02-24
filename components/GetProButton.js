import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import { appColors } from '../constant/AppColors'
import DIAMOND_SVG from '../assets/images/DiamondSvg'
import * as SecureStore from 'expo-secure-store';
import GetPro from './GetPro';



export default function GetProButton({filename, setShowWatermark=()=>{}}){
    const [showGetProScreen, setShowGetProScreen] = React.useState(false);

    async function onGetProPress(){
        setShowGetProScreen(true);
    }

    function onGetProModalClose(){
        setShowGetProScreen(false);
        console.log('Cancel Pressed')
    }

    function onCheckoutPress(){
        setShowGetProScreen(false);
        console.log('Checkout Pressed')
        if (setShowWatermark){
            setShowWatermark('false');
        }
    }

    React.useLayoutEffect(() => {
        async function readItem(){
            const key_rn = await SecureStore.getItemAsync(`show_watermark_${filename}`);
        }
        readItem();
    }, [])

    if(showGetProScreen){
        return(
            <GetPro onGetProModalClose={onGetProModalClose} onCheckoutPress={onCheckoutPress} filename={filename}/>
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
        borderRadius: 10,

        borderWidth: 0.2,
        borderColor: appColors.closeButtonTextColor,
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