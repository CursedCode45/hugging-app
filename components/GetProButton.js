import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import { appColors } from '../constant/AppColors'
import DIAMOND_SVG from '../assets/images/DiamondSvg'
import * as SecureStore from 'expo-secure-store';
import GetPro from './GetPro';



export default function GetProButton({filename}){
    const [showGetProScreen, setShowGetProScreen] = React.useState(false);

    async function onGetProPress(){
        try{
            await SecureStore.setItemAsync(`show_watermark_${filename}`, 'false');
            console.log('Press Get Pro Button')
            setShowGetProScreen(true);
        }
        catch(e){
            console.log(`Get Pro Button Error: ${e}`)
        }
    }
    console.log('loaded')
    React.useLayoutEffect(() => {
        async function readItem(){
            const key_rn = await SecureStore.getItemAsync(`show_watermark_${filename}`);
            console.log(key_rn);
        }
        readItem();
    }, [])

    function onModalClose(){
        setShowGetProScreen(false)
    }

    if(showGetProScreen){
        return(
            <GetPro onModalClose={onModalClose}/>
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
        width: '90%',
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
        fontSize: 15,
        fontFamily: appColors.fontSemiBold,
        textAlign: 'center'
    },
})