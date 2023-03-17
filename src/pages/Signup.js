import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
export default function Signup({navigation}){
    return(
        <View className='flex-1 items-center justify-center bg-gray-300'>
            <View className='p-4 w-10/12 rounded-md space-y-2 bg-white shadow-md'>
                <Image 
                    source={require('../../assets/images/splash.jpg')}
                    style={{ width: 100, height: 100 }}
                    className='mx-auto rounded-full'
                />
                <Text className='text-gray-500'>Create your account with easily.Please provide your correct information and verify your account.</Text>
                <TextInput className='p-2 border rounded border-gray-300' placeholder='Name'/>
                <TextInput className='p-2 border rounded border-gray-300' placeholder='Email address'/>
                <TextInput className='p-2 border rounded border-gray-300' placeholder='Mobile No'/>
                <TextInput className='p-2 border rounded border-gray-300' placeholder='Password'/>
                <TouchableOpacity className='p-2 bg-blue-400 rounded-md' onPress={()=>console.log('')}>
                    <Text className='text-center text-white text-lg'>Create account</Text>
                </TouchableOpacity>
                <View className='p-2'>
                    <Text className='text-center'>You have already an account ?</Text>
                    <Text className='text-center text-blue-400 text-base' onPress={()=>navigation.navigate('Login')}>Login</Text>
                </View>
            </View>
        </View>
    )
}