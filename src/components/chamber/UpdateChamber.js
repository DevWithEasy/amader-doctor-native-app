import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { HStack, Stack } from 'native-base';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addDoctor, refresh } from '../../store/slice/authSlice';
import { apiUrl } from '../../utils/baseUrl';
export default function UpdateChamber(props){
    const {chamber,update,setUpdate} =props
    const dispatch = useDispatch()
    const {user,doctor} = useSelector(state => state.auth)
    const [vanue,setVanue] = useState(chamber.vanue)
    const [location,setLocation] = useState(chamber.location)
    const [day,setDay] = useState(chamber.day)
    const [date, setDate] = useState(new Date(Date.now()));
    const [from,setFrom] = useState(chamber.from)
    const [to,setTo] = useState(chamber.to)
    const [fromView,setFromView]= useState(false)
    const [toView,setToView]= useState(false)

    const onFromChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        const hour = currentDate.getHours()
        const minute = currentDate.getMinutes()
        setFrom(`${hour}:${minute}`)
        setFromView(false);
    }
    const onToChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        const hour = currentDate.getHours()
        const minute = currentDate.getMinutes()
        setTo(`${hour}:${minute}`)
        setToView(false);
    }
    const data = {id : chamber.id,vanue,location,day,from,to}

    async function updateChamber(id,data){
        try {

            const res = await axios.put(`${apiUrl}/doctor/updateChamber/${id}`,
                data,
                {
                    headers : {
                        authorization : `Bearer ${user?.token}`
                    }
                }
            )

            if(res.data.status === 200){
                dispatch(addDoctor(res.data.data))
                setUpdate(!update)
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        <View className=''>
            <View className='bg-white space-y-2'>
                <TextInput
                    onChangeText={text=>setVanue(text)}
                    className='p-2 border-b border-gray-300 rounded-md'
                    placeholder='Vanue'
                    value={vanue}
                />
                <TextInput
                    onChangeText={text=>setLocation(text)}
                    className='p-2 border-b border-gray-300 rounded-md'
                    placeholder='Location'
                    value={location}
                />
                <View className='border-b border-gray-200 rounded-md'>
                    <Picker
                        selectedValue={day}
                        onValueChange={(itemValue, itemIndex) =>
                            setDay(itemValue)
                        }
                    >
                        <Picker.Item label='Select Day' value=''/>
                        <Picker.Item label='Saturday' value='Saturday'/>
                        <Picker.Item label='Sunday' value='Sunday'/>
                        <Picker.Item label='Monday' value='Monday'/>
                        <Picker.Item label='Tuesday' value='Tuesday'/>
                        <Picker.Item label='WednesDay' value='WednesDay'/>
                        <Picker.Item label='Thusday' value='Thusday'/>
                        <Picker.Item label='Friday' value='Friday'/>
                    </Picker>
                </View>
                <HStack className='space-x-2'>
                    <TouchableOpacity className='p-2 w-1/2 border-b border-gray-200 rounded-md' onPress={()=>setFromView(true)}>
                    <Text>{from ? from : 'Start time'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='p-2 w-1/2 border-b border-gray-200 rounded-md' onPress={()=>setToView(true)}>
                        <Text>{to ? to : 'End Time'}</Text>
                    </TouchableOpacity>
                </HStack>

                <Stack direction='row' className='justify-end gap-x-4 my-2 pr-2'>
                    <TouchableOpacity className='w-3/12 bg-gray-500 p-2 rounded-md' onPress={()=>setUpdate(!update)}>
                        {/* {isLoading ? 'Updating...' : 'Update'} */}
                        <Text className='text-white text-center'>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='w-3/12 bg-blue-500 p-2 rounded-md' onPress={()=>updateChamber(doctor._id,data)}>
                        {/* {isLoading ? 'Updating...' : 'Update'} */}
                        <Text className='text-white text-center'>Update</Text>
                    </TouchableOpacity>
                </Stack>

                {fromView && <DateTimePicker
                    value={date}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onFromChange}
                />}
                {toView && <DateTimePicker
                    value={date}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onToChange}
                />}
            </View>
        </View>
    )
}