import { StyleSheet, Text, View, Image, SafeAreaView, Modal, StatusBar, TouchableHighlight } from 'react-native';
import React from 'react';
import { appColors } from '../constant/AppColors';
import * as VideoThumbnails from 'expo-video-thumbnails';
import Watermark from './../assets/images/Watermark.png';
import { hp, wp } from '../constant/Helpers';
import BuyButtons from './BuyButtons';
import * as FileSystem from "expo-file-system";
import LoadingComponentBreathing from './LoadingComponentBreathing';
import { Vidplays } from './Vidplays';
import X_SVG from '../assets/images/XSVG';
import { AppProvider } from '../AppContext';


export default function GetPro({setShowGetProScreen, setShowWatermark, filename}){
  const [thumbnail, setThumbnail] = React.useState(null);
  const [video, setVideo] = React.useState(null);

  function onCancelPress(){
    setShowGetProScreen(false);
}

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
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.rootContainer}>
          <TouchableHighlight style={styles.cancelTextContainer} underlayColor={appColors.mediumDark} onPress={onCancelPress}><X_SVG color={appColors.lighterDark}/></TouchableHighlight>
          {(video)? <Vidplays source={video} style={[styles.videoContainer]}/> : <LoadingComponentBreathing style={styles.videoContainer} breathColor1={appColors.mediumDark} breathColor2={appColors.lighterDark}/>}
          <View style={styles.buttonContainer}>
            <BuyButtons setShowGetProScreen={setShowGetProScreen} setShowWatermark={setShowWatermark} filename={filename}/>
          </View>
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
rootContainer:{
    flex: 1,
    backgroundColor: appColors.background,
    position: 'relative'
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

  videoContainer: {
    width: wp(210),
    height: wp(210)/1.66666666666,
    marginTop: -44,

    backgroundColor: appColors.lightColor,
    ...appColors.addShadow,
    borderRadius: 10,
    left: -wp(40),
    zIndex: 1
  },

  cancelTextContainer:{
    backgroundColor: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 1000,
    top: 50,
    left: 40,
    border: 'none',

    marginTop: 10,

    width: 30,
    height: 30,
    zIndex: 2,
  },

  cancelText: {
    fontSize: 23,
    color: appColors.deleteButtonTextColor,
    ...appColors.addShadowLarge
  },

  buttonContainer:{
    flex: 1,
    backgroundColor: appColors.background,
    width: wp(150),
    left: -wp(25),


    shadowColor: appColors.background,
    shadowOffset: { width: 0, height: -100 },
    shadowOpacity: 1,
    shadowRadius: 46,
    elevation: 5,
    zIndex: 3,
  }

})
