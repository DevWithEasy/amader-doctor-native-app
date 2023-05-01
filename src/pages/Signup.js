import axios from 'axios'
import { useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { apiUrl } from '../utils/baseUrl'
import { Button, HStack, Spinner } from 'native-base'
export default function Signup({navigation}){
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    async function handleSignUp(){
        setLoading(true)
        try {
            const res = await axios.post(`${apiUrl}/auth/signup`,{name,email,phone,password})
            
            if(res.data.status === 200){
                setLoading(false)
                navigation.navigate('VerifyEmail')
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return(
        <ScrollView>
            <View className='h-screen flex-1 items-center  bg-white'>
                <View className='p-4 rounded-md space-y-2 bg-white'>
                    <Image 
                        source={require('../../assets/images/splash.jpg')}
                        style={{ width: 150, height: 150 }}
                        className='mx-auto rounded-full'
                    />

                    <Text className='text-gray-500'>Create your account with easily.Please provide your correct information and verify your account.</Text>

                    <TextInput onChangeText={text=>setName(text)} className='p-2 border rounded border-gray-300' placeholder='Name'/>

                    <TextInput onChangeText={text=>setEmail(text)} className='p-2 border rounded border-gray-300' placeholder='Email address'/>

                    <TextInput onChangeText={text=>setPhone(text)} className='p-2 border rounded border-gray-300' placeholder='Mobile No'/>

                    <TextInput onChangeText={text=>setPassword(text)} className='p-2 border rounded border-gray-300' placeholder='Password'/>

                    <Button className='p-2 bg-blue-400 rounded-md' onPress={()=>handleSignUp()}>
                        {loading ? 
                        <HStack className='space-x-2 items-center'>
                            <Spinner accessibilityLabel="Loading posts" color='white'/>
                            <Text className='text-white'>
                                Please wait...
                            </Text>
                        </HStack>
                        :'Create account'}
                    </Button>

                    <View className='p-2'>
                        <Text className='text-center'>You have already an account ?</Text>
                        <Text className='text-center text-blue-400 text-base' onPress={()=>navigation.navigate('Login')}>Login</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}