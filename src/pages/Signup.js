import axios from 'axios'
import { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { apiUrl } from '../utils/baseUrl'
export default function Signup({navigation}){
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')
    async function handleSignUp(){
        try {
            const res = await axios.post(`${apiUrl}/auth/signup`,{name,email,phone,password})
            console.log(res.data)
            if(res.data.status === 200){
                navigation.navigate('VerifyEmail')
            }
        } catch (error) {
            console.log(error)
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

                <Text className='text-gray-500'>Create your account with easily.Please provide your correct information and verify your account.</Text>

                <TextInput onChangeText={text=>setName(text)} className='p-2 border rounded border-gray-300' placeholder='Name'/>

                <TextInput onChangeText={text=>setEmail(text)} className='p-2 border rounded border-gray-300' placeholder='Email address'/>

                <TextInput onChangeText={text=>setPhone(text)} className='p-2 border rounded border-gray-300' placeholder='Mobile No'/>

                <TextInput onChangeText={text=>setPassword(text)} className='p-2 border rounded border-gray-300' placeholder='Password'/>

                <TouchableOpacity className='p-2 bg-blue-400 rounded-md' onPress={()=>handleSignUp()}>
                    <Text className='text-center text-white text-lg'>Create account</Text>
                </TouchableOpacity>

                <View className='p-2'>
                    <Text className='text-center'>You have already an account ?</Text>
                    <Text className='text-center text-blue-400 text-base' onPress={()=>navigation.navigate('Login')}>Login</Text>
                </View>
            </View>
        </View>
    )
}