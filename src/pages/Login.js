import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Button, HStack, Spinner } from 'native-base'
import { useState } from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, addDoctor, loading } from '../store/slice/authSlice'
import { apiUrl } from '../utils/baseUrl'
export default function Login({navigation}){
    const isLoading = useSelector(state=>state.auth.isLoading)
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    async function handleSignIn(){
        try {
            setLoading(true)
            const res = await axios.post(`${apiUrl}/auth/signin`,{email,password})
            if(res.data.status === 200){
                setLoading(false)

                dispatch(addAuth(res.data.data))
                await AsyncStorage.setItem('token',`Bearer ${res.data.data.token}`)
                navigation.navigate('Home')
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }
    return(
        <View className='h-screen flex-1 items-center justify-center bg-white'>
            <View className='p-4 w-full rounded-md space-y-2'>
                <Image 
                    source={require('../../assets/images/splash.jpg')}
                    style={{ width: 150, height: 150 }}
                    className='mx-auto rounded-full'
                />

                <TextInput onChangeText={text=>setEmail(text)} className='p-2 border rounded border-gray-300' placeholder='Email or Mobile No'/>

                <TextInput onChangeText={text=>setPassword(text)} className='p-2 border rounded border-gray-300' placeholder='Password'/>

                <Button className='p-2 bg-blue-400 rounded-md' onPress={()=>handleSignIn()}>
                    {loading ? 
                    <HStack className='space-x-2 items-center'>
                        <Spinner accessibilityLabel="Loading posts" color='white'/>
                        <Text className='text-white'>
                            Please wait...
                        </Text>
                  </HStack>
                    :'Login'}
                </Button>

                <View className='p-2'>
                    <Text className='text-center'>You aren't an account ?</Text>
                    <Text className='text-center text-blue-400 text-base' onPress={()=>navigation.navigate('Signup')}>Create account</Text>
                </View>
            </View>
        </View>
    )
}