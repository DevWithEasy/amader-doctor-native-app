import axios from "axios";
import { Button, HStack,VStack, Spinner } from "native-base";
import { useState } from "react";
import { Text, View,TextInput,ToastAndroid, Modal, TouchableOpacity } from "react-native";
import { apiUrl, baseUrl } from "../utils/baseUrl";
import { Image } from "react-native";
import hiddenEmail from "../utils/hiddenEmail";
import Icon from "react-native-vector-icons/Ionicons";
import toast from "../utils/toast";

export default function ForgetPassword({navigation}) {
    const [finding,setFinding] = useState(false)
    const [sending,setSending] = useState(false)
    const [loading,setLoading] = useState(false)
    const [email,setEmail] = useState('')
    const [user,setUser] = useState({})
    async function handlefind(){
        if(!email){
            return toast(ToastAndroid,'Please enter an email.')
        }
        
        try {
            setLoading(true)
            const res = await axios.get(`${apiUrl}/auth/find?email=${email}`)
            if(res.data.status === 200){
                setUser(res.data.data)
                setEmail('')
                setFinding(res.data.find)
                setLoading(false)
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
    async function handleSendForget(){
        try {
            setLoading(true)
            const res = await axios.post(`${apiUrl}/auth/forget-password?email=${user.email}`)
            if(res.data.status === 200){
                setLoading(false)
                setSending(true)
            }
        } catch (error) {
            setLoading(false)
            setSending(false)
            if(error.response.data.message){
                toast(ToastAndroid,error.response.data.message)
            }else{
                toast(ToastAndroid,'Something went wrong')
            }
        }
    
    }

    return(
        <View className='h-screen bg-white p-2 flex-1 justify-center'>
            <View className='space-y-2'>
                <TextInput
                    onChangeText={text=>setEmail(text)} 
                    placeholder='Enter email or phone number' 
                    className='p-2 border border-gray-300 rounded-md'
                />
                <Button
                    onPress={()=>handlefind()}
                    className='bg-blue-500'
                >
                    {
                        loading ?
                        <HStack className='space-x-2 items-center'>
                            <Spinner accessibilityLabel="Loading posts" color='white'/>
                            <Text className='text-white'>
                                Please wait...
                            </Text>
                        </HStack> 
                        :
                        'Find Account'
                    } 
                </Button>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={finding}
                onRequestClose={() => {
                setFinding(!finding);
                }}>
                <View className='h-screen bg-slate-500/80 flex-1 justify-center'>
                    <View className='bg-white h-[280px] p-2 py-4 mx-4 rounded-md'>
                        {
                            !sending ? 
                            <View className='space-y-4'>
                                <VStack className='space-y-6 flex-col justify-center items-center'>
                                    <Image 
                                        source={{uri : `${baseUrl}${user?.image?.url}`}}
                                        className='w-28 h-28 rounded-full'
                                    />
                                    <View className='space-y-2'>
                                        <Text className='font-bold text-center'>{user?.name}</Text>
                                        <Text className='text-center'>{hiddenEmail(user?.email)}</Text>
                                    </View>
                                </VStack>                      
                                <HStack className='flex justify-center space-x-2'>
                                    <TouchableOpacity
                                        onPress={() => setFinding(!finding)}
                                        className='p-2 border border-red-500 rounded-md'
                                    >
                                        <Text className='text-red-500'>Not my account</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleSendForget()}
                                        className='p-2 border border-blue-500 rounded-md'
                                    >
                                        <Text className='text-blue-500'>Reset password</Text>
                                    </TouchableOpacity>
                                </HStack>
                            </View>
                            :
                            <View className='flex justify-center items-center'>
                                <Icon name='checkmark-circle-outline' size={30} color='#2563eb'/>
                                <Text className='font-bold text-xl text-blue-600 '>Successfull</Text>
                                <Text className='text-gray-500 text-center'>We have successfully send a mail to you email address.Please check this mail and reset your password and log in account.</Text>
                                <TouchableOpacity
                                    onPress={()=>navigation.navigate('Login')}
                                    className='mt-4 px-4 py-2 bg-blue-500 rounded-md'
                                >
                                    <Text className='text-white'>Go Login</Text>
                                </TouchableOpacity>

                            </View>
                        }
                        
                    </View>
                </View>
            </Modal>
        </View>
    )
}