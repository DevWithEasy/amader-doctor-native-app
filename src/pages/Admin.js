import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from "react-redux"
import Users from "./admin/Users"
import Hospitals from "./admin/Hospitals"
import Doctors from "./admin/Doctors"
import ControlPanal from "./admin/ControlPanal"


const Tab = createBottomTabNavigator()

export default function Admin(){
    const user = useSelector(state=>state.auth.user)
    
    return(
        <Tab.Navigator screenOptions={({route})=>({
            headerShown : false,
            tabBarIcon : ({color,size,focused})=>{
                let iconName
                if(route.name === "Users"){
                    iconName = focused ? 'people-circle-outline' : 'people-outline'
                }else if(route.name === "Apply Doctor"){
                    iconName = focused ? 'school' : 'school-outline'
                }else if(route.name === "Hospitals"){
                    iconName = focused ? 'bed' : 'bed-outline'
                }else if(route.name === "Doctors"){
                    iconName = focused ? 'school' : 'school-outline'
                }else if(route.name === "Control Panal"){
                    iconName = focused ? 'settings' : 'settings-outline'
                }
                return <Icon name={iconName} size={22} color={color}/>
            }
        })}>
            <Tab.Screen name='Users' component={Users}/>
            <Tab.Screen name='Hospitals' component={Hospitals}/>
            <Tab.Screen name='Doctors' component={Doctors}/>
            <Tab.Screen name='Control Panal' component={ControlPanal}/>
        </Tab.Navigator>
    )
}