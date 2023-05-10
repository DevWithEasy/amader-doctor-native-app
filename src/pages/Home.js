import React from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { carouselData, servicesData } from '../../assets/home_carousel_data';
import Carousel from 'react-native-reanimated-carousel';

export default function Home({navigation}) {
    const width = Dimensions.get('window').width;
    const last = servicesData.length
    return (
        <ScrollView className='bg-white px-2'>
            {/* --------------hero section--------------- */}
            <ImageBackground 
                source={require('../../assets/images/appointment.jpg')} 
                className='relative flex-1 bg-cover h-40 rounded-md'>
                <View className='absolute flex-1 flex-col justify-between w-full h-full bg-blue-500/80 rounded-md pb-4 pt-1'>
                    <Text className='text-center font-bold text-xl text-white w-11/12 mx-auto rounded-tl-full rounded-br-full py-2'>Find and Get appointment</Text>
                    <Text className='text-center italic text-gray-200 text-xs'>From anytime and anywhere</Text>
                    <View className='flex justify-center items-center'>
                        <TouchableOpacity
                            onPress={()=> navigation.navigate('Find Appointment')}
                            className='mt-2 px-2 py-1.5 w-44 bg-white rounded-full'
                        >
                            <Text className=' text-center flex flex-row justify-center items-center gap-x-2 shadow-lg'>
                                <Icon name='search-outline' size={14}/>
                                Find Appointment
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>

            {/* --------------slide carousel section--------------- */}
            <View className=''>
                <Carousel
                    loop
                    width={width}
                    height={width / 2.5}
                    autoPlay={true}
                    autoplayInterval={10000}
                    data={carouselData}
                    scrollAnimationDuration={5000}
                    renderItem={({ item,index }) => (
                        <View
                            style={{height:width / 3}}
                            className='flex-1 flex-row p-4  rounded-lg'
                        >
                            <View className='w-8/12'>
                                <Text className='font-bold text-blue-500'>
                                    {item?.subject}
                                </Text>
                                <Text className='text-gray-600'>
                                    {item?.details}
                                </Text>
                                {item.button && <TouchableOpacity
                                    onPress={()=> navigation.navigate(item?.page)}
                                    className='mt-2 px-2 py-1.5 bg-green-500 w-40 rounded-full'
                                >
                                    <Text className='text-white text-center'>{item?.page_title}</Text>
                                </TouchableOpacity>}
                            </View>
                            <View className='w-4/12 flex-1 justify-center '>
                                <Image source={item?.image} className='w-full h-28'/>
                            </View>
                        </View>
                    )}
                />
            </View>

            {/* --------------servive section--------------- */}
            <View className=' border rounded-md border-blue-500'>
                <Text className='bg-blue-500/90 text-white text-center p-2'>Services</Text>
                <View className='flex-1 flex-row flex-wrap justify-around'>
                    {
                        servicesData.map((service) =><TouchableOpacity
                            key={service.id}
                            onPress={()=> navigation.navigate(service?.page)} 
                            className={`w-[120px] bg-blue-50 rounded-lg m-2 space-y-2 p-2 grow shadow-md`}
                        >
                            <Image source={service?.image} className='w-16 h-16 mx-auto'/>
                            <Text className='text-blue-500 text-center'>{service?.title}</Text>
                        </TouchableOpacity> )
                    }
                </View>
            </View>
            
        </ScrollView>
    );
}
