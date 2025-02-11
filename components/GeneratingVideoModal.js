import { View, StyleSheet, TouchableHighlight, Text, Modal, ActivityIndicator } from 'react-native';
import * as React from 'react'
import { appColors } from '../constant/AppColors';
import { Vidplays } from './Vidplays.js';
import { wp, hp } from '../constant/Helpers.js';

import SaveVideoButton from './SaveVideoButton.js';
import CloseVideoButton from './CloseVideoButton.js'


export default function GeneratingVideoModal({gettingVideo, onModalClose, videoStream, videoAspectRatio}){

    if (gettingVideo) {
        return(
            <Modal
            color={appColors.background}
            animationType="slide"
            transparent={false}
            visible={true}
            onRequestClose={onModalClose}
            >

                <View style={styles.container}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size={'large'} style={styles.loading} color={appColors.closeButtonTextColor}/>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <Modal
            color={appColors.background}
            animationType="slide"
            transparent={false} visible={true}
            onRequestClose={onModalClose}>

            <View style={styles.container}>
                <CloseVideoButton onPress={onModalClose}/>

                <View style={[styles.videoModalContainer, {width: wp(85), height: wp(85)/videoAspectRatio}]}>
                    <Vidplays source={videoStream}></Vidplays>
                </View>

                <View style={styles.saveButtonContainer}>
                    <SaveVideoButton fileUri={videoStream}/>
                </View>
            </View>
        </Modal>
    )
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
        width: '90%'
    },

})
