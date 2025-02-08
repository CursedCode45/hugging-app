import { StyleSheet, Button, Text, View } from 'react-native';
import BottomTab from '../components/BottomTab'  
import { UploadPhotosContainer } from '../components/PhotoUpload';
import { useNavigation } from '@react-navigation/native'
import { appColors } from '../constant/AppColors';
import { Vidplays } from '../components/Vidplays';
import Hug_video from '../assets/images/Hug_video.mp4'


export default function GenerateScreen(){
    const navigation = useNavigation();


    return(
    <View style={styles.container}>
        <View style={styles.videoContainer}>
          <Vidplays source={Hug_video}/>
        </View>
        <UploadPhotosContainer></UploadPhotosContainer>
        <BottomTab></BottomTab>
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
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