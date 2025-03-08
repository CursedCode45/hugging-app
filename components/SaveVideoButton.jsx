import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native'
import DOWNLOAD_SVG from '../assets/images/DownloadSvg'
import React from 'react'
import { appColors } from '../constant/AppColors'
import { Loading } from './Loading';
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
            Alert.alert('Video saved to gallery');
        }
        catch(e){
            Alert.alert("Video couldn't be saved to gallery");
            console.log(e);
        }
    }

    if (isSaving){
        return(
        <View style={styles.rootContainer}>
            <View style={styles.loadingContainer}>
                <Loading color={appColors.veryLightColor}/>
            </View>
        </View>
        )
    }

    return (
    <TouchableHighlight style={styles.rootContainer} underlayColor={appColors.generateButtonPressedColor} onPress={onPress}>
        <View style={styles.iconTextContainer}>
            <View style={styles.iconContainer}>
                <DOWNLOAD_SVG color={appColors.veryLightColor}/>
            </View>
            <Text style={styles.text}>Save to gallery</Text>
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
        height: '70%',
        width: '10%',
        marginRight: 6,
    },

    text: {
        color: appColors.veryLightColor,
        fontSize: 17,
        fontFamily: appColors.fontSemiBold,
        textAlign: 'center'
    },
})