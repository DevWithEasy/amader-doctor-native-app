import { Box, Heading } from 'native-base';
import React, { useEffect } from 'react';
import { Image, Text } from 'react-native';
function Splash({navigation}) {
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Main');
        },3000)
    })
    return (
        <Box className='flex-1 justify-center items-center h-screen bg-white'>
            <Image 
                source={require('../../assets/images/splash.jpg')}
                style={{ width: 200, height: 200 }}
            />
            <Heading className='text-4xl font-bold text-blue-400'>Amader Doctor</Heading>
            <Text>Get an appointment just one Click</Text>
        </Box>
    );
}

export default Splash;