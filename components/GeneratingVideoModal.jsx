import { View, StyleSheet, TouchableHighlight, Text, Modal, ActivityIndicator, Button } from 'react-native';
import * as React from 'react'
import { appColors } from '../constant/AppColors.js';
import { Vidplays } from './Vidplays.jsx';
import { wp, hp } from '../constant/Helpers.js';

import SaveVideoButton from './SaveVideoButton.jsx';
import CloseVideoButton from './CloseVideoButton.jsx'
import LoadingBarAndScreenSkeleton from './LoadingBarAndScreenSkeleton.jsx';
import GetProButton from './GetProButton.jsx';
import path from "path-browserify";


export default function GeneratingVideoModal({ showModal, gettingVideo, onModalClose, videoStream, videoAspectRatio, isPremium}){
    const [showWatermark, setShowWatermark] = React.useState('false');

    React.useEffect(() =>{
        const showWatermarkInit = (isPremium === 'no')? 'true' : 'false'
        console.log(`Show Init: ${showWatermarkInit}`);
        setShowWatermark(showWatermarkInit);
    }, [])

    function RenderGetProOrSaveButton(){
        if (showWatermark === 'false'){
            return (
                <SaveVideoButton showWatermark={showWatermark} fileUri={videoStream}/>
            )
        }
        const videoName = path.basename(videoStream);
        return(
            <GetProButton filename={videoName} setShowWatermark={setShowWatermark}/>
        );
    }


    function WhatToRender(){
        if(gettingVideo){
            return(
                <LoadingBarAndScreenSkeleton/>
            )
        }
        
        return(
            <View style={styles.container}>
                <CloseVideoButton onPress={onModalClose}/>
                <View style={{width: wp(90), height: wp(90)/videoAspectRatio, maxWidth: 500, maxHeight: 500/videoAspectRatio}}>
                    <Vidplays source={videoStream} showWatermark={showWatermark}/>
                </View>

                <View style={styles.bottomButtonContainer}>
                    <RenderGetProOrSaveButton/>
                </View>
            </View>
        );
    }

    return(
        <Modal animated='slide' visible={showModal} onRequestClose={onModalClose}>
            <WhatToRender/>
        </Modal>
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

    bottomButtonContainer: {
        marginTop: 10,
        width: '90%'
    },
})
