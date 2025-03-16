import { StyleSheet, View, FlatList } from 'react-native';
import * as React from 'react';
import { appColors } from '../constant/AppColors';
import VideoItem from '../components/VideoItem';
import { wp } from '../constant/Helpers';
import { getAllVideoBasenames } from '../constant/Helpers';
import { useFocusEffect } from '@react-navigation/native';


export default function GenerateScreen(){
    const [files, setFiles] = React.useState([]);

    useFocusEffect(
      React.useCallback(() => {
        getAllVideoBasenames().then((data) => {setFiles(data)});
      }, []
    ))

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
      marginTop: 10,
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