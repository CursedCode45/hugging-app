import { StyleSheet, Text, View, Image, Modal } from 'react-native';
import * as React from 'react';
import { appColors } from '../constant/AppColors';
import * as FileSystem from "expo-file-system";
import { Vidplays } from '../components/Vidplays';


export function VideoItem(props){
    const [date_right_now, fileName] = props.filename.split('_')
    const fileUri = FileSystem.documentDirectory + props.filename;

    return(
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                <Vidplays source={fileUri}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.text, styles.text1]}>{fileName}</Text>
                <Text style={[styles.text, styles.text2]}>{date_right_now}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        height: 130,

    },

    videoContainer: {
        width: '100%',
        height: 92,
    },

    textContainer: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 60,
        bottom: 13,
        zIndex: -1,
        marginBottom: 6,
        backgroundColor: appColors.lighterDark,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    text: {
        color: appColors.textColor,
    },
    text1: {
        fontSize: 14,
    },

    text2:{
        fontSize: 8,
    },
});