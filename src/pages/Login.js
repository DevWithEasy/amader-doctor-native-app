import { Button } from 'native-base'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
export default function Login({navigation}){
    return(
        <View className='flex-1 items-center justify-center bg-gray-300'>
            <View className='p-4 w-10/12 rounded-md space-y-2 bg-white shadow-md'>
                <Image 
                    source={require('../../assets/images/splash.jpg')}
                    style={{ width: 100, height: 100 }}
                    className='mx-auto rounded-full'
                />
                <TextInput className='p-2 border rounded border-gray-300' placeholder='Email or Mobile No'/>
                <TextInput className='p-2 border rounded border-gray-300' placeholder='Password'/>
                {/* <TouchableOpacity className='p-2 bg-blue-400 rounded-md' onPress={()=>navigation.navigate('Profile')}>
                    <Text className='text-center text-white text-lg'>Login</Text>
                </TouchableOpacity> */}
                <Button 
                    className='p-2 bg-blue-400 rounded-md'
                    onPress={()=>navigation.navigate('Profile')}
                >
                    Login
                </Button>
                <View className='p-2'>
                    <Text className='text-center'>You aren't an account ?</Text>
                    <Text className='text-center text-blue-400 text-base' onPress={()=>navigation.navigate('Signup')}>Create account</Text>
                </View>
            </View>
        </View>
    )
}