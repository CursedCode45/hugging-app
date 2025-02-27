import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import BottomTab from '../components/BottomTab'  
import { appColors } from '../constant/AppColors';
import { useEffect, useLayoutEffect, useState } from 'react';
import * as FileSystem from "expo-file-system";
import * as SecureStore from 'expo-secure-store';
import { wp } from '../constant/Helpers';
import { getUniqueId } from '../constant/Helpers';
import DELETE_SVG from '../assets/images/DeleteSvg';
import TERMS_AND_USE_SVG from '../assets/images/TermsAndUseSvg';
import LOCK_SVG from '../assets/images/LockSvg';
import DIAMOND_SVG from '../assets/images/DiamondSvg';
import { cancelPremium, getIsPremium, getCurrentAppUsesLeft } from '../constant/Helpers';
import { getAllVideoBasenames } from '../constant/Helpers';
import GetProWeeklyOnly from '../components/GetProWeeklyOnly';


export default function Settings(){
  const [isPremium, setIsPremium] = useState();
  const [usesLeft, setUsesLeft] = useState();
  const [showGetProModal, setShowGetProModal] = useState(false);
  const onPressColor = appColors.weakDark;

  async function deleteAllVideos(){
    const allBaseNames = await getAllVideoBasenames();
    if(allBaseNames.length !== 0){
      allBaseNames.map(async(elem, idx) => {
        const fileUri = FileSystem.documentDirectory + elem;
        await FileSystem.deleteAsync(fileUri)
      })
      Alert.alert('All videos are now deleted')
    }
    else{
      Alert.alert('No videos found')
    }
  }

  async function onCancelPremiumPress(){
    if (isPremium === 'yes'){
      cancelPremium();
      Alert.alert('Premium Canceled')
      setIsPremium('no');
    }
    else{
      Alert.alert(`You don't have a premium plan`)
    }
  }
  
  async function onGetPremiumPress() {
    setShowGetProModal(true);
  }

  async function onCheckoutPress(){
    setShowGetProModal(false);
    setIsPremium('yes');
    getCurrentAppUsesLeft().then((data) => {setUsesLeft(data)});
  }

  useLayoutEffect(() => {
    getIsPremium().then((data) => { setIsPremium(data)});
    getCurrentAppUsesLeft().then((data) => {setUsesLeft(data)});
  }, [])


  function GetPremiumOrCancelPremium(){
    if (isPremium === 'no'){
      return(
        <TouchableHighlight style={[styles.textContainer, {borderBottomLeftRadius: 15, borderBottomRightRadius: 15}]} underlayColor={onPressColor} onPress={onGetPremiumPress}>
            <View style={styles.textContainer}>
              <View style={[styles.svgContainer, {backgroundColor: appColors.closeButtonColor}]}>
                <DIAMOND_SVG/>
              </View>
              <Text style={styles.text}>Get Premium</Text>
              { showGetProModal && <GetProWeeklyOnly onGetProModalClose={()=>{setShowGetProModal(false)}} onCheckoutPress={onCheckoutPress} isVisible={showGetProModal}/>}
            </View>
          </TouchableHighlight>
      )
    }

    return(
      <TouchableHighlight style={[styles.textContainer, {borderBottomLeftRadius: 15, borderBottomRightRadius: 15}]} underlayColor={onPressColor} onPress={onCancelPremiumPress}>
            <View style={styles.textContainer}>
            <View style={[styles.svgContainer, {backgroundColor: appColors.closeButtonColor}]}>
                <DIAMOND_SVG/>
              </View>
              <Text style={styles.text}>Cancel Premium</Text>
            </View>
          </TouchableHighlight>
    );
  }

  return(
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.btnContainer}>

          <TouchableHighlight style={[styles.textContainer, {borderTopLeftRadius: 15, borderTopRightRadius: 15}]} underlayColor={onPressColor} onPress={()=>{}}>
            <View style={styles.textContainer}>
              <View style={[styles.svgContainer, {backgroundColor: appColors.closeButtonColor}]}>
                <LOCK_SVG color={appColors.deleteButtonTextColor}/>
              </View>
              <Text style={styles.text}>Privacy Policy</Text>
              <View style={styles.horizontalLine}/>
            </View>
          </TouchableHighlight>
        

          <TouchableHighlight style={styles.textContainer} underlayColor={onPressColor} onPress={()=>{}}>
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

          <GetPremiumOrCancelPremium/>

        </View>
      </View>
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