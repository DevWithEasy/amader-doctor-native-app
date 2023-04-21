import axios from "axios";
import { Stack } from "native-base";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addDoctor, refresh } from "../../store/slice/authSlice";
import { apiUrl } from "../../utils/baseUrl";

export default function DeleteChamber(props){
    const {chamber,CDelete,setCDelete} = props
    const dispatch = useDispatch()
    const {user,doctor} = useSelector(state => state.auth)

    async function deleteChamber(){
        try {
            const res = await axios.put(`${apiUrl}/doctor/deleteChamber/?dId=${doctor._id}&cId=${chamber.id}`,{},{
                headers : {
                    authorization : `Bearer ${user?.token}`
                }
            })

            if(res.data.status === 200){
                dispatch(addDoctor(res.data.data))
                setCDelete(!CDelete)
            }
        } catch (error) {
            console.log(error);
        }
    }


    return(
        <View className='absolute top-0 h-screen w-full flex-1 justify-center items-center z-10 bg-gray-200/50'>
            <View className='w-10/12 mx-auto shadow-2xl shadow-red-500 bg-white rounded-md'>
                <Text className='text-base font-bold border-b border-gray-300 p-1 text-red-500'>Are you sure ?</Text>
                <Text className='p-2 text-gray-500'>This data will be delte parmanently.you can't back this data after delete.</Text>
                <Stack direction='row' className='justify-end gap-x-2 mt-2 pr-2 pb-2'>
                    <TouchableOpacity className='w-3/12 bg-gray-500 p-2 rounded-md' onPress={()=>setCDelete(!CDelete)}>
                        <Text className='text-white text-center'>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='w-3/12 bg-red-500 p-2 rounded-md' onPress={()=>deleteChamber()}>
                        <Text className='text-white text-center'>Delete</Text>
                    </TouchableOpacity>
                </Stack>
            </View>
        </View>
    )
}