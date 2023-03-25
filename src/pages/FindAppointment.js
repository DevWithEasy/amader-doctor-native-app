import { Picker } from "@react-native-picker/picker";
import axios from 'axios';
import { useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Doctor from "../components/Doctor";
import { apiUrl } from '../utils/baseUrl';

export default function FindAppointment({navigation}) {
    const toast = useToast()
    const [doctors,setDoctors] = useState([])
    const [specializations,setSpecializations] = useState([])
    const [specialist,setSpecialist] = useState('')
    async function getAllActiveSpecialistDoctors(){
        try{
            const res = await axios.get(`${apiUrl}/doctor/specialist`)
            setSpecializations(res.data.data)
        }catch(err){
            console.log(err);
        }
    }

    async function getAllActiveSpecialist(){
        if(!specialist){
            toast.show({
                title: "No specialist select",
                placement: "bottom"
              })
        }else{
            try {
                const res = await axios.get(`${apiUrl}/doctor/find/specialist?specialist=${specialist}`)
                setDoctors(res.data.data)
            } catch (error) {
                console.log(error);
            }
        }
    }
    useEffect(()=>{
        getAllActiveSpecialistDoctors()
    },[])
    
    return(
        <ScrollView className='px-4 pt-2 bg-gray-200'>
            <View className='bg-white p-2 space-y-2 rounded-md'>
                <View className='border-b border-gray-200 rounded-md'>
                        <Picker
                            selectedValue={specialist}
                            onValueChange={(itemValue, itemIndex) =>
                                setSpecialist(itemValue)
                            }
                        >
                            <Picker.Item label='Select specialization' value=''/>
                            {
                                specializations && specializations.map((doctor,i)=><Picker.Item
                                    key={i}
                                    label={doctor}
                                    value={doctor}
                                 />)
                            }
                        </Picker>
                </View>
                <TouchableOpacity className='p-2 bg-blue-500 rounded-md' onPress={()=>getAllActiveSpecialist()}>
                    <Text className='text-white text-center'>Search</Text>
                </TouchableOpacity>
            </View>
            
            {doctors.length > 0 && <VStack space='2' className='my-2'>
                <Text className='text-right pr-2'>We are found {doctors.length} doctors</Text>
                {doctors.map(doctor=><Doctor key={doctor?._id} {...{doctor,navigation}}/>)}
            </VStack>}

        </ScrollView>
    )
}