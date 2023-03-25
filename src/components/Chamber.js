import { Stack } from "native-base";
import { Text, View } from "react-native";
import getAMPM from "../utils/getAMPM";

export default function Chamber({chamber}){
    
    return(
        <View className='my-1 p-2 rounded bg-gray-50 space-y-0.5'>
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
        </View>
    )
}