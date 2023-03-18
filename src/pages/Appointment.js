import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { Box, Button, Stack, useToast } from "native-base";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, ToastAndroid, View } from "react-native";
import Chamber from "../components/Chamber";
import { apiUrl, baseUrl } from "../utils/baseUrl";


export default function Appointment({route}){
    const toast = useToast();
    const [gender,setGender] = useState()
    const {doctor,image}=(route.params)
    const [chambers,setChambers] = useState([])
    const [chamber,setChamber] = useState({})
    const [date, setDate] = useState(new Date(Date.now()));
    const [show, setShow] = useState(false);
    async function getChambers(){
        try{
            const res = await axios.get(`${apiUrl}/doctor/findChambers/${doctor?._id}`)
            setChambers(res.data.data)
        }catch(err){
            console.log(err);
        }
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    function selectedDay(selected){
        const date = new Date(selected);
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = daysOfWeek[date.getDay()];
        const days = chambers.map(chamber=> chamber.day)
        const day = days.find(day => day === dayName)
        const chamber = chambers.find(chamber=>chamber.day === day)
        if(day === undefined){
            setChamber({})
            ToastAndroid.showWithGravity(
                'Please select a date from calender chamber list day name available',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
        }else{
            setChamber({...chamber,date : date.toLocaleDateString()}) 
        }
    }

    useEffect(()=>{
        getChambers()
    },[])

    useEffect(()=>{
        selectedDay(date)
    },[date])

    console.log(chamber);
    return(
        <ScrollView className='bg-gray-300 px-4 py-2  space-y-2'>
            <Stack direction='row' space='2' className='bg-white rounded-md p-3'>
                <Box>
                    <Image source={{uri : `${baseUrl}${image}`}} className='w-[100px] h-[100px] mx-auto rounded-md'/>
                </Box>
                <Box className='space-y-2'>
                    <Text className='text-lg font-bold text-blue-500'>{doctor?.firstName} {doctor?.lastName}</Text>
                    <Text className=''>{doctor?.education}</Text>
                    <Text className=''>{doctor?.specialization}</Text>
                    <Text className=''>{doctor?.experienceArea}</Text>
                    <Text className=''>Consultation Fee : {doctor?.feesPerConsultation} Tk</Text>
                </Box>
            </Stack>
            <View className='bg-white rounded-md'>
                <Text className='text-base font-bold text-center bg-blue-200 p-1 rounded-t-md'>Chambers</Text>
                <View className='m-2 space-y-2'>
                    {chambers && chambers.map(chamber=><Chamber key={chamber._id} chamber={chamber}/>)}
                </View>
            </View>
            <Box className='my-2 mb-6'>
                <Button 
                    onPress={() => {setShow(true)}} 
                    className={chamber.vanue ? `bg-blue-500 mt-2` : `bg-red-500 mt-2`}>
                        {chamber?.vanue ? 'Change Date' : 'Select Appointment Date'}
                </Button>
            </Box>

            {chamber?.vanue && <View View className='bg-white rounded-md pb-4'>
                <View className='-mt-5 bg-blue-200 w-10/12 mx-auto p-1 rounded-md'>
                    <Text className='text-center text-lg font-bold'>{chamber?.vanue}</Text>
                    <Text className='text-center'>{chamber?.location}</Text>
                    <Text className='text-center'>{chamber?.day},{chamber?.date}</Text>
                </View>
            </View>}

            {show && <DateTimePicker
                        value={date}
                        onChange={onChange}
            />}

            {chamber.vanue && <View className='bg-white rounded-md space-y-2 mb-5'>
                <Text className='text-base font-bold text-center bg-blue-200 p-1 rounded-t-md'>Fillup Appoinment Form</Text>
                <View className='p-2 space-y-1'>
                    <View className='space-y-1'>
                        <Text>Appointment Date : </Text>
                        <TextInput className='p-2 border border-gray-200 rounded-md' value={new Date(date).toDateString()}/>
                    </View>
                    <View className='space-y-1'>
                        <Text>Patient Name : </Text>
                        <TextInput className='p-2 border border-gray-200 rounded-md' placeholder='Robiul Awal'/>
                    </View>
                    <View className='space-y-1'>
                        <Text>Patient Age : </Text>
                        <TextInput className='p-2 border border-gray-200 rounded-md' placeholder='27'/>
                    </View>
                    <View className='space-y-1'>
                        <Text>Patient Gender : </Text>
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
                        <Text>Patient Mobile No : </Text>
                        <TextInput className='p-2 border border-gray-200 rounded-md' placeholder='01717640000'/>
                    </View>
                    <View className='space-y-1'>
                        <Text>Patient Address : </Text>
                        <TextInput className='p-2 border border-gray-200 rounded-md' placeholder='Bangrol,Motra Hat,Thakurgaon Sadar Thakurgaon'/>
                    </View>
                    <Box className='my-2'>
                        <Button 
                            onPress={() => navigation.navigate('Appointment',{doctor})} 
                            className='bg-green-500 mt-2'>
                            Book Appointment
                        </Button>
                    </Box>
                </View> 
            </View>}
        </ScrollView>
    )
}