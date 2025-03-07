import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import GenerateScreen from './screens/GenerateScreen';
import UserVideos from './screens/UserVideos';
import Settings from './screens/Settings';
import { appColors } from './constant/AppColors';
import { View, StatusBar } from 'react-native';
import { StrictMode } from 'react';
import { hp } from './constant/Helpers';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { AppProvider } from './AppContext';
import BottomTab from './components/BottomTab';


const Tab = createBottomTabNavigator({
  screens: {
    Generate: GenerateScreen,
    UserVideos: UserVideos,
    Settings: Settings,
  },
});

const screenOptions = ({ route }) => ({
  unmountOnBlur: false,
  headerShown: 'false',
  tabBarStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: hp(12),
    ...appColors.addShadowLarge,
  },
  tabBarItemStyle: {
    margin: 5,
  },
  tabBarLabelStyle: {
    marginTop: 7,
  },
  tabBarIcon: ({ focused }) => {
    return <BottomTab route={route} focused={focused}/>;
  },

})


export default function App() {
  return (
    <StrictMode>
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: appColors.background }}>
          <NavigationContainer theme={DarkTheme}>
              <Tab.Navigator initialRouteName='Generate' screenOptions={screenOptions}>
                <Tab.Screen name='Generate' component={GenerateScreen}/>
                <Tab.Screen name='My Videos' component={UserVideos}/>
                <Tab.Screen name='Settings' component={Settings}/>
              </Tab.Navigator>
          </NavigationContainer>
        </View>
      </AppProvider>
    </StrictMode>
  );
}
