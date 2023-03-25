export default function getAMPM(time){
    const time24 = time
    const [hour, minute] = time24.split(":");
    const date = new Date();
    date.setHours(hour, minute);
    const time12 = date.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
    
    return time12
}