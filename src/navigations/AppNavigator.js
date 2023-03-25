import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Appointment from '../pages/Appointment';
import Chambers from '../pages/dashborad/Chambers';
import Information from '../pages/dashborad/Information';
import PaymentHistory from '../pages/dashborad/PaymentHistory';
import Payment from '../pages/dashborad/PaymentHistory';
import Splash from '../pages/Splash';
import DrawerNavigator from './DrawerNavigator';


export default function AppNavigator(){
    const Stack = createNativeStackNavigator()
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Spalash' component={Splash} options={{headerShown : false}}/>
                <Stack.Screen name='Main' component={DrawerNavigator} options={{headerShown : false}}/>
                <Stack.Screen name='Appointment' component={Appointment} />
                <Stack.Screen name='Information' component={Information} />
                <Stack.Screen name='Chambers' component={Chambers} />
                <Stack.Screen name='Payment' component={Payment} />
                <Stack.Screen name='Payment History' component={PaymentHistory} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}