import { Button } from 'native-base';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeAuth } from '../store/slice/authSlice';
import getToken from '../utils/getToken';

export default function Home({navigation}) {
    const [token,setToken] = useState()
    const dispatch = useDispatch()
    
    return (
        <View>
            <Image 
                source={require('../../assets/images/splash.jpg')}
                style={{ width: 200, height: 200 }}
            />
            <Button onPress={()=>dispatch(removeAuth())}>Logout</Button>
            {/* <Button onPress={()=>navigation.navigate('Verify Account')}>Verify</Button> */}
        </View>
    );
}
