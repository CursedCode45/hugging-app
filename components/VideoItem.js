import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import * as React from 'react';
import { appColors } from '../constant/AppColors';
import * as FileSystem from "expo-file-system";
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Loading } from '../components/Loading';
import { UserVideoModal } from './UserVideoModal';
import { wp, hp } from '../constant/Helpers';
import { setImageSize } from '../constant/Helpers';


export function VideoItem(props){
    const [thumbnail, setThumbnail] = React.useState(null);
    const [thumbnailWidth, setThumbnailWidth] = React.useState(0);
    const [thumbnailHeight, setThumbnailHeight] = React.useState(0);

    const [isOpen, setIsOpen] = React.useState(false);
    const [date_right_now, fileName] = props.filename.split('_')
    const fileUri = FileSystem.documentDirectory + props.filename;

    async function getThumbnail(){
        const thumbnailUri = FileSystem.cacheDirectory + props.filename.replace('.mp4', '.jpg')
        const thumbnailExists = (await FileSystem.getInfoAsync(thumbnailUri)).exists;
        if (thumbnailExists){
            await setImageSize(thumbnailUri, setThumbnailWidth, setThumbnailHeight);
            setThumbnail(thumbnailUri);
            return;
        }

        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(fileUri, {time: 0});
            setThumbnail(uri);
            await setImageSize(uri, setThumbnailWidth, setThumbnailHeight);
            await FileSystem.downloadAsync(uri, thumbnailUri);
        }
        catch (e) {
            console.warn(thumbnailUri);
            console.warn(e);
        }
    };

    React.useEffect(() => {
        getThumbnail();
    }, [])

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

            {isOpen && <UserVideoModal videoWidth={thumbnailWidth} videoHeight={thumbnailHeight} isOpen={isOpen} setIsOpen={setIsOpen} fileUri={fileUri} setFiles={props.setFiles}/>}
        </View>
    )
}


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