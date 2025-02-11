import { StyleSheet, Text, View, Modal, TouchableHighlight } from 'react-native';
import * as React from 'react';
import { appColors } from '../constant/AppColors';
import * as FileSystem from "expo-file-system";
import { Vidplays } from '../components/Vidplays';
import { hp, wp } from '../constant/Helpers';
import SaveVideoButton from './SaveVideoButton';
import DeleteVideoButton from './DeleteVideoButton';
import CloseVideoButton from './CloseVideoButton';


export function UserVideoModal({fileIndex, videoWidth, videoHeight, isOpen, setIsOpen, fileUri, setFiles}){
        const videoAspectRatio = videoWidth/videoHeight;
  
        async function onDeleteClick(){
            await FileSystem.deleteAsync(fileUri);
            const allFiles = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
            setFiles(allFiles);
            setIsOpen(false);
        }

        return(
            <Modal color={appColors.background} animationType="none" transparent={false} visible={true} onRequestClose={()=>{}}>
                <View style={styles.modalContainer}>
                    <CloseVideoButton onPress={()=>{setIsOpen(false);}}/>

                    <View style={[styles.modalVideoContainer, {width: wp(90), height:  wp(90)/videoAspectRatio}]}>
                        <Vidplays source={fileUri}/>
                    </View>
                    
                    <View style={[styles.buttonContainer]}>
                        <SaveVideoButton fileUri={fileUri}/>
                        <DeleteVideoButton onPress={onDeleteClick}/>
                    </View>
                </View>
            </Modal>
        )
}



const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: appColors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalVideoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});