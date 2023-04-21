import axios from "axios";
import { Button, Stack } from "native-base";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import AddChamber from "../../components/chamber/AddChamber";
import DeleteChamber from "../../components/chamber/DeleteChamber";
import UpdateChamber from "../../components/chamber/UpdateChamber";
import { apiUrl } from "../../utils/baseUrl";
import getAMPM from "../../utils/getAMPM";

export default function Chambers({navigation}){
    const {user,doctor,random} = useSelector(state => state.auth)
    const [chamber,setChamber] = useState({})
    const [add,setAdd] = useState(false)
    const [id,setId] = useState('')
    const [update,setUpdate] = useState(false)
    const [CDelete,setCDelete] = useState(false)
    
    return(
        <ScrollView>
            <View className='mx-4 mt-2 space-y-2 h-screen relative'>
                <Button
                    className='bg-blue-500 text-white'
                    onPress={()=>setAdd(!add)}
                    >
                        {!update ? 'Add Chamber' : 'Update Chamber' }
                </Button>
                {add && <AddChamber {...{add,setAdd}}/>}
                {update && <UpdateChamber {...{chamber,update,setUpdate}}/>}
                {CDelete && <DeleteChamber {...{chamber,CDelete,setCDelete}}/>}
                <View className='space-y-2'>
                    {
                        doctor.chambers && doctor.chambers.map(chamber=><View key={chamber.id} className='p-2 rounded bg-gray-50 space-y-0.5 shadow-md'>
                            <Text className='font-bold text-blue-500'>{chamber?.vanue}</Text>
                            <Text className=''>Location : {chamber?.location}</Text>
                            <Stack direction='row'  className=''>
                                <Text className=''>Day : </Text>
                                <Text className=''>{chamber?.day}</Text>
                            </Stack>
                            <Stack direction='row'  className=''>
                                <Text className=''>Time : </Text>
                                <Text className=''>{getAMPM(chamber?.from)} - {getAMPM(chamber?.to)}</Text>
                            </Stack>
                            <Stack direction='row' className='justify-end gap-x-2'>
                                <TouchableOpacity 
                                    className='w-3/12 p-2 bg-green-500 rounded-md'
                                    onPress={()=>{setUpdate(!update);setChamber(chamber)}}
                                >
                                    <Text className='text-white text-center'>Update</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className='w-3/12 p-2 bg-red-500 rounded-md'
                                    onPress={()=>{setCDelete(!CDelete);setChamber(chamber)}}
                                >
                                    <Text className='text-white text-center'>Delete</Text>
                                </TouchableOpacity>
                            </Stack>
                    </View>)
                    }
                </View>
            </View>
        </ScrollView>
    )
}