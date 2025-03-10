import { StyleSheet, Text, View, Image, SafeAreaView, Modal, StatusBar } from 'react-native';
import React from 'react';
import { appColors } from '../constant/AppColors';
import * as VideoThumbnails from 'expo-video-thumbnails';
import Watermark from './../assets/images/Watermark.png';
import { wp } from '../constant/Helpers';
import BuyButtons from './BuyButtons';
import * as FileSystem from "expo-file-system";
import LoadingComponentBreathing from './LoadingComponentBreathing';
import { Vidplays } from './Vidplays';



export default function GetPro({setShowGetProScreen, setShowWatermark, filename}){
  const [thumbnail, setThumbnail] = React.useState(null);
  const [video, setVideo] = React.useState(null);

  async function loadVideo(){
    try{
      const fileUri = `${FileSystem.documentDirectory}home_videos/home_hugging_video.mp4`;
      setVideo(fileUri);
    }
    catch(e){
      console.warn(`Error loading video at get pro: ${e}`)
    }
  }
    
    function onGetProModalClose(){
    setShowGetProScreen(false);
  }

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

  React.useLayoutEffect(() => {
      getThumbnail();
      loadVideo();
  }, [])

  return (
    <Modal color={appColors.background} animationType="slide" transparent={false} visible={true} onRequestClose={onGetProModalClose}>
      <View style={styles.rootContainer}>
              <View style={[styles.imageContainer]}>
                  {(video)? <Vidplays source={video} style={[styles.videoContainer,  {top: -70}]}/> : <LoadingComponentBreathing style={styles.videoContainer} breathColor1={appColors.mediumDark} breathColor2={appColors.lighterDark}/>}
              </View>
              <BuyButtons setShowGetProScreen={setShowGetProScreen} setShowWatermark={setShowWatermark} filename={filename}/>
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
    width: wp(85),
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
  },

  videoContainer: {
    width: wp(180),
    height: wp(180)/1.66666666666,

    backgroundColor: appColors.lightColor,
    ...appColors.addShadow,
    borderRadius: 10,
  },


})
