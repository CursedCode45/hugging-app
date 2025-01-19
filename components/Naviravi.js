import { StyleSheet, Text, View } from 'react-native';


export default function Navitavi() {
  return (
    <View style={styles.container}>
        <Text style={styles.tekst}>Ratitati</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tekst: {
    color: '#FFF',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#088F8F',
  },
});
