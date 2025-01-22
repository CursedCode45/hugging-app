import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GenerateScreen from './screens/GenerateScreen';
import UserVideos from './screens/UserVideos';
import Settings from './screens/Settings';


const Stack = createNativeStackNavigator();
const stack_options = {
  headerShown: false,
  animation: 'none',
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{unmountOnBlur: false}}>
        <Stack.Screen name='Generate' component={GenerateScreen} options={stack_options}/>
        <Stack.Screen name='UserVideos' component={UserVideos} options={stack_options}/>
        <Stack.Screen name='Settings' component={Settings} options={stack_options}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

