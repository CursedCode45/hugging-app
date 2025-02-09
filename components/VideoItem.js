import { StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import Animated from 'react-native-reanimated';
import * as React from 'react';
import { appColors } from '../constant/AppColors';
import * as FileSystem from "expo-file-system";
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Loading } from '../components/Loading';
import { UserVideoModal } from './UserVideoModal';
import { wp, hp } from '../constant/Helpers';
import { setImageSize } from '../constant/Helpers';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';




export function VideoItem(props){
    // Navigation
    const navigation = useNavigation();

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
        console.log(props.fileIndex);
    }, [])

    function onVideoItemClick(){
        setIsOpen(true);
        navigation.navigate('UserVideoModal', {fileIndex: props.fileIndex, videoWidth: thumbnailWidth, videoHeight: thumbnailHeight, isOpen: isOpen, fileUri: fileUri});
    }

    const sharedElements = () => [{ id: "image" }];
    
    return(
        <View styles={styles.videoItemContainer}>
            <TouchableHighlight style={styles.touchable} underlayColor={appColors.background} onPress={onVideoItemClick}>
                <View>
                    <View style={styles.thumbnailContainer}>
                        <SharedElement id={`image`}>
                            <Image source={{ uri: thumbnail }} style={styles.thumbnail}/>
                        </SharedElement>
                    </View>
                </View>
            </TouchableHighlight>

            {/* {isOpen && <UserVideoModal fileIndex={props.fileIndex} videoWidth={thumbnailWidth} videoHeight={thumbnailHeight} isOpen={isOpen} setIsOpen={setIsOpen} fileUri={fileUri} setFiles={props.setFiles}/>} */}
        </View>
    )
}
VideoItem.sharedElements = () => [{ id: "image" }];


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