import { StyleSheet, Text, View, Image, SafeAreaView, Modal } from 'react-native';
import React from 'react';
import { appColors } from '../constant/AppColors';
import * as VideoThumbnails from 'expo-video-thumbnails';
import Watermark from './../assets/images/Watermark.png';
import { hp, wp } from '../constant/Helpers';
import BuyButtons from './BuyButtons';
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from 'expo-image-manipulator'


export default function GetPro({onModalClose=() => {}, isPaid=false}){
    const [thumbnail, setThumbnail] = React.useState(null);

    async function getThumbnail(){
        try{
            const fileUri = `${FileSystem.documentDirectory}home_videos/home_hugging_video.mp4`;
            const { uri } = await VideoThumbnails.getThumbnailAsync(fileUri, {time: 4000});
            setThumbnail(uri);
        }
        catch(e){
            console.log(`Get Pro Thumbnail Error: ${e}`)
        }
    }

    React.useEffect(() => {
        getThumbnail();
    }, [])

    return (
      <Modal color={appColors.background} animationType="slide" transparent={false} visible={true} onRequestClose={onModalClose}>
        <View style={styles.rootContainer}>
            <SafeAreaView>
                <View style={styles.headlineTextContainer}>
                    <Text style={[styles.headlineText]}>Download Video</Text>
                    <Text style={styles.headlineText}><Text style={styles.withoutText}>Without</Text> Watermark</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{uri: thumbnail}} style={styles.thumbnail}/>
                    <Image source={Watermark} style={styles.watermark}/>
                </View>

                <BuyButtons/>
            </SafeAreaView>
        </View>
      </Modal>
    )
}


const styles = StyleSheet.create({
rootContainer:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: appColors.background,
  },

  headlineTextContainer: {
    width: wp(72),
    maxWidth: 500,
    maxHeight: 312.5,
  },

  headlineText: {
    fontFamily: appColors.fontSemiBold,
    fontSize: 28,
    color: appColors.textColor,
    textAlign: 'center',
  },

  withoutText: {
    fontFamily: appColors.fontSemiBold,
    fontSize: 28,
    color: appColors.deleteButtonTextColor,
  },

  imageContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  thumbnail: {
    width: wp(72),
    height: wp(72)/1.666666,
    maxWidth: 500,
    maxHeight: 312.5,

    backgroundColor: appColors.lighterDark,
    borderRadius: 5,
  },

  watermark: {
    width: wp(72),
    height: wp(72)/1.666666,
    maxWidth: 500,
    maxHeight: 312.5,
    position: 'absolute',
    borderRadius: 5,
  },


})
