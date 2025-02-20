import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GenerateScreen from './screens/GenerateScreen';
import UserVideos from './screens/UserVideos';
import Settings from './screens/Settings';
import { UserVideoModal } from './components/UserVideoModal';
import { appColors } from './constant/AppColors';
import { View, StatusBar } from 'react-native';
import { StrictMode } from 'react';
import GetPro from './components/GetPro';


const Stack = createNativeStackNavigator();
const stack_options = {
  headerShown: false,
  animation: 'none',
}


export default function App() {
  return (
    <StrictMode>
      <View style={{ flex: 1, backgroundColor: appColors.background }}>
        <StatusBar animated={true} backgroundColor="#61dafb" barStyle='light-content'/>
        <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator screenOptions={{unmountOnBlur: false, presentation: 'transparentModal'}}>
              <Stack.Screen name='GetPro' component={GetPro} options={stack_options}/>
              <Stack.Screen name='Generate' component={GenerateScreen} options={stack_options}/>
              <Stack.Screen name='UserVideos' component={UserVideos} options={stack_options}/>
              <Stack.Screen name='Settings' component={Settings} options={stack_options}/>
              <Stack.Screen name='UserVideoModal' component={UserVideoModal} options={stack_options}/>
            </Stack.Navigator>
        </NavigationContainer>
      </View>
    </StrictMode>
  );
}


