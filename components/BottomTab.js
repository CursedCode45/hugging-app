import { StyleSheet, TouchableHighlight, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import SETTINGS from '../assets/images/Settings.js';
import BRAIN from '../assets/images/Brain.js';
import PROFILE_SVG from '../assets/images/ProfileSvg.js';
import { appColors } from '../constant/AppColors';
import { wp, hp } from '../constant/Helpers'


const on_touch_color = 'rgba(0, 0, 0, 0)';

const svg_unselected_color = appColors.lightColor;
const svg_selected_color = appColors.textColor;


export default function BottomTab() {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <TouchableHighlight style={styles.buttonContainer} underlayColor={on_touch_color} onPress={() => {navigation.popTo('Generate')}}>
          <View style={styles.iconContainer}>
              <View style={styles.svgContainer}>
                <BRAIN color={(route.name === 'Generate')? svg_selected_color: svg_unselected_color}/>
              </View>
              <Text style={(route.name === 'Generate')? styles.textSelected : styles.textUnselected}>Generate</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} underlayColor={on_touch_color} onPress={() => {navigation.popTo('UserVideos');}}>
          <View style={styles.iconContainer}>
            <View style={styles.svgContainer}>
              <PROFILE_SVG color={(route.name === 'UserVideos')? svg_selected_color: svg_unselected_color}/>
            </View>
            <Text style={(route.name === 'UserVideos')? styles.textSelected : styles.textUnselected}>My Videos</Text>
          </View>
        </TouchableHighlight>

          <TouchableHighlight style={styles.buttonContainer} underlayColor={on_touch_color} onPress={() => {navigation.popTo('Settings')}}>
            <View style={styles.iconContainer}>
              <View style={styles.svgContainer}>
                <SETTINGS color={(route.name === 'Settings')? svg_selected_color : svg_unselected_color}/>
              </View>
              <Text style={(route.name === 'Settings')? styles.textSelected : styles.textUnselected}>Settings</Text>
            </View>
          </TouchableHighlight> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: hp(12),
    position: 'absolute',
    bottom: 0,
    backgroundColor: appColors.bottomTab,
    ...appColors.addShadow
  },

  buttonContainer: {
    flex: 1,
    height: '100%',
    display: 'flex',
  },

  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 8,
  },

  textUnselected: {
    marginTop: 5,
    fontSize: 11,
    textAlign: 'center',
    fontWeight: 700,
    color: appColors.lightColor,
  },

  textSelected: {
    marginTop: 5,
    fontSize: 11,
    textAlign: 'center',
    fontWeight: 700,
    color: appColors.textColor,
  },

  svgContainer: {
    width: 30,
    height: 30,
  },

});
