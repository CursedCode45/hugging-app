import { StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import * as React from 'react';
import { appColors } from '../constant/AppColors';
import * as FileSystem from "expo-file-system";
import * as VideoThumbnails from 'expo-video-thumbnails';
import { UserVideoModal } from './UserVideoModal';
import { wp, hp } from '../constant/Helpers';
import { setImageSize } from '../constant/Helpers';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';


export default function VideoItem(props){
    // Navigation
    const navigation = useNavigation();

    const [thumbnail, setThumbnail] = React.useState(null);
    const [thumbnailWidth, setThumbnailWidth] = React.useState(0);
    const [thumbnailHeight, setThumbnailHeight] = React.useState(0);

    const [isOpen, setIsOpen] = React.useState(false);
    const fileUri = FileSystem.documentDirectory + props.filename;


    async function getThumbnail(){
        try {
            const thumbnailUri = fileUri.replace('.mp4', '.jpg')
            const thumbnailExists = (await FileSystem.getInfoAsync(thumbnailUri)).exists;
            if (thumbnailExists){
                setThumbnail(thumbnailUri);
                setImageSize(thumbnailUri, setThumbnailWidth, setThumbnailHeight);
                return thumbnailUri;
            }

            const { uri } = await VideoThumbnails.getThumbnailAsync(fileUri, {time: 0});
            await FileSystem.copyAsync({from: uri, to: thumbnailUri});
            setImageSize(uri, setThumbnailWidth, setThumbnailHeight);
            setThumbnail(uri);
            return uri;
        }
        catch (e) {
            console.warn(e);
        }
    };

    React.useLayoutEffect(() => {
        getThumbnail();
    })

    function onVideoItemClick(){
        setIsOpen(true);
    }
    
    return(
        <View styles={styles.videoItemContainer}>
            <TouchableHighlight style={styles.touchable} underlayColor={appColors.background} onPress={onVideoItemClick}>
                <View>
                    <View style={styles.thumbnailContainer}>
                        <Image source={{ uri: thumbnail }} style={styles.thumbnail}/>
                    </View>
                </View>
            </TouchableHighlight>

            {isOpen && <UserVideoModal thumbnail={thumbnail} filename={props.filename} videoWidth={thumbnailWidth} videoHeight={thumbnailHeight} isOpen={isOpen} setIsOpen={setIsOpen} fileUri={fileUri} setFiles={props.setFiles}/>}
        </View>
    )
};

const styles = StyleSheet.create({
    videoItemContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    touchable:{
        width: wp(33.333) - 6,
        height: wp(33.333) - 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    thumbnailContainer:{
        width: '100%',
    },

    thumbnail: {
        width: wp(33.333),
        height: wp(33.333),
        padding: 3,
    },
});