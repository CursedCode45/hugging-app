import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GenerateScreen from './screens/GenerateScreen';
import UserVideos from './screens/UserVideos';
import Settings from './screens/Settings';
import { appColors } from './constant/AppColors';
import { View, StatusBar } from 'react-native';
import { StrictMode } from 'react';
import { hp } from './constant/Helpers';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator({
  tabBar: () => <BottomTab/>,
  screens: {
    Generate: GenerateScreen,
    UserVideos: UserVideos,
    Settings: Settings,
  },
});
const tabOptions = {
  unmountOnBlur: false,
  headerShown: 'false',
  tabBarStyle: {
    backgroundColor: 'none',
    height: hp(12),
    ...appColors.addShadowLarge,
  },

  tabBarItemStyle: {
    height: hp(11),
  }
}


export default function App() {
  return (
    <StrictMode>
      <View style={{ flex: 1, backgroundColor: appColors.background }}>
        <StatusBar animated={true} backgroundColor="rgb(0, 0, 0)" barStyle='light-content'/>
        <NavigationContainer theme={DarkTheme}>
            <Tab.Navigator screenOptions={tabOptions}>
              <Tab.Screen name='Generate' component={GenerateScreen} options={tabOptions}/>
              <Tab.Screen name='My Videos' component={UserVideos} options={tabOptions}/>
              <Tab.Screen name='Settings' component={Settings} options={tabOptions}/>
            </Tab.Navigator>
        </NavigationContainer>
      </View>
    </StrictMode>
  );
}


