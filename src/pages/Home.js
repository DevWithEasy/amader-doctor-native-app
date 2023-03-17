import React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native';

export default function Home({navigation}) {
    
    return (
        <View>
            <Text>Home</Text>
            <Image 
                source={require('../../assets/images/splash.jpg')}
                style={{ width: 200, height: 200 }}
            />
        </View>
    );
}
