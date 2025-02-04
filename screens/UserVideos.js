import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as React from 'react';
import BottomTab from '../components/BottomTab'  
import { useNavigation } from '@react-navigation/native';
import { appColors } from '../constant/AppColors';
import * as FileSystem from "expo-file-system";
import { Vidplays } from '../components/Vidplays';
import { VideoItem } from '../components/VideoItem';


export default function GenerateScreen(){
    const [files, setFiles] = React.useState([]);

    React.useEffect(() => {
        
        FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then((result) => {
          setFiles(result);
        });
    }, [])

    React.useEffect(() => {
      if (files.length > 0) {
        console.log(files)
      }
    }, [files])


    return(
    <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={files}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3} // Number of columns
          renderItem={({ item }) => (
            <View style={styles.item}>
              <VideoItem filename={item}></VideoItem>
            </View>
          )}
        />
        <BottomTab/>
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: appColors.background,
    },

    flatList:{
      marginTop: 60,
      display: 'flex',
      backgroundColor: appColors.background,
    },

    item: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 5,
    },
  });