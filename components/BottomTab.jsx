import { StyleSheet, View } from 'react-native';
import SETTINGS from '../assets/images/Settings.js';
import BRAIN from '../assets/images/Brain.js';
import PROFILE_SVG from '../assets/images/ProfileSvg.js';
import { appColors } from '../constant/AppColors.js';


export default function BottomTab({ route, focused }) {
  const svg_unselected_color = appColors.lightColor;
  const svg_selected_color = appColors.textColor;

  if (route.name === 'Huggify') {
    return(
    <View style={styles.svgContainer}>
      <BRAIN color={(focused)? svg_selected_color: svg_unselected_color}/>
    </View>
    )
  }

  else if (route.name === 'My Videos') {
    return(
    <View style={styles.svgContainer}>
      <PROFILE_SVG color={(focused)? svg_selected_color: svg_unselected_color}/>
    </View>
    )
  }

  else if (route.name === 'Settings') {
    return(
      <View style={styles.svgContainer}>
        <SETTINGS color={(focused)? svg_selected_color : svg_unselected_color}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  svgContainer: {
    width: '100%',
    height: '100%',
    maxHeight: 100,
  }
});
