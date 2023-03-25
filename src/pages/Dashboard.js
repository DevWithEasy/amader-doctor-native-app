import axios from "axios";
import { Button, HStack, Stack } from "native-base";
import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addDoctor } from "../store/slice/authSlice";
import { apiUrl } from "../utils/baseUrl";


export default function Dashboard({route,navigation}) {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
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
            path : 'Information'
        },
        {
            title : 'Chamber List',
            path : 'Chambers'
        },
        {
            title : 'Payment',
            path : 'Payment'
        },
        {
            title : 'Payment History',
            path : 'Payment History'
        }
    ]
    
    return(
        <ScrollView className='mx-2 mt-2 bg-gray-200'>
            <View className='space-y-1'>
                {data.map((d,i)=><TouchableOpacity 
                    key={i}
                    className='p-1 bg-blue-500 rounded-md'
                    onPress={()=>navigation.navigate(d.path)}
                >
                    <Text className='p-2 text-white'>{d.path}</Text>
                </TouchableOpacity>)}
            </View>
        </ScrollView>
    )
}