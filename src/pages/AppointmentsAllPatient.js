import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { HStack, VStack, useToast } from "native-base";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { apiUrl } from "../utils/baseUrl";
import dateGenerator from "../utils/dateGenerator";
import getToken from "../utils/getToken";
import { Button } from 'react-native';

export default function AppointmentsAllPatient({route,navigation}) {
    const toast = useToast()
    const [show, setShow] = useState(false);
    const [day,setDay] = useState('');
    const [date, setDate] = useState(new Date(Date.now()));
    const [token,setToken] = useState()
    const [appointments,setAppointments] = useState([])
    const [key,setKey] = useState('');
    const [results,setResults] = useState([]);


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
                setResults(res.data.data)
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

    function handleSort(key,appointments,setResults){
        setKey(key)
        if(key === 'Pending'){
            setResults(appointments.filter(appointment=>appointment.status === key))
        }else if(key === 'Confirmed'){
            setResults(appointments.filter(appointment=>appointment.status === key))
        }else if(key === 'Rejected'){
            setResults(appointments.filter(appointment=>appointment.status === key))
        }else if(key === 'All'){
            setResults(appointments)
        }
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
                <Button
                    title={dateGenerator(date)}
                    onPress={()=>setShow(!show)} 
                    className='px-4 py-4 border border-gray-200 rounded-md'
                />
                <Button
                    title='Search'
                    onPress={()=>getAppointments()} 
                    className='bg-blue-500 py-3 rounded-md'
                />
            </VStack>
            {show && <DateTimePicker
                        value={date}
                        onChange={onChange}
            />}
            <HStack className='m-2 justify-between border rounded-md border-gray-400 bg-white'>
                <Button
                    title='All' 
                    onPress={()=>handleSort('All',appointments,setResults)} 
                    className={`px-4 py-2 ${key === 'All' ? 'bg-green-500' : ''}`}
                />
                <Button
                    title='Confirm' 
                    onPress={()=>handleSort('Confirmed',appointments,setResults)} 
                    className={`px-4 py-2 border-0 border-l border-gray-400 ${key === 'Confirmed' ? 'bg-green-500' : ''}`}
                />
                <Button
                    title='Pending' 
                    onPress={()=>handleSort('Pending',appointments,setResults)} 
                    className={`px-4 py-2 border-0 border-x border-gray-400 ${key === 'Pending' ? 'bg-green-500' : ''}`}
                />
                <Button
                    title='Rejected' 
                    onPress={()=>handleSort('Rejected',appointments,setResults)} 
                    className={`px-4 py-2 ${key === 'Rejected' ? 'bg-green-500' : ''}`}
                />
            </HStack>
            <View className='space-y-2'>
                {
                    results && results.map(appointment=><View
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
                            <Button
                                title='Confirm' 
                                onPress={()=>confirmAppointment(appointment._id)} 
                                className='bg-blue-500 px-4 py-2 rounded-md'
                            />
                            <Button
                                title='Reject' 
                                onPress={()=>rejectAppointment(appointment._id)} 
                                className='bg-red-500 px-4 py-2 rounded-md'
                            />
                            <Button
                                title='Details' 
                                onPress={()=>navigation.navigate('Appointment Details',{id : appointment._id,token})} 
                                className='bg-gray-500 px-4 py-2 rounded-md'
                            />
                        </HStack>
                    </View>)
                }
           </View> 
        </ScrollView>
        
    )
}