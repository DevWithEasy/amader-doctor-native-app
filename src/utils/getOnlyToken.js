import AsyncStorage from "@react-native-async-storage/async-storage"

export default async function getOnlyToken(setToken) {
    try{
        const token = await AsyncStorage.getItem('token')
        const words = token.split(" ")
        setToken(words[1])
    }catch(err){
        console.log(err)
    }
}