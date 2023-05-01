import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { removeAuth } from '../store/slice/authSlice';
import { Button, HStack } from 'native-base';

export default function Logout({navigation}) {
    const dispatch = useDispatch()
  return (
    <View className='h-screen flex-1 justify-center items-center bg-white'>
      <View className='border border-red-300 p-4 space-y-4 rounded-lg '>
        <Text>Are you sure logout your accout</Text>
        <HStack className='flex justify-end gap-x-2'>
            <Button 
                onPress={()=>navigation.navigate('Home')}
                className='py-1.5 bg-blue-500'
            >
                Home
            </Button>
            <Button 
                onPress={()=>dispatch(removeAuth())}
                className='py-1.5 bg-red-500'
            >
                Logout
            </Button>
        </HStack>
      </View>
    </View>
  )
}