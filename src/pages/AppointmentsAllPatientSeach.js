import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { apiUrl } from "../utils/baseUrl";
import { View } from "react-native";
import { Text } from "react-native";
import { HStack } from "native-base";
import { TouchableOpacity } from "react-native";
import getToken from "../utils/getToken";

export default function AppointmentsAllPatientSeach({route,navigation}) {

    const [appointments,setAppointments] = useState([])
    const [token,setToken] = useState()
    
    async function getAppointments(){
        try{
            const res = await axios.get(`${apiUrl}/appointment/all/search?day=${route.params.day}&date=${route.params.date}`,{
                headers : {
                    authorization : `Barear ${route.params.token}`
                }
            });

            setAppointments(res.data.data);
        }catch(err){
            console.log(err);
        }
        
    }

    async function confirmAppointment(id){
        const res = await axios.put(`${apiUrl}/appointment/confirm/${id}`,{},{
            headers : {
                authorization : token
            }
        });
        if(res.data.status === 200){
            getAppointments()
        };
    }

    async function rejectAppointment(id){
        const res = await axios.put(`${apiUrl}/appointment/reject/${id}`,{},{
            headers : {
                authorization : token
            }
        });
        if(res.data.status === 200){
            getAppointments()
        };
    }

    useEffect(()=>{
        getToken(setToken)
        getAppointments()
    },[])

    
    return(
        <ScrollView className='mx-2 mt-1'>
            <Text className='text-base text-center p-2 font-bold bg-blue-400 text-white rounded-md mb-2'>All appointment of {route.params.day} {route.params.date}</Text>
            <View className='space-y-2'>
                {
                    appointments && appointments.map(appointment=><View
                        key={appointment._id}
                        className='bg-white p-2 rounded-md'
                        >
                        <View className='relative'>
                            <Text className='font-bold'>
                                {appointment?.patientName}
                            </Text>
                            <Text className='text-gray-500 text-xs'>
                                {appointment?.address}
                            </Text>
                            <Text className='text-gray-500 text-xs'>
                                {appointment?.gender} and {appointment?.age} years old.
                            </Text>
                            <Text className={appointment?.status=== 'Pending'  ? 'text-yellow-500 border border-yellow-500 w-24 text-center rounded-full my-1 py-0.5' :  appointment?.status=== 'Confirmed' ? 'text-green-500 border border-green-500 w-24 text-center rounded-full my-1 py-0.5' : 'text-red-500 border border-red-500 w-24 text-center rounded-full my-1 py-0.5'}>
                                {appointment?.status}
                            </Text>
                        </View>
                        <HStack className='w-full flex justify-end space-x-1 mt-2'>
                            <TouchableOpacity onPress={()=>confirmAppointment(appointment._id)} className='bg-blue-500 px-4 py-2 rounded-md'>
                                    <Text className='text-center text-white'>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>rejectAppointment(appointment._id)} className='bg-red-500 px-4 py-2 rounded-md'>
                                    <Text className='text-center text-white'>Reject</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>navigation.navigate('Appointment Details',{id : appointment._id,token})} className='bg-gray-500 px-4 py-2 rounded-md'>
                                    <Text className='text-center text-white'>Details</Text>
                            </TouchableOpacity>
                        </HStack>
                    </View>)
                }
           </View> 
        </ScrollView>
        
    )
}