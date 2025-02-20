import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import React from 'react';
import { appColors } from '../constant/AppColors';
import * as VideoThumbnails from 'expo-video-thumbnails';
import Watermark from './../assets/images/Watermark.png';
import { hp, wp } from '../constant/Helpers';
import BuyButtons from './BuyButtons';
import * as FileSystem from "expo-file-system";



export default function GetPro({thumbnailURI}){
    const [thumbnail, setThumbnail] = React.useState(null);

    async function getThumbnail(){
        try{
            const fileUri = `${FileSystem.documentDirectory}home_videos/home_hugging_video.mp4`;
            const { uri } = await VideoThumbnails.getThumbnailAsync(fileUri, {time: 0});
            setThumbnail(uri);
            console.log(uri);
        }
        catch(e){
            console.log(`Get Pro Thumbnail Error: ${e}`)
        }
    }

    React.useEffect(() => {
        getThumbnail();
    }, [])

    return (
    <View style={styles.rootContainer}>
        <SafeAreaView>
            <View style={styles.imageContainer}>
                <Image source={Watermark} style={styles.watermark}/>
                <Image source={{uri: thumbnail}} style={styles.thumbnail}/>
            </View>
            <View style={styles.imageContainer}>
                <Image source={{uri: thumbnail}} style={styles.thumbnail}/>
            </View>

            <BuyButtons/>
        </SafeAreaView>
    </View>
    )
}


const styles = StyleSheet.create({
rootContainer:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    backgroundColor: appColors.background,
  },

  imageContainer:{
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },

  watermark:{
    position: 'absolute',
    zIndex: 10,

    width: hp(19)*1.66666,
    height: hp(19),
    maxWidth: 500,
    maxHeight: 312.5,

    borderRadius: 10,
  },

  thumbnail: {
    width: hp(19)*1.66666,
    height: hp(19),
    maxWidth: 500,
    maxHeight: 312.5,

    backgroundColor: appColors.lighterDark,
    borderRadius: 10,
  }


})
