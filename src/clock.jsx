import { useState,useEffect } from "react"


function getTime(time){
    let currentHour = time.getHours().toString().padStart(2, '0')
    let currentMin = time.getMinutes().toString().padStart(2, '0')
    return [currentHour,currentMin]
}

function Clock(){
    const [time,setTime] = useState(`initial`)
    useEffect(()=>{
        setTime(getTime(new Date()))
    },[])
    setInterval(()=>{setTime(getTime(new Date()))},6000)
    return  <h1 className="text-8xl my-10 px-6 text-amber-600 bg-amber-50 rounded-full">{time[0]}:{time[1]}</h1>
}

export default Clock