import { StyleSheet, Button, Text, View } from 'react-native';
import BottomTab from '../components/BottomTab'  
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
import { getCurrentAppUsesLeft } from '../constant/Helpers';


export default function GenerateScreen(){
    const [video, setVideo] = useState(null);
    
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
      getCurrentAppUsesLeft().then((data) => {console.log(`Uses Left Right Now: ${data}`)});
    }, [])


    return(
      <View style={styles.rootContainer}>
        <View style={styles.container}>
            <View style={styles.videoContainer}>
              {(video)? <Vidplays source={video} style={styles.videoContainer}/> : <LoadingComponentBreathing style={styles.videoContainer} breathColor1={appColors.mediumDark} breathColor2={appColors.lighterDark}/>}
            </View>
            <UploadPhotosContainer/>
        </View>
        <BottomTab/>

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.background,
  },
  videoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(82.5),
    height: wp(49.5),
    maxWidth: 500,
    maxHeight: 312.5,

    backgroundColor: appColors.lightColor,
    ...appColors.addShadow,
    borderRadius: 10,

    borderWidth: 0.6,
    borderColor: appColors.veryLightColor,
  },
    text: {
      fontWeight: 1000,
      color: appColors.textColor,
    }
  });