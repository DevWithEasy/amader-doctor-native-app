import axios from "axios";
import { Stack } from "native-base";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View,ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addAuth } from "../store/slice/authSlice";
import { apiUrl } from "../utils/baseUrl";
import getOnlyToken from "../utils/getOnlyToken";

export default function Notifiaction({navigation}) {
    const dispatch = useDispatch()
    const {notifications} = useSelector(state=>state.auth.user)
    const user = useSelector(state=>state.auth.user)
    const [readState,setReadState] = useState(false)
    const [token,setToken] = useState()

    async function seenNotification(data){
        const res = await axios.post(`${apiUrl}/auth/user/seenNotification`,data,{
            headers :{
                authorization : `Barear ${token}`
            }
        })
        if(res.data.status === 200){
            const user = res.data.data
            dispatch(addAuth({...user,token}))
        }
    }
    async function seenAllNotification(){
        const res = await axios.post(`${apiUrl}/auth/user/seenAllNotification`,{},{
            headers :{
                authorization : `Barear ${token}`
            }
        })
        if(res.data.status === 200){
            const user = res.data.data
            dispatch(addAuth({...user,token}))
        }
    }

    async function deleteAllNotification(){
        const res = await axios.post(`${apiUrl}/auth/user/deleteAllNotification`,{},{
            headers :{
                authorization : `Barear ${token}`
            }
        })
        if(res.data.status === 200){
            const user = res.data.data
            dispatch(addAuth({...user,token}))
        }
    }

    useEffect(()=>{
        getOnlyToken(setToken)
    })

    return(
        <ScrollView className='h-screen bg-gray-100'>
            <View className='px-2 pt-2 space-y-2'>
            <Stack direction='row' className='border-b justify-between border-gray-200 pb-2'>
                <Stack direction='row' space={2}>
                    <TouchableOpacity onPress={()=>setReadState(!readState)} className={!readState ? 'p-2 border-b-2 border-blue-500 hover:text-blue-500' : 'p-2 border-b-2 border-white hover:text-blue-500'}>
                        <Text className=' text-center'>unRead</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setReadState(!readState)} className={readState ? 'p-2 border-b-2 border-blue-500 hover:text-blue-500' : 'p-2 border-b-2 border-white hover:text-blue-500'}>
                        <Text className='text-center'>Read</Text>
                    </TouchableOpacity>
                </Stack>
                {!readState && <TouchableOpacity className='p-2 px-4  rounded-md' onPress={()=>seenAllNotification()}>
                        <Text className='text-center'>Mark all Read</Text>
                </TouchableOpacity>}
                {readState && <TouchableOpacity className='p-2 px-4  rounded-md' onPress={()=>deleteAllNotification()}>
                        <Text className='text-center'>Delete all</Text>
                </TouchableOpacity>}
            </Stack>

            <View className='space-y-1'>
                {
                    notifications && !readState && notifications.filter(notification=>notification.status === 'unread').map((notification,i)=><TouchableOpacity
                        key={i} 
                        onPress={()=>navigation.navigate(
                            notification.onClickPath === '/appointments' ?
                             'Appointments' : 
                             'All Appointments Search',{
                                day :notification?.day,date : notification?.date,token
                            }
                        )}
                        className='block w-full p-2 border border-gray-300 rounded'
                    >
                        <Text>{notification?.message}</Text>
                    </TouchableOpacity>)
                }

                {
                    notifications && readState && notifications.filter(notification=>notification.status === 'read').map((notification,i)=><TouchableOpacity
                        key={i} 
                        onPress={()=>navigation.navigate(
                            notification.onClickPath === '/appointments' ?
                             'Appointments' : 
                             'All Appointments Search',{
                                day :notification?.day,date : notification?.date,token
                            }
                        )} 
                        className='block w-full p-2 border border-gray-300 rounded'
                    >
                        <Text>{notification?.message}</Text>
                    </TouchableOpacity>)
                }
            </View>
            </View>
        </ScrollView>
    )
}