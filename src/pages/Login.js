import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Button } from 'native-base'
import { useState } from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, addDoctor, loading } from '../store/slice/authSlice'
import { apiUrl } from '../utils/baseUrl'
export default function Login({navigation}){
    const isLoading = useSelector(state=>state.auth.isLoading)
    const dispatch = useDispatch()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    async function handleSignIn(){
        try {
            dispatch(loading(true))
            const res = await axios.post(`${apiUrl}/auth/signin`,{email,password})
            if(res.data.status === 200){
                dispatch(loading(false))

                dispatch(addAuth(res.data.data))
                await AsyncStorage.setItem('token',`Bearer ${res.data.data.token}`)
                navigation.navigate('Home')
            }
        } catch (error) {
            dispatch(loading(false))
            console.log(error);
        }
    }
    return(
        <View className='flex-1 items-center justify-center bg-gray-300'>
            <View className='p-4 w-10/12 rounded-md space-y-2 bg-white shadow-md'>
                <Image 
                    source={require('../../assets/images/splash.jpg')}
                    style={{ width: 100, height: 100 }}
                    className='mx-auto rounded-full'
                />

                <TextInput onChangeText={text=>setEmail(text)} className='p-2 border rounded border-gray-300' placeholder='Email or Mobile No'/>

                <TextInput onChangeText={text=>setPassword(text)} className='p-2 border rounded border-gray-300' placeholder='Password'/>

                <Button className='p-2 bg-blue-400 rounded-md' onPress={()=>handleSignIn()}>
                    Login
                </Button>

                <View className='p-2'>
                    <Text className='text-center'>You aren't an account ?</Text>
                    <Text className='text-center text-blue-400 text-base' onPress={()=>navigation.navigate('Signup')}>Create account</Text>
                </View>
            </View>
        </View>
    )
}