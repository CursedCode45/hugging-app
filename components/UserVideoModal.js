import { StyleSheet, Text, View, Modal, TouchableHighlight, useAnimatedValue } from 'react-native';
import Animated from 'react-native-reanimated';
import * as React from 'react';
import { appColors } from '../constant/AppColors';
import * as FileSystem from "expo-file-system";
import { Vidplays } from '../components/Vidplays';
import * as MediaLibrary from 'expo-media-library';
import { Loading } from '../components/Loading';
import { hp, wp } from '../constant/Helpers';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';


export function UserVideoModal({ route }){
        // Navigation
        const {fileIndex, videoWidth, videoHeight, isOpen, fileUri} = route.params; 
        const navigation = useNavigation();

        const [isSaving, setIsSaving] = React.useState(false);
        const videoAspectRatio = videoWidth/videoHeight;


        // const fadeAnim = useAnimatedValue(0);
        // const scaleInButtonsAnim = useAnimatedValue(0);

        // // Video Size and Position animation values
        // const videoWidthAnim = useAnimatedValue(wp(33.333));
        // const videoHeightAnim = useAnimatedValue(wp(33.333));

        // const videoXAnim = useAnimatedValue(0);
        // const videoYAnim = useAnimatedValue(0);

        // function fadeIn(){
        //     Animated.timing(fadeAnim, {
        //         toValue: 1,
        //         duration: 200,
        //         useNativeDriver: true,
        //     }).start();
        // }

        // function scaleIn(){
        //     Animated.timing(scaleInButtonsAnim, {
        //         toValue: wp(90)/videoAspectRatio,
        //         duration: 200,
        //         useNativeDriver: false,
        //     }).start();
        // }

        // function videoScale(){
        //     const videoScaleAnimationDuration = 1500;

        //     Animated.timing(videoHeightAnim, {
        //         toValue: wp(90)/videoAspectRatio,
        //         duration: videoScaleAnimationDuration,
        //         useNativeDriver: false,
        //     }).start();

        //     Animated.timing(videoWidthAnim, {
        //         toValue: wp(90),
        //         duration: videoScaleAnimationDuration,
        //         useNativeDriver: false,
        //     }).start();
        // }

        // React.useEffect(() => {
        //     fadeIn();
        //     scaleIn();
        //     videoScale();
        //     console.log(fileIndex);
        // }, [])

  
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

        function DeleteButton(){
            return(
            <TouchableHighlight style={[styles.buttonTextContainer, styles.deleteTextContainer]} underlayColor={appColors.buttonPressedColor} onPress={onDeleteClick}>
                <Text style={[styles.text, styles.closeText]}>Delete</Text>
            </TouchableHighlight>
            );
        }

        function CloseButton(){
            return(
                <TouchableHighlight style={styles.closeTextContainer} underlayColor={appColors.buttonPressedColor} onPress={()=>{navigation.goBack();}}>
                    <Text style={[styles.text, styles.closeText]}>Close</Text>
                </TouchableHighlight> 
            );
        }

        function AllButtonsContainer({style = {}}){
            return (
                <View style={[styles.allButtonsContainer, style]}>
                    <CloseButton/>
                    <View style={[styles.buttonContainer, {marginTop: wp(90)/videoAspectRatio}]}>
                        <SavingButton/>
                        <DeleteButton/>
                    </View>
                </View>
            );
        }

        const sharedElements = () => [{ id: "image" }];
        return(
            <Modal color={appColors.background} animationType="none" transparent={false} visible={true} onRequestClose={()=>{}}>
                <View style={styles.modalContainer}>
                    <AllButtonsContainer/>
                    <View style={[styles.modalVideoContainer, {width: wp(90), height:  wp(90)/videoAspectRatio}]}>
                        <Vidplays source={fileUri}/>
                        <SharedElement id={`image`}>
                            <Vidplays source={fileUri}/>
                        </SharedElement>
                    </View>
                </View>
            </Modal>
        )
}

UserVideoModal.sharedElements = () => [{ id: "image" }];


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: appColors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },

    allButtonsContainer: {
        width: '100%',
        height: hp(100),
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalVideoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
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