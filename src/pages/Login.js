import axios from 'axios'
import { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {apiUrl} from '../utils/baseUrl'
export default function Login({navigation}){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    async function handleSignIn(){
        try {
            const res = await axios.post(`${apiUrl}/auth/signin`,{email,password})
            
            console.log(res.data);
        } catch (error) {
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

                <TouchableOpacity className='p-2 bg-blue-400 rounded-md' onPress={()=>handleSignIn()}>
                    <Text className='text-center text-white text-lg'>Login</Text>
                </TouchableOpacity>

                <View className='p-2'>
                    <Text className='text-center'>You aren't an account ?</Text>
                    <Text className='text-center text-blue-400 text-base' onPress={()=>navigation.navigate('Signup')}>Create account</Text>
                </View>
            </View>
        </View>
    )
}