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
import ContactUsButton from '../components/ContactUsButton';
import LoadingSkeletonView from '../components/LoadingSkeletonView';

const BACKGROUND_TASK = 'fetch-video-on-background';

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

  if (usesLeft === null){
      return(
          <View style={styles.rootLoadingContainer}>
                <View style={styles.loadingContainer}>
                    <LoadingSkeletonView color1={appColors.lighterDark} color2={appColors.weakLight} borderRadius={15}/>
              </View>
          </View>
      );
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

          <View style={styles.textContainer}>
            <View style={styles.textContainer}>
              <View style={[styles.svgContainer, {backgroundColor: appColors.orangeDarkColor}]}>
                <TERMS_AND_USE_SVG color={appColors.deleteButtonTextColor}/>
              </View>
              <Text style={styles.text}>Uses: {usesLeft}</Text>
              <View style={styles.horizontalLine}/>
            </View>
          </View>

          <ContactUsButton/>
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

    rootLoadingContainer: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
    },

    container: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      backgroundColor: appColors.background,
      marginTop: 10,
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

    loadingContainer: {
      width: wp(92),
      maxWidth: 500,
      height: 45*6,
      borderRadius: 15,
      backgroundColor: 'blue',
      marginTop: 10,
    },

    svgContainer: {
      height: 30,
      width: 30,
      padding: 5,
      borderRadius: 4,
      marginLeft: 0,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center'
    },

    text: {
      color: appColors.textColor,
      marginLeft: 15,
      fontSize: 17,
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