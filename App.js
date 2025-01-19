import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navitavi from './components/Naviravi'  

export default function App() {
  return (
    <View style={styles.container}>
      <Navitavi></Navitavi>
      <View style={styles.textContainer}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
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
