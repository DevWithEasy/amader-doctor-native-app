import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Appointment from './pages/Appointment';
import Doctors from './pages/Doctors';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Splash from './pages/Splash';

export default function AppNavigator(){
    const Stack = createNativeStackNavigator()
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Spalash' component={Splash} options={{headerShown : false}}/>
                <Stack.Screen name='Signup' component={Signup}/>
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='Profile' component={Profile}/>
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name='Doctors' component={Doctors}/>
                <Stack.Screen name='Appointment' component={Appointment}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}