import axios from 'axios'
import { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { apiUrl } from '../utils/baseUrl'
export default function VerifyEmail({navigation}){
    const [code,setCode] = useState('')
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
                    source={require('../../assets/images/verify_account.png')}
                    style={{ width: 100, height: 100 }}
                    className='mx-auto rounded-full'
                />

                <Text className='text-gray-600 text-base'>Verification code :</Text>
                <TextInput onChangeText={text=>setCode(text)} className='p-2 border rounded border-gray-300' placeholder='code'/>

                <TouchableOpacity className='bg-blue-400 rounded-md p-3' onPress={()=>handleSignIn()}>
                    <Text className='text-center text-white'>Verify</Text>
                </TouchableOpacity>

                <View className='p-2'>
                    <Text className='text-center'>You aren't an account ?</Text>
                    <Text className='text-center text-blue-400 text-base' onPress={()=>navigation.navigate('Signup')}>Create account</Text>
                </View>
            </View>
        </View>
    )
}