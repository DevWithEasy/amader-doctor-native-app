import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Appointments from "../pages/Appointments"
import Home from "../pages/Home"
import Notifiaction from "../pages/Notification"
import Profile from "../pages/Profile"
import Icon from 'react-native-vector-icons/Ionicons'
import Dashboard from "../pages/Dashboard"
import { useSelector } from "react-redux"
import ApplyDoctor from "../pages/ApplyDoctor"

const Tab = createBottomTabNavigator()

export default function BottomTabNavigator(){
    const user = useSelector(state=>state.auth.user)
    
    return(
        <Tab.Navigator screenOptions={({route})=>({
            headerShown : false,
            tabBarIcon : ({color,size,focused})=>{
                let iconName
                if(route.name === "Dashboard"){
                    iconName = focused ? 'school' : 'school-outline'
                }else if(route.name === "Apply Doctor"){
                    iconName = focused ? 'school' : 'school-outline'
                }else if(route.name === "Profile"){
                    iconName = focused ? 'person-circle' : 'person-circle-outline'
                }else if(route.name === "Appointments"){
                    iconName = focused ? 'book' : 'book-outline'
                }else if(route.name === "Notification"){
                    iconName = focused ? 'notifications' : 'notifications-outline'
                }
                return <Icon name={iconName} size={22} color={color}/>
            }
        })}>
            <Tab.Screen name='Profile' component={Profile}/>
            {!user.isDoctor && <Tab.Screen name='Apply Doctor' component={ApplyDoctor}/>}
            {user.isDoctor && <Tab.Screen name='Dashboard' component={Dashboard}/>}
            <Tab.Screen name='Appointments' component={Appointments}/>
            <Tab.Screen name='Notification' component={Notifiaction}/>
        </Tab.Navigator>
    )
}