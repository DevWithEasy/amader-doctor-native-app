export default function selectedDay(selected,chambers,setChamber,ToastAndroid){
    const date = new Date(selected);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[date.getDay()];
    const days = chambers.map(chamber=> chamber.day)
    const day = days.find(day => day === dayName)
    const chamber = chambers.find(chamber=>chamber.day === day)
    if(day === undefined){
        setChamber({})
        // toast.show({
        //     title: "Select Correct Weekday",
        //     variant: "subtle",
        //     description: "Please select a date from calender chamber list day name available",
        //     isClosable: true
        // })
        ToastAndroid.showWithGravity(
            'Please select a date from calender chamber list day name available',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
    }else{
        setChamber({...chamber,date : date.toLocaleDateString()}) 
    }
}