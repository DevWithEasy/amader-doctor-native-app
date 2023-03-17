import { HStack,Box } from 'native-base';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Profile({navigation}) {
    const [date, setDate] = useState(new Date(Date.now()));
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };

    return (
        <ScrollView>
            <View className='p-4'>
                <View className='w-[200px] h-[h-200] rounded-full border-2 border-blue-400 mx-auto bg-white'>
                    <Image 
                        source={require('../../assets/images/splash.png')}
                        style={{ width: 200, height: 200 }}
                        className='rounded-full mx-auto'
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
                    <TextInput className='p-2 border-b border-gray-300' placeholder='Robiul Awal'/>
                    <TextInput className='p-2 border-b border-gray-300' placeholder='robiulawal68@gmail.com'/>
                    <TextInput className='p-2 border-b border-gray-300' placeholder='01717642515'/>
                    <HStack className='space-x-2'>
                        <TextInput className='w-1/2 p-2 border-b border-gray-300' placeholder='Male'/>
                        <TextInput className='w-1/2 p-2 border-b border-gray-300' value={date.toDateString()} onFocus={()=>setShow(true)}/>
                    </HStack>
                    <HStack className='space-x-2'>
                        <TextInput className='w-1/2 p-2 border-b border-gray-300' placeholder='Bangrol'/>
                        <TextInput className='w-1/2 p-2 border-b border-gray-300' placeholder='Motra Hat (5100)'/>
                    </HStack>
                    <HStack className='space-x-2'>
                        <TextInput className='w-1/2 p-2 border-b border-gray-300' placeholder='Thakurgaon Sadar'/>
                        <TextInput className='w-1/2 p-2 border-b border-gray-300' placeholder='Thakurgaon'/>
                    </HStack>
                    {show && <DateTimePicker 
                                value={date}
                                onChange={onChange}
                    />}
                    <TouchableOpacity className='p-2 bg-blue-400 rounded-md' onPress={()=>console.log('')}>
                        <Text className='text-center text-white text-base'>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}