import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { VStack } from "native-base";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Doctor from "../components/Doctor";
import { apiUrl } from "../utils/baseUrl";


export default function Doctors({navigation}){
    const [specialist,setSpecialist] = useState('')
    const [allDoctors,setAllDoctors] = useState([])
    const [doctors,setDoctors] = useState([])
    async function getAllActiveDoctors(){
        try{
            const res = await axios.get(`${apiUrl}/doctor/allApprovedDoctors`)
            setAllDoctors(res.data.data)
            setDoctors(res.data.data)
        }catch(err){
            console.log(err);
        }
    }

    function findSpecialist(value){
        if(!value){
            setDoctors(allDoctors)
            setSpecialist('')
        }else{
            const doctors = allDoctors.filter(doctor => doctor.specialization === value)
            setDoctors(doctors)
            setSpecialist(value)
        }
        
    }

    useEffect(()=>{
        getAllActiveDoctors()
    },[navigation])
    
    return(
        <ScrollView className='bg-gray-200 mx-2 mt-2 space-y-2'>
            <View className='flex-1 justify-end bg-white rounded-md'>
                <Picker
                    selectedValue={specialist}
                    onValueChange={(itemValue, itemIndex) =>
                        findSpecialist(itemValue)
                    }
                    >
                    <Picker.Item label="Select specialist" value="" />
                    {allDoctors && allDoctors.map(doctor=><Picker.Item 
                        key={doctor._id} 
                        label={doctor.specialization} value={doctor.specialization} 
                    />)}
                </Picker>
            </View>
            <VStack space='2' className=''>
                {doctors && doctors.map(doctor=><Doctor key={doctor?._id} {...{doctor,navigation}}/>)}
            </VStack>
        </ScrollView>
    )
}