import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import BottomTab from '../components/BottomTab'  
import { useNavigation } from '@react-navigation/native';
import { appColors } from '../constant/AppColors';
import * as FileSystem from "expo-file-system";
import { Vidplays } from '../components/Vidplays';


export default function GenerateScreen(){
    const navigation = useNavigation();
    const [video, setVideo] = React.useState('null');

    React.useEffect(() => {
        const fileUri = FileSystem.documentDirectory + "1.mp4";
        console.log(fileUri);
        setVideo(fileUri);
    }, [])


    return(
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.text}>{video}</Text>
            <Vidplays source={video}></Vidplays>            

        </View>
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
    textContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '70%',
      height: 200,
      backgroundColor: appColors.lighterDark,
      borderRadius: 20,
    },

    text: {
      color: appColors.textColor,
    }
  });