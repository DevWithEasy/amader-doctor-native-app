import AsyncStorage from "@react-native-async-storage/async-storage"

export default async function getToken(setToken) {
    try{
        const token = await AsyncStorage.getItem('token')
        setToken(token)
    }catch(err){
        console.log(err)
    }
}