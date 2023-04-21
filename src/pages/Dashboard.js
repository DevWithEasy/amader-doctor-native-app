import axios from "axios";
import { Button, HStack, Stack } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addDoctor } from "../store/slice/authSlice";
import { apiUrl } from "../utils/baseUrl";


export default function Dashboard({route,navigation}) {
    const dispatch = useDispatch()
    const {user,doctor} = useSelector(state => state.auth)
    async function getDoctor(){
        try{
            const res = await axios.get(`${apiUrl}/doctor/find/${user?._id}`,{
                headers : {
                authorization : `Bearer ${user?.token}`
                }
            })
            dispatch(addDoctor((res.data.data)))
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        getDoctor()
    },[])

    const data=[
        {
            title : 'Professional Information',
            path : 'Information',
            icon : <Icon name='information-circle-outline' size={18}/>
        },
        {
            title : 'Chamber List',
            path : 'Chambers',
            icon : <Icon name='business-outline' size={18}/>
        },
        {
            title : 'Payment',
            path : 'Payment',
            icon : <Icon name='wallet-outline' size={18}/>
        },
        {
            title : 'Payment History',
            path : 'Payment History',
            icon : <Icon name='layers-outline' size={18}/>
        }
    ]
    
    return(
        <ScrollView className='mx-2 mt-2 bg-gray-200'>
            <View className='space-y-1'>
                {data.map((d,i)=><TouchableOpacity 
                    key={i}
                    className='bg-blue-500 rounded-md flex-1 flex-row items-center space-x-1'
                    onPress={()=>navigation.navigate(d.path)}
                >
                    <Text className='text-white'>{d.icon}</Text>
                    <Text className='text-white p-2'>{d.path}</Text>
                </TouchableOpacity>)}
            </View>
        </ScrollView>
    )
}