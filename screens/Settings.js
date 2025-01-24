import { StyleSheet, Text, View } from 'react-native';
import BottomTab from '../components/BottomTab'  
import { appColors } from '../constant/AppColors';




export default function Settings(){
  return(
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Settings</Text>
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
    textContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '70%',
      height: 200,
      backgroundColor: appColors.lighterDark,
      borderRadius: 20,
    },
    text: {
      color: appColors.textColor,
    }
  });