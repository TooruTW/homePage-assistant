import { useState } from "react"


function getTime(time){
    let currentHour = time.getHours().toString().padStart(2, '0')
    let currentMin = time.getMinutes().toString().padStart(2, '0')
    let currentSec = time.getSeconds().toString().padStart(2, '0') 
    return [currentHour,currentMin,currentSec]
}

function Clock(prop){
    const [time,setTime] = useState(["00","00","00"])
    setInterval(()=>{setTime(getTime(new Date()))},1000)
    return  <h1 className={prop.class}>{time[0]}:{time[1]}:{time[2]}</h1>
}

export default Clock