import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import DOWNLOAD_SVG from '../assets/images/DownloadSvg'
import React from 'react'
import { appColors } from '../constant/AppColors'
import { Loading } from '../components/Loading';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from "expo-file-system";


export default function SaveVideoButton({showWatermark, fileUri}) {
    const [isSaving, setIsSaving] = React.useState(false);
    
    async function onPress(){
        try{
            setIsSaving(true);
            const videoExists = (await FileSystem.getInfoAsync(fileUri));
            MediaLibrary.saveToLibraryAsync(videoExists.uri);
            setTimeout(()=>{
                setIsSaving(false);
            }, 600)
        }
        catch(e){
            console.log(e);
        }
    }

    if (isSaving){
        return(
        <View style={styles.rootContainer}>
            <View style={styles.loadingContainer}>
                <Loading color={appColors.saveButtonTextColor}/>
            </View>
        </View>
        )
    }

    return (
    <TouchableHighlight style={styles.rootContainer} underlayColor={appColors.saveButtonPressedColor} onPress={onPress}>
        <View style={styles.iconTextContainer}>
            <View style={styles.iconContainer}>
                <DOWNLOAD_SVG color={appColors.saveButtonTextColor}/>
            </View>
            <Text style={styles.text}>Save to Gallery</Text>
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
        borderColor: appColors.saveButtonTextColor,
        backgroundColor: appColors.saveButtonColor,
    },

    loadingContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{scale: 0.7}]
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
        color: appColors.saveButtonTextColor,
        fontSize: 15,
        fontFamily: appColors.fontSemiBold,
        textAlign: 'center'
    },
})