import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GenerateScreen from './screens/GenerateScreen';
import UserVideos from './screens/UserVideos';
import Settings from './screens/Settings';
import { UserVideoModal } from './components/UserVideoModal';
import { appColors } from './constant/AppColors';
import { View } from 'react-native';


const Stack = createNativeStackNavigator();
const stack_options = {
  headerShown: false,
  animation: 'none',
}


export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: appColors.background }}>
      <NavigationContainer>
          <Stack.Navigator screenOptions={{unmountOnBlur: false, presentation: 'transparentModal'}}>
            <Stack.Screen name='Generate' component={GenerateScreen} options={stack_options}/>
            <Stack.Screen name='UserVideos' component={UserVideos} options={stack_options}/>
            <Stack.Screen name='Settings' component={Settings} options={stack_options}/>
            <Stack.Screen name='UserVideoModal' component={UserVideoModal} options={stack_options}/>
          </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}


