import { StyleSheet, Text, View, Modal, Alert, Pressable } from 'react-native';
import * as React from 'react';
import { appColors } from '../constant/AppColors';
import * as FileSystem from "expo-file-system";
import { Vidplays } from './Vidplays';
import { hp, wp } from '../constant/Helpers';
import SaveVideoButton from './SaveVideoButton';
import DeleteVideoButton from './DeleteVideoButton';
import CloseVideoButton from './CloseVideoButton';
import GetProButton from './GetProButton';
import * as SecureStore from 'expo-secure-store';
import { getAllVideoBasenames } from '../constant/Helpers';
import path from "path-browserify";
import { deleteVideo } from '../constant/Helpers';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';


export function UserVideoModal({thumbnail, filename, videoWidth, videoHeight, isOpen, setIsOpen, fileUri, setFiles}){
        const videoAspectRatio = videoWidth/videoHeight;
        const [showWatermark, setShowWatermark] = React.useState('true');
        const bottomSheetRef = React.useRef(null);
        const snapPoints = React.useMemo(() => ['60%'], []);


        const renderBackdrop = React.useCallback((props) => <BottomSheetBackdrop opacity={0.85} appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
        React.useEffect(()=>{bottomSheetRef.current?.present();}, [])
        const handleSheetChanges = React.useCallback((index) => {
            if (index === -1){
                setIsOpen(false);
                console.log('handleSheetChanges', index);
            }
        }, []);

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

        function deleteAlert(){
            Alert.alert('Are you sure?', 'This action will permanently delete the video', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: onDeleteClick
                },
            ]);
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
        console.log('show');
        
        return(
            <BottomSheetModal
                ref={bottomSheetRef}
                index={0}
                enableDynamicSizing={false}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onChange={handleSheetChanges}
                backdropComponent={renderBackdrop}
                backgroundStyle={{backgroundColor: appColors.lighterDark}}
                handleIndicatorStyle={{backgroundColor: appColors.veryLightColor}}
            >
                <View style={styles.modalContainer}>
                    <View style={[styles.modalVideoContainer, {width: wp(90), height:  wp(90)/videoAspectRatio, maxWidth: 500, maxHeight: 500/videoAspectRatio}]}>
                        <Vidplays source={fileUri} showWatermark={showWatermark}/>
                    </View>
                    
                    <RenderGetProOrSaveButton/>
                    <View style={[styles.buttonRootContainer]}>
                        <DeleteVideoButton onPress={deleteAlert}/>
                    </View>
                </View>
            </BottomSheetModal>
        )
}



const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: appColors.lighterDark,
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