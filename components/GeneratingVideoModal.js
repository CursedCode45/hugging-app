import { View, StyleSheet, TouchableHighlight, Text, Modal, ActivityIndicator, Button } from 'react-native';
import * as React from 'react'
import { appColors } from '../constant/AppColors';
import { Vidplays } from './Vidplays.js';
import { wp, hp } from '../constant/Helpers.js';

import SaveVideoButton from './SaveVideoButton.js';
import CloseVideoButton from './CloseVideoButton.js'
import LoadingBarAndScreenSkeleton from './LoadingBarAndScreenSkeleton.js';
import GetProButton from './GetProButton.js';
import path from "path-browserify";


export default function GeneratingVideoModal({ showModal, gettingVideo, onModalClose, videoStream, videoAspectRatio}){

    if (!showModal){
        return null;
    }

    if(gettingVideo){
        return(
            <LoadingBarAndScreenSkeleton/>  
        )
    }
    
    return(
        <View style={styles.container}>
            <CloseVideoButton onPress={onModalClose}/>
            <View style={{width: wp(85), height: wp(85)/videoAspectRatio}}>
                <Vidplays source={videoStream}></Vidplays>
            </View>
            
            <View style={styles.saveButtonContainer}>
                <SaveVideoButton fileUri={videoStream}/>
            </View>
            <GetProButton filename={path.basename(videoStream)}/>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: appColors.background,
    },

    loadingContainer: {
        width: wp(100),
        height: hp(100),
        justifyContent: 'center',
        alignItems: 'center',
    },

    loading: {
        transform: [{ scale: 2 }]
    },

    saveButtonContainer: {
        marginTop: 10,
        width: '90%'
    },

})
