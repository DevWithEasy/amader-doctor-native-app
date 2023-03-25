import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Box, Button, HStack } from 'native-base';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { baseUrl } from '../utils/baseUrl';

export default function Profile({navigation}) {
    const {user} = useSelector(state=>state.auth)
    const [date, setDate] = useState(new Date(user?.dob));
    const [show, setShow] = useState(false);
    const [name,setName] = useState(user?.name)
    const [email,setEmail] = useState(user?.email)
    const [phone,setPhone] = useState(user?.phone)
    const [gender,setGender] = useState(user?.gender)
    const [location,setLocation] = useState(user?.address.location)
    const [post_office,setPost_office] = useState(user?.address.post_office)
    const [upazilla,setUpazilla] = useState(user?.address.upazilla)
    const [district,setDistrict] = useState(user?.address.district)
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };

    return (
        <ScrollView>
            <View className='p-4'>
                <View className='w-[150px] h-[h-150] rounded-full overflow-hidden border-2 border-blue-400 mx-auto bg-white'>
                    <Image 
                        source={{uri : `${baseUrl}${user?.image?.url}`}}
                        style={{ width: 150, height: 150 }}
                    />
                </View>
                <Text className='mt-2 text-center text-xl font-bold'>Robiul Awal</Text>
                <View className='my-4 bg-white shadow-lg rounded-md'>
                    {/* <Text className='-my-4 text-center text-xl font-bold'>Total Appointments</Text> */}
                    <HStack className='pt-6 pb-3'>
                        <Box className='flex-1 justify-center items-center'>
                            <Text>Success</Text>
                            <Text className='font-bold text-base text-green-500'>10</Text>
                        </Box>
                        <Box className='flex-1 justify-center items-center'>
                            <Text>Cancel</Text>
                            <Text className='font-bold text-base text-yellow-500'>10</Text>
                        </Box>
                        <Box className='flex-1 justify-center items-center'>
                            <Text>Rejected</Text>
                            <Text className='font-bold text-base text-red-500'>10</Text>
                        </Box>
                    </HStack>
                </View>
                <View className='space-y-2 bg-white p-2 rounded shadow-lg'>
                    <TextInput 
                        className='p-2 border-b border-gray-300' 
                        placeholder='Robiul Awal'
                        value={name}
                        onChangeText={(text)=>setName(text)}
                    />
                    <TextInput 
                        className='p-2 border-b border-gray-300' 
                        placeholder='robiulawal68@gmail.com'
                        value={email}
                        onChangeText={(text)=>setEmail(text)}
                    />
                    <TextInput 
                        className='p-2 border-b border-gray-300' 
                        placeholder='01717642515'
                        value={phone}
                        onChangeText={(text)=>setPhone(text)}
                    />
                    <HStack className='space-x-2'>
                        <View className='w-1/2 border-b border-gray-300'>
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
                        <TouchableOpacity onPress={()=>setShow(!show)} className='w-1/2 pl-2 pt-4 border-b border-gray-300'>
                            <Text>{date.toDateString()}</Text>
                        </TouchableOpacity>
                    </HStack>
                    <HStack className='space-x-2'>
                        <TextInput 
                            className='w-1/2 p-2 border-b border-gray-300' 
                            placeholder='Bangrol'
                            value={location}
                            onChangeText={(text)=>setLocation(text)}
                        />
                        <TextInput 
                            className='w-1/2 p-2 border-b border-gray-300' 
                            placeholder='Motra Hat (5100)'
                            value={post_office}
                            onChangeText={(text)=>setPost_office(text)}
                        />
                    </HStack>
                    <HStack className='space-x-2'>
                        <TextInput 
                            className='w-1/2 p-2 border-b border-gray-300' 
                            placeholder='Thakurgaon Sadar'
                            value={upazilla}
                            onChangeText={(text)=>setUpazilla(text)}
                        />
                        <TextInput 
                            className='w-1/2 p-2 border-b border-gray-300' 
                            placeholder='Thakurgaon'
                            value={district}
                            onChangeText={(text)=>setDistrict(text)}
                        />
                    </HStack>
                    {show && <DateTimePicker 
                                value={date}
                                onChange={onChange}
                    />}
                    <Button className='bg-blue-400 text-white'>Update</Button>
                </View>
            </View>
        </ScrollView>
    );
}