import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { HStack, VStack, useToast } from "native-base";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { apiUrl } from "../utils/baseUrl";
import dateGenerator from "../utils/dateGenerator";
import getToken from "../utils/getToken";

export default function AppointmentsAllPatient({route,navigation}) {
    const toast = useToast()
    const [show, setShow] = useState(false);
    const [day,setDay] = useState('');
    const [date, setDate] = useState(new Date(Date.now()));
    const [token,setToken] = useState()
    const [appointments,setAppointments] = useState([])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    async function getAppointments(){
        if(!day){
            toast.show({
                title: "Please select day and date",
                placement: "bottom"
              })
        }else{
            try{
                const res = await axios.get(`${apiUrl}/appointment/all/search?day=${day}&date=${dateGenerator(date)}`,{
                    headers : {
                        authorization : `${token}`
                    }
                });

                setAppointments(res.data.data);
            }catch(err){
                console.log(err);
            }
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
    },[])
    
    return(
        <ScrollView className='mx-2 mt-2'>
            <VStack className='bg-white p-2 rounded-md space-y-2'>
                <View className='border border-gray-200 rounded-md'>
                    <Picker
                        selectedValue={day}
                        onValueChange={(itemValue, itemIndex) =>
                            {setDay(itemValue);setShow(!show)}
                        }
                    >
                        <Picker.Item label="Select" value="" />
                        <Picker.Item label="Saturday" value="Saturday" />
                        <Picker.Item label="Sunday" value="Sunday" />
                        <Picker.Item label="Monday" value="Monday" />
                        <Picker.Item label="Tuesday" value="Tuesday" />
                        <Picker.Item label="Wednessday" value="Wednessday" />
                        <Picker.Item label="Thursday" value="Thursday" />
                        <Picker.Item label="Friday" value="Friday" />
                    </Picker>
                </View>
                <TouchableOpacity onPress={()=>setShow(!show)} className='px-4 py-4 border border-gray-200 rounded-md'>
                            <Text className=''>{dateGenerator(date)}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>getAppointments()} className='bg-blue-500 py-3 rounded-md'>
                            <Text className='text-center text-white'>Search</Text>
                </TouchableOpacity>
            </VStack>
            {show && <DateTimePicker
                        value={date}
                        onChange={onChange}
            />}
            <View className='mx-2 space-y-2'>
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
                        <HStack className='w-full flex justify-end space-x-1'>
                            {<TouchableOpacity onPress={()=>confirmAppointment(appointment._id)} className='bg-blue-500 px-4 py-2 rounded-md'>
                                    <Text className='text-center text-white'>Confirm</Text>
                            </TouchableOpacity>}
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