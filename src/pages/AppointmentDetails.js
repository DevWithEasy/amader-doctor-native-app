import {Text,View,ScrollView, Image } from "react-native";
import { apiUrl } from "../utils/baseUrl";
import { useEffect, useState } from "react";
import axios from "axios";
import { HStack, Heading } from "native-base";
import dateGenerator from "../utils/dateGenerator";

export default function AppointmentDetails({route}){
    const {id,token} = route.params
    const [appointment,setAppointment] = useState({})
    async function getAppointmentDetails(id){
        const res = await axios.get(`${apiUrl}/appointment/details/${id}`,{
            headers : {
                authorization : token
            }
        })
        setAppointment(res.data.data)
    }
    useEffect(()=>{
        getAppointmentDetails(id)
    },[id])
    console.log(appointment);
    return(
        <ScrollView className='px-2 bg-white'>
            <View className='mb-10'>
                <Image 
                    source={require('../../assets/images/splash.png')}
                    style={{ width: 100, height: 100 }}
                    className='mx-auto'
                />
                <Heading className='text-2xl font-bold text-blue-400 text-center'>Amader Doctor</Heading>
                <Text className='text-center'>Best Solution of doctor appoinntment</Text>
            </View>
            <View className='mb-4 space-y-2'>
                <HStack>
                    <Text>Appointment Id : </Text>
                    <Text>{appointment?.appointmentId}</Text>
                </HStack>
                <HStack>
                    <Text>Appointment Date : </Text>
                    <Text>{appointment?.appointmentDate} ({appointment?.appointmentDay})</Text>
                </HStack>
                <HStack>
                    <Text>Patient Name : </Text>
                    <Text>{appointment?.patientName}</Text>
                </HStack>
                <HStack>
                    <Text>Patient Mobile : </Text>
                    <Text>{appointment?.phone}</Text>
                </HStack>
                <HStack>
                    <HStack className='w-1/2'>
                        <Text>Gender : </Text>
                        <Text>{appointment?.gender}</Text>
                    </HStack>
                    <HStack className='w-1/2'>
                        <Text>Age : </Text>
                        <Text>{appointment?.age} years</Text>
                    </HStack>
                </HStack>
            </View>
            <View className='my-4 border border-gray-300'>
                <HStack className='bg-gray-100'>
                    <Text className='w-8/12 text-center'>Appointment Info</Text>
                    <Text className='w-4/12 text-center'>Consultation Fee</Text>
                </HStack>
                <HStack className='p-2'>
                    <View className='w-8/12'>
                        <Text className='font-bold mb-2'>Dr. {appointment?.firstName} {appointment?.lastName}</Text>
                        <Text>{appointment?.vanue}</Text>
                        <Text>{appointment?.location}</Text>
                    </View>
                    <View className='w-4/12 flex-1 items-center justify-center'>
                        <Text>= {appointment?.feesPerConsultation} /- Tk</Text>
                    </View>
                </HStack>
            </View>
            <View>
                <HStack className='w-1/2'>
                    <Text>Submitted by : </Text>
                    <Text>{appointment?.submitedBy}</Text>
                </HStack>
                <HStack className='w-1/2'>
                    <Text>Submitted on : </Text>
                    <Text>{dateGenerator(appointment?.createdAt)}</Text>
                </HStack>
            </View>
        </ScrollView>
    )
}