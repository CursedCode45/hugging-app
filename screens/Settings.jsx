import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import { appColors } from '../constant/AppColors';
import { useState } from 'react';
import * as FileSystem from "expo-file-system";
import DELETE_SVG from '../assets/images/DeleteSvg';
import TERMS_AND_USE_SVG from '../assets/images/TermsAndUseSvg';
import LOCK_SVG from '../assets/images/LockSvg';
import { getAllVideoBasenames, wp, deleteVideo } from '../constant/Helpers';
import { useAppContext } from '../AppContext';
import TermsOfServicesModal from '../components/TermsOfServicesModal';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';
import SettingsPremiumButton from '../components/SettingsPremiumButton';
import RestorePurchasesButton from '../components/RestorePurchasesButton';


export default function Settings(){
  const [showTOS, setShowTOS] = useState(false);
  const [showPP, setShowPP] = useState(false);

  const onPressColor = appColors.weakDark;
  const { usesLeft, setUsesLeft, isPremium, setIsPremium } = useAppContext();


  async function deleteAllVideos(){
    try{
      const allBaseNames = await getAllVideoBasenames();
      if(allBaseNames.length !== 0){
        allBaseNames.map(async(elem) => {
          deleteVideo(elem);
        })
        Alert.alert('All videos are now deleted')
      }
      else{
        Alert.alert('No videos found')
      }
    }
  
    catch(e){
      console.warn(`Error happened while deliting videos: ${e}`)
    }
}


  return(
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.btnContainer}>

          <TouchableHighlight style={[styles.textContainer, {borderTopLeftRadius: 15, borderTopRightRadius: 15}]} underlayColor={onPressColor} onPress={()=>{setShowPP(true)}}>
            <View style={styles.textContainer}>
              <View style={[styles.svgContainer, {backgroundColor: appColors.closeButtonColor}]}>
                <LOCK_SVG color={appColors.deleteButtonTextColor}/>
              </View>
              <Text style={styles.text}>Privacy Policy</Text>
              <View style={styles.horizontalLine}/>
            </View>
          </TouchableHighlight>
        

          <TouchableHighlight style={styles.textContainer} underlayColor={onPressColor} onPress={()=>{setShowTOS(true)}}>
            <View style={styles.textContainer}>
              <View style={[styles.svgContainer, {backgroundColor: appColors.orangeDarkColor}]}>
                <TERMS_AND_USE_SVG color={appColors.deleteButtonTextColor}/>
              </View>
              <Text style={styles.text}>Terms of Use</Text>
              <View style={styles.horizontalLine}/>
            </View>
          </TouchableHighlight>

          <TouchableHighlight style={styles.textContainer} underlayColor={onPressColor} onPress={()=>{}}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Uses Left: {usesLeft}</Text>
              <View style={styles.horizontalLine}/>
            </View>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.textContainer]} underlayColor={onPressColor} onPress={deleteAllVideos}>
            <View style={styles.textContainer}>
            <View style={[styles.svgContainer, {backgroundColor: appColors.deleteButtonColor}]}>
                <DELETE_SVG color={appColors.deleteButtonTextColor}/>
              </View>
              <Text style={styles.text}>Delete All Videos</Text>
              <View style={styles.horizontalLine}/>
            </View>
          </TouchableHighlight>

          <RestorePurchasesButton/>
          <SettingsPremiumButton/>

        </View>
      </View>


      <TermsOfServicesModal showModal={showTOS} onModalClose={() => {setShowTOS(false)}}/>
      <PrivacyPolicyModal showModal={showPP} onModalClose={() => {setShowPP(false)}}/>
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
      position: 'relative',
      width: wp(92),
      maxWidth: 500,
      backgroundColor: appColors.lighterDark,
      borderRadius: 15,
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
      height: 45,
    },

    svgContainer: {
      height: 30,
      width: 30,
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
    },

    horizontalLine: {
      position: 'absolute',
      width: wp(71),
      right: 0,
      bottom: 0,
      maxWidth: 420,
      height: 0.8,
      backgroundColor: appColors.horizontalLine,
    },
  });