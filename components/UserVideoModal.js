import { StyleSheet, Text, View, Image, Modal, TouchableHighlight } from 'react-native';
import * as React from 'react';
import { appColors } from '../constant/AppColors';
import * as FileSystem from "expo-file-system";
import { Vidplays } from '../components/Vidplays';
import * as MediaLibrary from 'expo-media-library';
import { Loading } from '../components/Loading';

export function UserVideoModal({isOpen, setIsOpen, fileUri, setFiles}){
        const [isSaving, setIsSaving] = React.useState(false);
        const [videoDimensions, setVideoDimensions] = React.useState({ width: 0, height: 0 });

        function handleLoad(metadata){
            setVideoDimensions({
                width: metadata.naturalSize.width,
                height: metadata.naturalSize.height,
            });
            console.log(`Video Width ${videoDimensions.width}`);
            console.log(`Video Height ${videoDimensions.height}`);
        };
  
        async function onDeleteClick(){
            await FileSystem.deleteAsync(fileUri);
            const allFiles = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
            setFiles(allFiles);
            setIsOpen(false);
        }
  
        function onSaveClick(){
            console.log('Saving...');
            setIsSaving(true);
            MediaLibrary.saveToLibraryAsync(fileUri);
            setTimeout(()=>{
                setIsSaving(false);
            }, 500)
        }
  
        function SavingButton(){
            if(isSaving){
                return(
                    <View style={styles.buttonTextContainer}>
                        <Loading color={appColors.buttonPressedColor}/>
                    </View>
                );
            }
  
            return(
                <TouchableHighlight style={[styles.buttonTextContainer, styles.galleryTextContainer]} underlayColor={appColors.buttonPressedColor} onPress={onSaveClick}>
                    <Text style={[styles.text, styles.closeText]}>Save to Gallery</Text>
                </TouchableHighlight>
            );
        }

        return(
            <Modal color={appColors.background} animationType="slide" transparent={false} visible={true} onRequestClose={()=>{}}>
                <View style={styles.modalContainer}>
                    <TouchableHighlight style={styles.closeTextContainer} underlayColor={appColors.buttonPressedColor} onPress={()=>{setIsOpen(false);}}>
                        <Text style={[styles.text, styles.closeText]}>Close</Text>
                    </TouchableHighlight>

                    <View style={styles.modalVideoContainer}>
                        <Vidplays source={fileUri} handleLoad={handleLoad}/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <SavingButton/>

                        <TouchableHighlight style={[styles.buttonTextContainer, styles.deleteTextContainer]} underlayColor={appColors.buttonPressedColor} onPress={onDeleteClick}>
                            <Text style={[styles.text, styles.closeText]}>Delete</Text>
                        </TouchableHighlight>
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
        width: '90%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColors.lighterDark,
        
    },

    thumbnail: {
        flex: 1,
        width: 100,
        height: 100,
    },

    videoContainer: {
        width: '100%',
        height: 92,
    },

    thumbnailContainer:{
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
        backgroundColor: appColors.buttonColor,
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

    closeText: {
        fontSize: 25,
    },

    closeTextContainer: {
        backgroundColor: appColors.buttonColor,
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 10,
    },

    buttonTextContainer: {
        backgroundColor: appColors.buttonColor,
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10,

    },

    galleryTextContainer:{
        marginRight: 5,
    },

    deleteTextContainer:{
        marginLeft: 5,
    },

    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

