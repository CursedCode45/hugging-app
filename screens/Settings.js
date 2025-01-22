import { StyleSheet, Text, View } from 'react-native';
import BottomTab from '../components/BottomTab'  




export default function Settings(){
  return(
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>Settings</Text>
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
      backgroundColor: '#000',
    },
    textContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '70%',
      height: 200,
      backgroundColor: '#088F8F',
      borderRadius: 20,
    },
  });