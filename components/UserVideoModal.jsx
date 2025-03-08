import { StyleSheet, Text, View, Modal } from 'react-native';
import * as React from 'react';
import { appColors } from '../constant/AppColors';
import * as FileSystem from "expo-file-system";
import { Vidplays } from './Vidplays';
import { wp } from '../constant/Helpers';
import SaveVideoButton from './SaveVideoButton';
import DeleteVideoButton from './DeleteVideoButton';
import CloseVideoButton from './CloseVideoButton';
import GetProButton from './GetProButton';
import * as SecureStore from 'expo-secure-store';
import { getAllVideoBasenames } from '../constant/Helpers';
import path from "path-browserify";
import { deleteVideo } from '../constant/Helpers';

export function UserVideoModal({thumbnail, filename, videoWidth, videoHeight, isOpen, setIsOpen, fileUri, setFiles}){
        const videoAspectRatio = videoWidth/videoHeight;
        const [showWatermark, setShowWatermark] = React.useState('true');

        async function loadWatermarkKey(){
            try{
                const read_key = await SecureStore.getItemAsync(`show_watermark_${filename}`);
                setShowWatermark(read_key);
            }
            catch(e){
                console.log(e);
            }
        }
  
        async function onDeleteClick(){
            await deleteVideo(filename);
            const allVideosBasenames = await getAllVideoBasenames();
            setFiles(allVideosBasenames);
            setIsOpen(false);
        }

        function RenderGetProOrSaveButton(){
            if (showWatermark === 'false'){
                return (
                    <View style={[styles.buttonContainer]}>
                        <SaveVideoButton fileUri={fileUri}/>
                    </View>
                )
            }
            return(
                <View style={{display: 'flex', width: '90%'}}>
                    <GetProButton filename={filename} setShowWatermark={setShowWatermark}/>
                </View>
            );
        }
        React.useLayoutEffect(() => {
            loadWatermarkKey();
        }, [])

        return(
            <Modal color={appColors.background} animationType="slide" transparent={false} visible={true} onRequestClose={()=>{}}>
                <View style={styles.modalContainer}>
                    <CloseVideoButton onPress={()=>{setIsOpen(false);}}/>

                    <View style={[styles.modalVideoContainer, {width: wp(90), height:  wp(90)/videoAspectRatio}]}>
                        <Vidplays source={fileUri} showWatermark={showWatermark}/>
                    </View>
                    
                    <RenderGetProOrSaveButton/>
                    <View style={[styles.buttonRootContainer]}>
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
        width: '90%',
    }
});