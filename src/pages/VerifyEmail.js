import axios from 'axios'
import { useEffect, useState } from 'react'
import { Image, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import { apiUrl } from '../utils/baseUrl'
import getToken from '../utils/getToken'
import toast from '../utils/toast'

export default function VerifyEmail({navigation}){
    const [token,setToken] = useState('')
    const [code,setCode] = useState('')
    const [loading,setLoading] = useState(false)
    const [sendAgainLoading,setsendAgainLoading] = useState(false)
    const [verified,setVerified] = useState(false)
    
    async function handleVerify(){
        if(!code){
            return toast(ToastAndroid,'Please enter verification code')
        }
        try {
            setLoading(true)
            const res = await axios.post(`${apiUrl}/auth/verify`,{code},{
                headers: {
                    authorization : token
                }
            })
            if(res.data.status === 200){
                setLoading(false)
                setVerified(true)
                setTimeout(()=>{
                    navigation.navigate('Login')
                },1000)
            }
        } catch (error) {
            setLoading(false)
            if(error.response.data.message){
                toast(ToastAndroid,error.response.data.message)
            }else{
                toast(ToastAndroid,'Something went wrong')
            }
        }

    }

    async function handleSendCodeAgain(){
        if(!token){
            return toast(ToastAndroid,'Please login first')
        }
        try {
            setsendAgainLoading(true)
            const res = await axios.post(`${apiUrl}/auth/sent-code-again`,{},{
                headers: {
                    authorization : token
                }
            })
            if(res.data.status === 200){
                setsendAgainLoading(false)
                toast(ToastAndroid,'Code sent Successfully.')
            }
        } catch (error) {
            setsendAgainLoading(false)
            if(error.response.data.message){
                toast(ToastAndroid,error.response.data.message)
            }else{
                toast(ToastAndroid,'Something went wrong')
            }
        }

    }

    useEffect(()=>{
        getToken(setToken)
    },[])
    return(
        <View className='flex-1 items-center justify-center bg-white'>
            <View className='p-4 w-10/12 rounded-md bg-white shadow-2xl border border-gray-200'>
                {
                    !verified ?
                    <View className='space-y-2'>
                        <Image 
                            source={require('../../assets/images/verify_account.png')}
                            style={{ width: 100, height: 100 }}
                            className='mx-auto rounded-full'
                        />

                        <Text className='text-gray-600 text-base'>Verification code :</Text>
                        <TextInput onChangeText={text=>setCode(text)} className='p-2 border rounded border-gray-300' placeholder='code'/>

                        <TouchableOpacity className='bg-blue-400 rounded-md p-3' onPress={()=>handleVerify()}>
                            <Text className='text-center text-white'>
                                {loading ? 'Verifying...' : 'Verify'}
                            </Text>
                        </TouchableOpacity>

                        <View className='flex items-end'>
                            <TouchableOpacity className='flex justify-end' onPress={()=>handleSendCodeAgain()}>
                                <Text className='text-blue-500 p-2'>
                                    {sendAgainLoading ? 'Sending...' :'Send code again'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View className='flex justify-center items-center'>
                        <Icon name='checkmark-circle-outline' size={30} color='#2563eb'/>
                        <Text className='font-bold text-xl text-blue-600 '>Verified</Text>
                        <Text className='text-gray-500 text-center'>Your account successfully verified.</Text>
                    </View>
                }
            </View>
        </View>
    )
}