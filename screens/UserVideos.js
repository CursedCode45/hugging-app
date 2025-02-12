import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import * as React from 'react';
import BottomTab from '../components/BottomTab'  
import { appColors } from '../constant/AppColors';
import * as FileSystem from "expo-file-system";
import { VideoItem } from '../components/VideoItem';
import { wp } from '../constant/Helpers';


export default function GenerateScreen(){
    const [files, setFiles] = React.useState([]);

    async function readVideos(){
      try{
        const results = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
        var filtered_files = [];
        for (const item of results){
          const itemURI = FileSystem.documentDirectory+item;
          const isDir = (await FileSystem.getInfoAsync(itemURI)).isDirectory
          if (!isDir){
            filtered_files.push(item)
          }
        }
        setFiles(filtered_files.sort());
      }
      catch(e){console.warn(e);}
    }

    React.useEffect(() => {
      readVideos();
    }, [])

    return(
        <View style={styles.container}>
            <FlatList
              style={styles.flatList}
              data={files}
              scrollEnabled={true}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3} // Number of columns
              renderItem={({ item, index }) => (
                <View style={styles.item}>
                  <VideoItem fileIndex={index} setFiles={setFiles} filename={item}></VideoItem>
                </View>
              )}
            />
            <BottomTab></BottomTab>
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
      flex: 1,
      display: 'flex',
      backgroundColor: appColors.background,
    },

    item: {
      width: wp(33.333),
      height: wp(33.333),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });