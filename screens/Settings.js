import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import BottomTab from '../components/BottomTab'  
import { appColors } from '../constant/AppColors';
import { useEffect, useState } from 'react';
import * as FileSystem from "expo-file-system";
import * as SecureStore from 'expo-secure-store';
import { wp } from '../constant/Helpers';
import { getUniqueId } from '../constant/Helpers';
import DELETE_SVG from '../assets/images/DeleteSvg';
import TERMS_AND_USE_SVG from '../assets/images/TermsAndUseSvg';
import LOCK_SVG from '../assets/images/LockSvg';


export default function Settings(){
  const [userID, setUserID] = useState('');
  const onPressColor = appColors.weakDark;

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
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.btnContainer}>

          <TouchableHighlight style={[styles.textContainer, {borderTopLeftRadius: 10, borderTopRightRadius: 10}]} underlayColor={onPressColor} onPress={()=>{}}>
            <View style={styles.textContainer}>
              <View style={[styles.svgContainer, {backgroundColor: appColors.closeButtonColor}]}>
                <LOCK_SVG color={appColors.deleteButtonTextColor}/>
              </View>
              <Text style={styles.text}>Privacy Policy</Text>
            </View>
          </TouchableHighlight>
        
          <View style={styles.horizontalLine}></View>

          <TouchableHighlight style={styles.textContainer} underlayColor={onPressColor} onPress={()=>{}}>
            <View style={styles.textContainer}>
              <View style={[styles.svgContainer, {backgroundColor: appColors.orangeDarkColor}]}>
                <TERMS_AND_USE_SVG color={appColors.deleteButtonTextColor}/>
              </View>
              <Text style={styles.text}>Terms of Use</Text>
            </View>
          </TouchableHighlight>

          <View style={styles.horizontalLine}></View>

          <TouchableHighlight style={[styles.textContainer, {borderBottomLeftRadius: 10, borderBottomRightRadius: 10}]} underlayColor={onPressColor} onPress={deleteAllVideos}>
            <View style={styles.textContainer}>
            <View style={[styles.svgContainer, {backgroundColor: appColors.deleteButtonColor}]}>
                <DELETE_SVG color={appColors.deleteButtonTextColor}/>
              </View>
              <Text style={styles.text}>Delete All Videos</Text>
            </View>
          </TouchableHighlight>

        </View>
      </View>
      <BottomTab></BottomTab>
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
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: appColors.background,
    },

    btnContainer: {
      width: wp(80),
      backgroundColor: appColors.lighterDark,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',

      borderWidth: 0.2,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderColor: appColors.lightColor,
    },

    textContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      alignItems: 'center',
      width: '100%',
      paddingLeft: wp(2.5),
      height: 60,
    },

    svgContainer: {
      height: 35,
      width: 35,
      padding: 5,
      borderRadius: 4,
      marginLeft: 15,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center'
    },

    text: {
      color: appColors.textColor,
      marginLeft: 15,
      fontSize: 20,
      fontFamily: appColors.fontExtraLight,
    },

    horizontalLine: {
      position: 'relative',
      width: wp(74),
      right: -wp(3),
      height: 0.4,
      backgroundColor: appColors.lightColor,
    },
  });