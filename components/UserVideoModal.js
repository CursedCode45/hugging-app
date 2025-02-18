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
        console.log(fileUri);
  
        async function onDeleteClick(){
            await FileSystem.deleteAsync(fileUri);
            let allFiles = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
            const fileredFiles = allFiles.filter((elem) => elem.endsWith('.mp4'))
            setFiles(fileredFiles);
            setIsOpen(false);
        }

        return(
            <Modal color={appColors.background} animationType="none" transparent={false} visible={true} onRequestClose={()=>{}}>
                <View style={styles.modalContainer}>
                    <CloseVideoButton onPress={()=>{setIsOpen(false);}}/>

                    <View style={[styles.modalVideoContainer, {width: wp(90), height:  wp(90)/videoAspectRatio}]}>
                        <Vidplays source={fileUri}/>
                    </View>
                    
                    <View style={[styles.buttonRootContainer]}>
                        <View style={[styles.buttonContainer]}><SaveVideoButton fileUri={fileUri}/></View>
                        <View style={[styles.buttonContainer]}><DeleteVideoButton onPress={onDeleteClick}/></View>
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

    buttonRootContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: wp(90),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonContainer:{
        display: 'flex',
        marginTop: 10,
        width: '48%',
    }
});