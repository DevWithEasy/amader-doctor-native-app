import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { apiUrl } from "../utils/baseUrl";

export default function AppointmentsAllPatientSeach({route,navigation}) {

    const [appointments,setAppointments] = useState([])
    
    async function getAppointments(){
        try{
            const res = await axios.get(`${apiUrl}/appointment/all/search?day=${route.params.day}&date=${route.params.date}`,{
                headers : {
                    authorization : `Barear ${route.params.token}`
                }
            });

            setAppointments(res.data.data);
        }catch(err){
            console.log(err);
        }
        
    }
    useEffect(()=>{
        getAppointments()
    },[])

    console.log(appointments);
    return(
        <ScrollView className='mx-2 mt-2'>

        </ScrollView>
        
    )
}