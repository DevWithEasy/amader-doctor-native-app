import axios from "axios";
import { HStack, Heading } from "native-base";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { apiUrl } from "../utils/baseUrl";
import dateGenerator from "../utils/dateGenerator";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Button } from "react-native";
import icon from '../../assets/images/splash.png'

export default function AppointmentDetails({route}){
    const {id,token} = route.params
    const [appointment,setAppointment] = useState({})
    const [selectedPrinter, setSelectedPrinter] =useState();

    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body style="margin: 1rem;">
        <div
          style="display: flex;justify-content: center;align-items: center;width: 100%;"
        >
          <div
            style="text-align: center;"
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/002/896/807/original/female-doctor-using-her-digital-tablet-free-vector.jpg"
              alt="app_icon"
              style=" margin-left: auto; margin-right: auto; width: 4rem; height: 4rem; border-radius: 9999px;
              "
            />
            <h1 style="font-size: 2.25rem; font-weight: 700;">
              Amader Doctor
            </h1>
            <p style="color: #6B7280; font-style: italic;">
              Best solution of doctor appointment in Thakurgaon District.
            </p>
          </div>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <div>
            <p>
              <span>Appointment ID :</span>
              <span >${appointment?.appointmentId}</span>
            </p>
            <p>
              <span>Appointment Date :</span>
              <span > ${appointment?.appointmentDate} </span>
            </p>
          </div>
          <div
            style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));"
          >
            <p>
              <span>Patient Name :</span>
              <span >${appointment?.patientName}</span>
            </p>
            <p>
              <span>Mobile :</span>
              <span>${appointment?.patientPhone}</span>
            </p>
            <p>
              <span>Gender : </span>
              <span>${appointment?.gender}</span>
            </p>
            <p>
              <span>Age : </span>
              <span >${appointment?.age} Years</span>
            </p>
          </div>
        </div>
    
        <div>
          <table style="text-align: left; width: 100%; border: 1px solid #dfdfdf;">
            <thead style="background-color: #F3F4F6;">
              <tr>
                <th
                  scope="col"
                  style="padding-top: 0.75rem;padding-bottom: 0.75rem; padding-left: 1rem;padding-right: 1rem;"
                >
                  Appointment info
                </th>
                <th
                  scope="col"
                  style="padding-top: 0.75rem;padding-bottom: 0.75rem; padding-left: 1rem;padding-right: 1rem;"
                >
                  Consultation Fee
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style="background-color: #ffffff;">
                <td
                  style="padding-left: 1rem; padding-right: 1rem; padding-top: 1.25rem; padding-bottom: 1.25rem; margin-top: 0.5rem;"
                >
                  <span style="font-weight: 700;"
                    >Dr . ${appointment?.firstName} ${appointment?.lastName}</span
                  >
                  <br />
                  <br />
                  <span>${appointment?.vanue}</span>
                  <br />
                  <span>${appointment?.location}</span>
                </td>
                <td
                  style="padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 2.5rem; padding-bottom: 2.5rem;"
                >
                  <span>= ${appointment?.feesPerConsultation}/- Tk</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <p>Submited by : <span style>${appointment?.submitedBy}</span></p>
            <p>
              Submited on :
              <span>${dateGenerator(appointment?.createdAt)}</span
              >
            </p>
          </div>
        </div>
      </body>
    </html>    
    `
    const print = async () => {
    
      await Print.printAsync({
        html,
        printerUrl: selectedPrinter?.url, // iOS only
      });
    };

    const printToFile = async () => {
      // On iOS/android prints the given html. On web prints the HTML from the current page.
      const { uri } = await Print.printToFileAsync({ html });
      console.log('File has been saved to:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };
    const selectPrinter = async () => {
      const printer = await Print.selectPrinterAsync(); // iOS only
      setSelectedPrinter(printer);
    };

    async function getAppointmentDetails(id){
        const res = await axios.get(`${apiUrl}/appointment/details/${id}`,{
            headers : {
                authorization : token
            }
        })
        setAppointment(res.data.data)
    }
    useEffect(()=>{
        getAppointmentDetails(id)
    },[id])
    
    return(
        <ScrollView className='px-2 bg-white'>
            <View className='mb-10'>
                <Image 
                    source={require('../../assets/images/splash.png')}
                    style={{ width: 100, height: 100 }}
                    className='mx-auto'
                />
                <Heading className='text-2xl font-bold text-blue-400 text-center'>Amader Doctor</Heading>
                <Text className='text-center'>Best Solution of doctor appoinntment</Text>
            </View>
            <View className='mb-4 space-y-2'>
                <HStack>
                    <Text>Appointment Id : </Text>
                    <Text>{appointment?.appointmentId}</Text>
                </HStack>
                <HStack>
                    <Text>Appointment Date : </Text>
                    <Text>{appointment?.appointmentDate} ({appointment?.appointmentDay})</Text>
                </HStack>
                <HStack>
                    <Text>Patient Name : </Text>
                    <Text>{appointment?.patientName}</Text>
                </HStack>
                <HStack>
                    <Text>Patient Mobile : </Text>
                    <Text>{appointment?.phone}</Text>
                </HStack>
                <HStack>
                    <HStack className='w-1/2'>
                        <Text>Gender : </Text>
                        <Text>{appointment?.gender}</Text>
                    </HStack>
                    <HStack className='w-1/2'>
                        <Text>Age : </Text>
                        <Text>{appointment?.age} years</Text>
                    </HStack>
                </HStack>
            </View>
            <View className='my-4 border border-gray-300'>
                <HStack className='bg-gray-100'>
                    <Text className='w-8/12 text-center'>Appointment Info</Text>
                    <Text className='w-4/12 text-center'>Consultation Fee</Text>
                </HStack>
                <HStack className='p-2'>
                    <View className='w-8/12'>
                        <Text className='font-bold mb-2'>Dr. {appointment?.firstName} {appointment?.lastName}</Text>
                        <Text>{appointment?.vanue}</Text>
                        <Text>{appointment?.location}</Text>
                    </View>
                    <View className='w-4/12 flex-1 items-center justify-center'>
                        <Text>= {appointment?.feesPerConsultation} /- Tk</Text>
                    </View>
                </HStack>
            </View>
            <View>
                <HStack className='w-1/2'>
                    <Text>Submitted by : </Text>
                    <Text>{appointment?.submitedBy}</Text>
                </HStack>
                <HStack className='w-1/2'>
                    <Text>Submitted on : </Text>
                    <Text>{dateGenerator(appointment?.createdAt)}</Text>
                </HStack>
            </View>

            <HStack className='flex '>
              <TouchableOpacity onPress={print}>
                <Text>Print</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={printToFile}>
                <Text>Print and Share</Text>
              </TouchableOpacity>
              
            <View  />
              {Platform.OS === 'ios' && (
                <>
                  <View  />
                  <Button title="Select printer" onPress={selectPrinter} />
                  <View  />
                  {selectedPrinter ? (
                    <Text>{`Selected printer: ${selectedPrinter.name}`}</Text>
                  ) : undefined}
                </>
              )}
            </HStack>
        </ScrollView>
    )
}