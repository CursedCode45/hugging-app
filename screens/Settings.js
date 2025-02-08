import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import BottomTab from '../components/BottomTab'  
import { appColors } from '../constant/AppColors';
import { useEffect, useState } from 'react';
import * as FileSystem from "expo-file-system";
import * as SecureStore from 'expo-secure-store';


async function getUniqueId() {
    let userId = await SecureStore.getItemAsync('userId');
    if (userId) {
        return userId;
    }
    else{
        userId = crypto.randomUUID();
        await SecureStore.setItemAsync('userId', userId);
    } 
}

export default function Settings(){
  const [userID, setUserID] = useState('');

  function deleteAllVideos(){
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then((result) => {
      result.map(async(elem, idx) => {
        const fileUri = FileSystem.documentDirectory + elem;
        await FileSystem.deleteAsync(fileUri)
      })
    });
  }

  useEffect(() => {
    getUniqueId().then((data) => {setUserID(data);});
  }, [])

  return(
    <>
      <View style={styles.container}>
        <View style={styles.btnContainer}>

          <TouchableHighlight style={styles.textContainer} underlayColor={appColors.buttonColor} onPress={()=>{}}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>👤</Text>
              <Text style={styles.text}>User ID -</Text>
              <Text style={styles.idText}>{userID}</Text>
            </View>
          </TouchableHighlight>

          <View style={styles.horizontalLine}></View>

          <TouchableHighlight style={styles.textContainer} underlayColor={appColors.buttonColor} onPress={()=>{}}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>🔒</Text>
              <Text style={styles.text}>Privacy Policy</Text>
            </View>
          </TouchableHighlight>
        
          <View style={styles.horizontalLine}></View>

          <TouchableHighlight style={styles.textContainer} underlayColor={appColors.buttonColor} onPress={()=>{}}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>⚖️</Text>
              <Text style={styles.text}>Terms of Use</Text>
            </View>
          </TouchableHighlight>

          <View style={styles.horizontalLine}></View>

          <TouchableHighlight style={styles.textContainer} underlayColor={appColors.buttonColor} onPress={deleteAllVideos}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>🗑️</Text>
              <Text style={styles.text}>Delete All Videos</Text>
            </View>
          </TouchableHighlight>

        </View>
      </View>
      <BottomTab></BottomTab>
    </>
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
    btnContainer: {
      width: '80%',
      backgroundColor: appColors.lighterDark,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      alignItems: 'center',
      width: '100%',
      paddingLeft: 10,
      height: 60,
    },
    text: {
      color: appColors.textColor,
      marginLeft: 15,
      fontSize: 20,
    },

    idText: {
      color: appColors.textColor,
      fontSize: 13,
      flexWrap: 'wrap',
      flexShrink: 1,
      marginLeft: 10,
      marginRight: 5,
    },

    horizontalLine: {
      width: '100%',
      height: 1,
      backgroundColor: appColors.lightColor,
    },
  });