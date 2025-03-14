import { StyleSheet, Button, Text, View } from 'react-native';
import { UploadPhotosContainer } from '../components/UploadPhotosContainer';
import { appColors } from '../constant/AppColors';
import { Vidplays } from '../components/Vidplays';
import Hug_video from '../assets/images/Hug_video.mp4'
import { useEffect, useLayoutEffect, useState } from 'react';
import { createNewDocumentSubDir } from '../constant/Helpers';
import * as FileSystem from "expo-file-system";
import { Asset } from 'expo-asset';
import LoadingComponentBreathing from '../components/LoadingComponentBreathing';
import { wp } from '../constant/Helpers';
import { useAppContext } from '../AppContext';
import GetPro from '../components/GetPro';


export default function GenerateScreen(){
    const [video, setVideo] = useState(null);
    const [showGetProScreen, setShowGetProScreen] = useState(false);
    const { usesLeft, setUsesLeft, isPremium, setIsPremium } = useAppContext();

    async function saveHomeVideoToStorage() {
      try{
        // If Video Exist in mobile dont save it.
        await createNewDocumentSubDir('home_videos')
        const fileUri = `${FileSystem.documentDirectory}home_videos/home_hugging_video.mp4`;
        const videoExists = (await FileSystem.getInfoAsync(fileUri)).exists;
        if (videoExists){
          setVideo(fileUri);
          return;
        }

        // If video doesnt exist save it.
        const asset = Asset.fromModule(Hug_video);
        await asset.downloadAsync();
        await FileSystem.copyAsync({
          from: asset.localUri,
          to: fileUri,
        });
        setVideo(fileUri);
      }
      catch(e){
        console.log(`Error Saving Video From Local Assets to Phone assets: ${e}`)
      }
    }

    useLayoutEffect(() => {
      saveHomeVideoToStorage();
    }, [])
    
    useEffect(()=>{
      console.log(`Uses Left: ${usesLeft}`);
      if (usesLeft === 0){
        setShowGetProScreen(true);
      }
    }, [usesLeft])


    return(
      <View style={styles.rootContainer}>
        <View style={styles.container}>
            <View style={styles.videoContainer}>
              {(video)? <Vidplays source={video} style={styles.videoContainer}/> : <LoadingComponentBreathing style={styles.videoContainer} breathColor1={appColors.mediumDark} breathColor2={appColors.lighterDark}/>}
            </View>
            <Text style={styles.textDescription}>Make two people come to life with a hug.</Text>
            <UploadPhotosContainer/>
        </View>
        {showGetProScreen && <GetPro setShowGetProScreen={setShowGetProScreen} setShowWatermark={()=>{}}/>}
      </View>

    );
}


const styles = StyleSheet.create({
  rootContainer:{
    display: 'flex',
    flex: 1,
    backgroundColor: appColors.background,
  },

  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: 10,
  },

  videoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(100),
    height: wp(100)/1.66666666666,
    maxWidth: 500,
    maxHeight: 500/1.666666666666,

    backgroundColor: appColors.lightColor,
    ...appColors.addShadow,
    borderRadius: 10,
  },
    text: {
      fontWeight: 1000,
      color: appColors.textColor,
    },

    textDescription: {
      color: appColors.lightColor,
      textAlign: 'center',
      fontSize: 16,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 15,
      
    }
  });