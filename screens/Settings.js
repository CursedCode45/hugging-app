import { StyleSheet, Text, View } from 'react-native';
import BottomTab from '../components/BottomTab'  
import { appColors } from '../constant/AppColors';
import { useEffect } from 'react';


export default function Settings(){
  return(
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>👤</Text>
          <Text style={styles.text}>User ID</Text>
        </View>

        <View style={styles.horizontalLine}></View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>🔒</Text>
          <Text style={styles.text}>Privacy Policy</Text>
        </View>

        <View style={styles.horizontalLine}></View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>⚖️</Text>
          <Text style={styles.text}>Terms of Use</Text>
        </View>
      </View>
      <BottomTab></BottomTab>
    </View>
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
      paddingLeft: 30,
      height: 60,
    },
    text: {
      color: appColors.textColor,
    },
    horizontalLine: {
      width: '100%',
      height: 1,
      backgroundColor: appColors.lightColor,
    },
  });