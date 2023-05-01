import axios from "axios";
import { Box, Button, Stack } from "native-base";
import { useEffect, useState } from "react";
import { Image, Text,ToastAndroid } from "react-native";
import { useSelector } from "react-redux";
import { apiUrl, baseUrl } from "../utils/baseUrl";

export  default function Doctor(props){
    const isAuth = useSelector(state=>state.auth.isAuth)
    const{doctor,navigation} = props

    function goAppointment(navigation,doctorData){
        if(isAuth){
            navigation.navigate('Appointment',doctorData)
        }else{
            ToastAndroid.showWithGravity(
                'Please login first',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    }

    return(
        <Stack direction='row' space='2' className='bg-white rounded-md p-3'>
            <Box>
                <Image source={{uri : `${baseUrl}${doctor?.user?.image?.url}`}} className='w-[80px] h-[80px] mx-auto rounded-md'/>
            </Box>
            <Box className='space-y-2'>
                <Text className='text-lg font-bold text-blue-500'>{doctor?.firstName} {doctor?.lastName}</Text>
                <Text className=''>{doctor?.education}</Text>
                <Text className=''>{doctor?.specialization}</Text>
                <Text className=''>{doctor?.experienceArea}</Text>
                {/* <Text className=''>Experience of {doctor?.experience} years</Text>
                <Text className=''>{doctor?.designation} of {doctor?.workedAt} </Text>
                <Text className=''>Consultation Fee : {doctor?.feesPerConsultation} Tk</Text> */}
                <Button onPress={() => goAppointment(navigation,{doctor, image : doctor?.user?.image?.url})} 
                    className='bg-green-500 py-1.5'>
                        Book Appointment
                </Button>
            </Box>
        </Stack>
    )
}