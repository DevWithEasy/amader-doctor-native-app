import { Button, HStack } from "native-base"
import { useEffect, useState } from "react"
import { Text, TextInput, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { addDoctor } from "../../store/slice/authSlice"

export default function Information(){
    const dispatch = useDispatch()
    const {user,doctor,random} = useSelector(state => state.auth)
    const [firstName,setFirstName] = useState(doctor?.firstName)
    const [lastName,setLastName] = useState(doctor?.lastName)
    const [email,setEmail] = useState(doctor?.email)
    const [phone,setPhone] = useState(doctor?.phone)
    const [website,setWebsite] = useState(doctor?.website)
    const [education,setEducation] = useState(doctor?.education)
    const [specialization,setSpecialization] = useState(doctor?.specialization)
    const [experienceArea,setExperienceArea] = useState(doctor?.experienceArea)
    const [experience,setExperience] = useState(doctor?.experience)
    const [feesPerConsultation,setFeesPerConsultation] = useState(doctor?.feesPerConsultation)
    const [workedAt,setWorkedAt] = useState(doctor?.workedAt)
    const [designation,setDesignation] = useState(doctor?.designation)

    return(
        <View className='mx-4 mt-2'>
            {/* <Text className='text-center text-lg font-bold'>Professional Information</Text> */}
            <View className='space-y-1 p-2 bg-white rounded-md'>
                <HStack className='space-x-2'>
                    <TextInput
                        onChangeText={text=>setFirstName(text)} 
                        className='w-1/2 p-2 border-b border-gray-300 rounded-md' 
                        placeholder='First name'
                        value={firstName}
                        />
                    <TextInput
                        onChangeText={text=>setLastName(text)} 
                        className='w-1/2 p-2 border-b border-gray-300 rounded-md' 
                        placeholder='Last name'
                        value={lastName}
                        />
                </HStack>
                <TextInput
                    onChangeText={text=>setEmail(text)}
                    className='p-2 border-b border-gray-300 rounded-md'
                    placeholder='Email Address'
                    value={email}
                />
                <TextInput
                    onChangeText={text=>setPhone(text)}
                    className='p-2 border-b border-gray-300 rounded-md'
                    placeholder='Phone number'
                    value={phone}
                />
                <TextInput
                    onChangeText={text=>setWebsite(text)}
                    className='p-2 border-b border-gray-300 rounded-md'
                    placeholder='website address'
                    value={website}
                />
                <TextInput
                    onChangeText={text=>setEducation(text)}
                    className='p-2 border-b border-gray-300 rounded-md'
                    placeholder='Education'
                    value={education}
                />
                <TextInput
                    onChangeText={text=>setSpecialization(text)}
                    className='p-2 border-b border-gray-300 rounded-md'
                    placeholder='Specialization'
                    value={specialization}
                />
                <TextInput
                    onChangeText={text=>setExperienceArea(text)}
                    className='p-2 border-b border-gray-300 rounded-md'
                    placeholder='Experience Area'
                    value={experienceArea}
                />
                
                <HStack className='space-x-2'>
                    <TextInput
                        onChangeText={text=>setExperience(text)} 
                        className='w-1/2 p-2 border-b border-gray-300 rounded-md' 
                        placeholder='Experience year'
                        value={experience}
                    />
                    <TextInput
                        onChangeText={text=>setFeesPerConsultation(text)} 
                        className='w-1/2 p-2 border-b border-gray-300 rounded-md' 
                        placeholder='Consultation fee'
                        value={feesPerConsultation}
                    />
                </HStack>
                <TextInput
                    onChangeText={text=>setDesignation(text)}
                    className='p-2 border-b border-gray-300 rounded-md'
                    placeholder='Designation'
                    value={designation}
                />
                <TextInput
                    onChangeText={text=>setWorkedAt(text)}
                    className='p-2 border-b border-gray-300 rounded-md'
                    placeholder='Worked At'
                    value={workedAt}
                />
                <Button className='bg-blue-400 text-white'>Update</Button>
            </View>
        </View>
    )
}