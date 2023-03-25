import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import Doctors from "../pages/Doctors";
import FindAppointment from "../pages/FindAppointment";
import Home from "../pages/Home";
import Hospitals from "../pages/Hospitals";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import BottomTabNavigator from "./BottomTabNavigator";

export default function DrawerNavigator(){
    const {isAuth} = useSelector(state=>state.auth)
    const Drawer = createDrawerNavigator()
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='Home' component={Home}
                options={{
                    drawerIcon : ({focused,color,size})=>(
                        <Icon name='home' size={18} color={color}/>
                    )
                }}
            />
            <Drawer.Screen name='Hospitals' component={Hospitals}
                options={{
                    drawerIcon : ({focused,color,size})=>(
                        <Icon name='bed' size={18} color={color}/>
                    )
                }}
            />
            <Drawer.Screen name='Doctors' component={Doctors}
                options={{
                    drawerIcon : ({focused,color,size})=>(
                        <Icon name='school' size={18} color={color}/>
                    )
                }}
            />
            <Drawer.Screen name='Find Appointment' component={FindAppointment}
                options={{
                    drawerIcon : ({focused,color,size})=>(
                        <Icon name='search' size={18} color={color}/>
                    )
                }}
            />
            {!isAuth && <Drawer.Screen name='Signup' component={Signup}
                options={{
                    drawerIcon : ({focused,color,size})=>(
                        <Icon name='person-add' size={18} color={color}/>
                    )
                }}
            />}
            {!isAuth && <Drawer.Screen name='Login' component={Login}
                options={{
                    drawerIcon : ({focused,color,size})=>(
                        <Icon name='arrow-redo' size={18} color={color}/>
                    )
                }}
            />}
            {isAuth && <Drawer.Screen name='Accout' component={BottomTabNavigator}
                options={{
                    drawerIcon : ({focused,color,size})=>(
                        <Icon name='person' size={18} color={color}/>
                    )
                }}
            />}
        </Drawer.Navigator>
    )
}