import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Appointment from '../pages/Appointment';
import AppointmentsAllPatientSeach from '../pages/AppointmentsAllPatientSeach';
import Chambers from '../pages/dashborad/Chambers';
import Information from '../pages/dashborad/Information';
import PaymentHistory from '../pages/dashborad/PaymentHistory';
import Payment from '../pages/dashborad/PaymentHistory';
import Splash from '../pages/Splash';
import DrawerNavigator from './DrawerNavigator';
import Appointments from '../pages/Appointments';
import AppointmentsAllPatient from '../pages/AppointmentsAllPatient';
import AppointmentDetails from '../pages/AppointmentDetails';
import VerifyEmail from '../pages/VerifyEmail';
import Ambulences from '../pages/Ambulences';
import BloodBank from '../pages/BloodBank';
import ForgetPassword from '../pages/ForgetPassword';


export default function AppNavigator(){
    const Stack = createNativeStackNavigator()
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Spalash' component={Splash} options={{headerShown : false}}/>
                <Stack.Screen name='Main' component={DrawerNavigator} options={{headerShown : false}}/>
                <Stack.Screen name='Ambulances' component={Ambulences} />
                <Stack.Screen name='Blood Bank' component={BloodBank} />
                <Stack.Screen name='Appointment' component={Appointment} />
                <Stack.Screen name='All Appointments' component={AppointmentsAllPatient} />
                <Stack.Screen name='All Appointments Search' component={AppointmentsAllPatientSeach} />
                <Stack.Screen name='Appointment Details' component={AppointmentDetails} />
                <Stack.Screen name='Information' component={Information} />
                <Stack.Screen name='Chambers' component={Chambers} />
                <Stack.Screen name='Payment' component={Payment} />
                <Stack.Screen name='Payment History' component={PaymentHistory} />
                <Stack.Screen name='Verify Account' component={VerifyEmail} />
                <Stack.Screen name='Forget Password' component={ForgetPassword} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}