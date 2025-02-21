import { StyleSheet, Text, View, Modal, TouchableHighlight, Image } from 'react-native';
import * as React from 'react';
import { appColors } from '../constant/AppColors';
import * as FileSystem from "expo-file-system";
import { Vidplays } from '../components/Vidplays';
import { hp, wp } from '../constant/Helpers';
import SaveVideoButton from './SaveVideoButton';
import DeleteVideoButton from './DeleteVideoButton';
import CloseVideoButton from './CloseVideoButton';
import * as MediaLibrary from 'expo-media-library';
import * as SecureStore from 'expo-secure-store';




export function UserVideoModal({thumbnail, filename, videoWidth, videoHeight, isOpen, setIsOpen, fileUri, setFiles}){
        const videoAspectRatio = videoWidth/videoHeight;
        const [showWatermark, setShowWatermark] = React.useState('false');
  
        async function onDeleteClick(){
            await FileSystem.deleteAsync(fileUri);
            let allFiles = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
            const fileredFiles = allFiles.filter((elem) => elem.endsWith('.mp4'))
            setFiles(fileredFiles);
            setIsOpen(false);
        }

        React.useLayoutEffect(() => {
            async function isPaid(){
                try{
                    const key_filename = `${filename}_paid`;
                    let result = await SecureStore.getItemAsync(key_filename);
                    const valueWatermark = (result === 'true')? true : false
                    setShowWatermark(valueWatermark);
                    console.log(`Reading Item: ${result}`);
                    console.log(`Is watermark active: ${valueWatermark}`);
                }
                catch(e){
                    console.log(e);
                }
            }
            isPaid();
        }, [])

        return(
            <Modal color={appColors.background} animationType="none" transparent={false} visible={true} onRequestClose={()=>{}}>
                <View style={styles.modalContainer}>
                    <CloseVideoButton onPress={()=>{setIsOpen(false);}}/>

                    <View style={[styles.modalVideoContainer, {width: wp(90), height:  wp(90)/videoAspectRatio}]}>
                        <Vidplays source={fileUri} showWatermark={showWatermark}/>
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