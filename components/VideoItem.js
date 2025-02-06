import { StyleSheet, Text, View, Image, Modal, TouchableHighlight } from 'react-native';
import * as React from 'react';
import { appColors } from '../constant/AppColors';
import * as FileSystem from "expo-file-system";
import { Vidplays } from '../components/Vidplays';
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as MediaLibrary from 'expo-media-library';


export function VideoItem(props){
    const [thumbnail, setThumbnail] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [date_right_now, fileName] = props.filename.split('_')
    const fileUri = FileSystem.documentDirectory + props.filename;

    async function generateThumbnail(){
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(fileUri, {time: 0});
            setThumbnail(uri);
        }
        catch (e) {
            console.warn(e);
        }
    };

    React.useEffect(() => {
        generateThumbnail();
        console.log(thumbnail);
    }, [])

    function onVideoItemClick(){
        setIsOpen(true);
    }

    async function onDeleteClick(){
        await FileSystem.deleteAsync(fileUri);
        const allFiles = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
        props.setFiles(allFiles);
        setIsOpen(false);
    }

    async function onSaveClick(){
        await MediaLibrary.saveToLibraryAsync(fileUri);
    }

    function VideoModal(){
        return(
            <Modal color={appColors.background} animationType="slide" transparent={false} visible={isOpen} onRequestClose={()=>{}}>
                <View style={styles.modalContainer}>

                    <TouchableHighlight style={styles.closeTextContainer} underlayColor={appColors.buttonPressedColor} onPress={()=>{setIsOpen(false);}}>
                        <Text style={[styles.text, styles.closeText]}>Close</Text>
                    </TouchableHighlight>

                    <View style={styles.modalVideoContainer}>
                        <Vidplays source={fileUri}/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableHighlight style={[styles.buttonTextContainer, styles.galleryTextContainer]} underlayColor={appColors.buttonPressedColor} onPress={onSaveClick}>
                            <Text style={[styles.text, styles.closeText]}>Save to Gallery</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={[styles.buttonTextContainer, styles.deleteTextContainer]} underlayColor={appColors.buttonPressedColor} onPress={onDeleteClick}>
                            <Text style={[styles.text, styles.closeText]}>Delete</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        )
    }

    if (isOpen){
        return(
            <VideoModal/>
        );
    }

    else{
        return(
            <TouchableHighlight underlayColor={appColors.buttonPressedColor} onPress={onVideoItemClick}>
                <View>
                    <View style={styles.thumbnailContainer}>
                        <Image source={{ uri: thumbnail }} style={styles.thumbnail}/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={[styles.text, styles.text1]}>{fileName}</Text>
                        <Text style={[styles.text, styles.text2]}>{date_right_now}</Text>
                    </View>
                    {(isOpen)? <VideoModal/> : null}
                </View>
            </TouchableHighlight>
        )
    }
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