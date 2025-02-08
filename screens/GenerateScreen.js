import { StyleSheet, Button, Text, View } from 'react-native';
import BottomTab from '../components/BottomTab'  
import { UploadPhotosContainer } from '../components/PhotoUpload';
import { useNavigation } from '@react-navigation/native'
import { appColors } from '../constant/AppColors';
import { Vidplays } from '../components/Vidplays';
import Hug_video from '../assets/images/Hug_video.mp4'
import { useEffect, useState } from 'react';
import { createNewDocumentSubDir } from '../constant/Helpers';
import * as FileSystem from "expo-file-system";
import { Asset } from 'expo-asset';


export default function GenerateScreen(){
    const navigation = useNavigation();
    const [video, setVideo] = useState();


    async function saveHomeVideoToStorage() {
      await createNewDocumentSubDir('home_videos')
      const fileUri = `${FileSystem.documentDirectory}home_videos/home_hugging_video.mp4`;
      const videoExists = (await FileSystem.getInfoAsync(fileUri)).exists;
      if (videoExists){
        setVideo(fileUri);
        return;
      }
      const asset = Asset.fromModule(Hug_video);
      await asset.downloadAsync();
      
      await FileSystem.copyAsync({
        from: asset.localUri,
        to: fileUri,
      });
      setVideo(fileUri);

    }

    useEffect(() => {
      saveHomeVideoToStorage();
    }, [])


    return(
      <>
        <View style={styles.container}>
            <View style={styles.videoContainer}>
              <Vidplays source={video}/>
            </View>
            <UploadPhotosContainer/>
        </View>
        <BottomTab/>
      </>

    );
}


const styles = StyleSheet.create({
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
      width: 330,
      height: 198,
      backgroundColor: appColors.lighterDark,
      ...appColors.addShadow,
      borderRadius: 20,
    },
    text: {
      fontWeight: 1000,
      color: appColors.textColor,
    }
  });