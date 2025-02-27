import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import * as React from 'react';
import BottomTab from '../components/BottomTab'  
import { appColors } from '../constant/AppColors';
import * as FileSystem from "expo-file-system";
import VideoItem from '../components/VideoItem';
import { wp } from '../constant/Helpers';
import { getCurrentAppUsesLeft } from '../constant/Helpers';
import { getAllVideoBasenames } from '../constant/Helpers';

export default function GenerateScreen(){
    const [files, setFiles] = React.useState([]);
    React.useEffect(() => {
      getAllVideoBasenames().then(data => {setFiles(data)});
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
                  <VideoItem fileIndex={index} setFiles={setFiles} filename={item}/>
                </View>
              )}
            />
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