import { StyleSheet, View, FlatList } from 'react-native';
import * as React from 'react';
import BottomTab from '../components/BottomTab'  
import { appColors } from '../constant/AppColors';
import * as FileSystem from "expo-file-system";
import { VideoItem } from '../components/VideoItem';
import { wp } from '../constant/Helpers';


export default function GenerateScreen(){
    const [files, setFiles] = React.useState([]);

    React.useEffect(() => {
        FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then((result) => {
          setFiles(result);
        });
    }, [])

    return(
    <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={files}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3} // Number of columns
          renderItem={({ item }) => (
            <View style={styles.item}>
              <VideoItem setFiles={setFiles} filename={item}></VideoItem>
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
      width: wp(33.333),
      height: wp(33.333),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });