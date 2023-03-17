import axios from "axios";
import { View, VStack } from "native-base";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Doctor from "../components/Doctor";
import { apiUrl } from "../utils/baseUrl";


export default function Doctors({navigation}){
    const [doctors,setDoctors] = useState([])
    async function getAllActiveDoctors(){
        try{
            const res = await axios.get(`${apiUrl}/doctor/allApprovedDoctors`)
            setDoctors(res.data.data)
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getAllActiveDoctors()
    },[])
    return(
        <ScrollView>
            <VStack space='4' className='mx-4 my-2'>
                {doctors && doctors.map(doctor=><Doctor key={doctor?._id} {...{doctor,navigation}}/>)}
            </VStack>
        </ScrollView>
    )
}