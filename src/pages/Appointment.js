import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { Box, Button, Stack, useToast } from "native-base";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, ToastAndroid, View } from "react-native";
import { useSelector } from 'react-redux';
import Chamber from "../components/Chamber";
import { apiUrl, baseUrl } from "../utils/baseUrl";
import getToken from '../utils/getToken';
import selectedDay from '../utils/selectedDay';


export default function Appointment({route,navigation}){
    const toast = useToast()
    const user = useSelector(state=>state.auth.user)
    const {doctor,image}=(route.params)
    // const [chambers,setChambers] = useState(doctor.chambers)
    const [chamber,setChamber] = useState({})
    const [date, setDate] = useState(new Date(Date.now()));
    const [show, setShow] = useState(false);
    const [token,setToken] = useState()
    const [name,setName] = useState(user?.name)
    const [age,setAge] = useState('')
    const [gender,setGender] = useState(user?.gender)
    const [patientPhone,setPatientPhone] = useState(user?.phone)
    const [address,setAddress] = useState(user?.address?.location && user?.address?.post_office && user?.address?.upazilla && user?.address?.district ? `${user.address.location}, ${user.address.post_office}, ${user.address.upazilla}, ${user.address.district}.` : '',)

    const appointmentData = {
        patientName: name,
        age,
        patientPhone,
        gender:gender,
        address,
        doctorId : doctor?._id,
        chamberId : chamber?._id,
        appointmentDay : chamber?.day,
        appointmentDate : date
    }


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    async function addAppointment(){
        const res = await axios.post(`${apiUrl}/appointment/add`,appointmentData,{
            headers : {
                authorization : token
            }
        })
        if(res.data.status === 200){
            navigation.navigate('Main')
        }
    }


    useEffect(()=>{
        getToken(setToken)
    },[])

    useEffect(()=>{
        selectedDay(date,doctor.chambers,setChamber,ToastAndroid)
    },[date])
    
    return(
        <ScrollView className='bg-white px-2 py-2  space-y-2'>
            <Stack direction='row' space='2' className='border border-blue-200 rounded-md p-2'>
                <Box>
                    <Image source={{uri : `${baseUrl}${image}`}} className='w-[80px] h-[80px] mx-auto rounded-md'/>
                </Box>
                <Box className='space-y-2'>
                    <Text className='text-lg font-bold text-blue-500'>{doctor?.firstName} {doctor?.lastName}</Text>
                    <Text className=''>{doctor?.education}</Text>
                    <Text className=''>{doctor?.specialization}</Text>
                    <Text className=''>{doctor?.experienceArea}</Text>
                    <Text className=''>Experience of {doctor?.experience} years</Text>
                    <Text className=''>{doctor?.designation} of {doctor?.workedAt} </Text>
                    <Text className=''>Consultation Fee : {doctor?.feesPerConsultation} Tk</Text>
                </Box>
            </Stack>
            <View className='bg-white border border-blue-200 rounded-md'>
                <Text className='text-center bg-blue-300 p-1 rounded-t-md'>Chambers</Text>
                <View className='m-2 space-y-2'>
                    {doctor.chambers && doctor.chambers.map(chamber=><Chamber key={chamber.id} chamber={chamber}/>)}
                </View>
            </View>
            {!chamber.vanue && <Box className='my-2 mb-6'>
                <Button 
                    onPress={() => {setShow(true)}} 
                    className={chamber.vanue ? `bg-blue-500 mt-2` : `bg-red-500 mt-2`}>
                        Click Select Appointment Date
                </Button>
            </Box>}

            {chamber?.vanue && <View View className='bg-blue-200 rounded-md'>
                <View className='p-1 rounded-md'>
                    <Text className='text-center text-lg font-bold'>{chamber?.vanue}</Text>
                    <Text className='text-center'>{chamber?.location}</Text>
                    <Text className='text-center'>{chamber?.day},{chamber?.date}</Text>
                </View>
                <Button 
                    onPress={() => {setShow(true)}} 
                    className='bg-blue-300 mt-2'>
                        Change date
                </Button>
            </View>}

            {show && <DateTimePicker
                        value={date}
                        onChange={onChange}
            />}

            {chamber.vanue && <View className='bg-white rounded-md space-y-2 mb-5 border border-blue-200'>
                <Text className='text-base font-bold text-center bg-blue-200 p-1 rounded-t-md'>Fillup Appoinment Form</Text>
                <View className='p-2 space-y-2'>
                    <View className='space-y-1'>
                        {/* <Text>Appointment Date : </Text> */}
                        <TextInput className='p-2 border border-gray-200 rounded-md' value={new Date(date).toDateString()}/>
                    </View>
                    <View className='space-y-1'>
                        {/* <Text>Patient Name : </Text> */}
                        <TextInput
                            onChangeText={text=>setName(text)}
                            className='p-2 border border-gray-200 rounded-md' 
                            value={name}
                        />
                    </View>
                    <View className='space-y-1'>
                        {/* <Text>Patient Age : </Text> */}
                        <TextInput
                            onChangeText={text=>setAge(text)} 
                            className='p-2 border border-gray-200 rounded-md' 
                            value={age}
                            placeholder='Patient Age'
                        />
                    </View>
                    <View className='space-y-1'>
                        {/* <Text>Patient Gender : </Text> */}
                        <View className='border border-gray-200 rounded-md'>
                            <Picker
                                selectedValue={gender}
                                onValueChange={(itemValue, itemIndex) =>
                                    setGender(itemValue)
                                }
                                >
                                <Picker.Item label="Select" value="" />
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Others" value="Others" />
                            </Picker>
                        </View>
                    </View>
                    <View className='space-y-1'>
                        {/* <Text>Patient Mobile No : </Text> */}
                        <TextInput
                            onChangeText={text=>setPatientPhone(text)} 
                            className='p-2 border border-gray-200 rounded-md' 
                            value={patientPhone}
                        />
                    </View>
                    <View className='space-y-1'>
                        {/* <Text>Patient Address : </Text> */}
                        <TextInput
                            onChangeText={text=>setAddress(text)}
                            className='p-2 border border-gray-200 rounded-md' 
                            value={address}
                        />
                    </View>
                    <Box className='my-2'>
                        <Button 
                            onPress={() => addAppointment()} 
                            className='bg-green-500 mt-2'>
                            Book Appointment
                        </Button>
                    </Box>
                </View> 
            </View>}
        </ScrollView>
    )
}