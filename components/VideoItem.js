import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import * as React from 'react';
import { appColors } from '../constant/AppColors';
import * as FileSystem from "expo-file-system";
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Loading } from '../components/Loading';
import { UserVideoModal } from './UserVideoModal';
import { wp, hp } from '../constant/Helpers';


export function VideoItem(props){
    const [thumbnail, setThumbnail] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [date_right_now, fileName] = props.filename.split('_')
    const fileUri = FileSystem.documentDirectory + props.filename;

    async function getThumbnail(){
        const thumbnailUri = FileSystem.cacheDirectory + props.filename.replace('.mp4', '.jpg')
        const thumbnailExists = (await FileSystem.getInfoAsync(thumbnailUri)).exists;
        if (thumbnailExists){
            setThumbnail(thumbnailUri);
            return;
        }

        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(fileUri, {time: 0});
            setThumbnail(uri);
            await FileSystem.downloadAsync(uri, thumbnailUri);
        }
        catch (e) {
            console.warn(e);
        }
    };

    React.useEffect(() => {
        getThumbnail();
    }, [])

    function onVideoItemClick(){
        setIsOpen(true);
    }

    function VideoItemText(){
        return(
            <View style={styles.textContainer}>
                <Text style={[styles.text, styles.text1]}>{fileName}</Text>
                <Text style={[styles.text, styles.text2]}>{date_right_now}</Text>
            </View>
        );
    }
    
    return(
        <View styles={styles.videoItemContainer}>
            <TouchableHighlight style={styles.touchable} underlayColor={appColors.buttonPressedColor} onPress={onVideoItemClick}>
                <View>
                    <View style={styles.thumbnailContainer}>
                        <Image source={{ uri: thumbnail }} style={styles.thumbnail}/>
                    </View>
                    {false && <VideoItemText/>}
                </View>
            </TouchableHighlight>

            {isOpen && <UserVideoModal isOpen={isOpen} setIsOpen={setIsOpen} fileUri={fileUri} setFiles={props.setFiles}/>}
        </View>
    )
}


const styles = StyleSheet.create({
    videoItemContainer: {
        width: '100%',
        height: '100%',
    },

    touchable:{
        width: '100%',
    },

    thumbnailContainer:{
        width: '100%',
    },

    thumbnail: {
        padding: 3,
        flex: 1,
        width: wp(33.3),
        height: wp(33.3),
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