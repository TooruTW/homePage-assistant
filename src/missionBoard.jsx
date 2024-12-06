import { useState, useRef,useEffect } from "react";

const today = new Date();
const thisDate = today.getDate().toString().padStart(2,"0")
const thisMonth = (today.getMonth()+1).toString().padStart(2,"0")
const thisYear = today.getFullYear().toString()
const thisHour = today.getHours().toString().padStart(2,"0")
const thisMinute = today.getMinutes().toString().padStart(2,"0")

const todayInformed = `${thisYear}-${thisMonth}-${thisDate}`
const inputStyling = `
                    tracking-wide 
                    font-bold text-xl 
                    pb-2 bg-transparent 
                    text-sm
                    focus:outline-none
                    focus:border-b-2
                    focus:border-sky-500 
                    hover:border-b-2 hover:no-underline
                    `

let order = true
console.log(thisDate,thisMonth,thisYear,todayInformed,thisHour,thisMinute)

function deadLineCalc(theDay){
    let d = new Date(theDay.replaceAll("-",",")) 
    let result =Math.ceil((d - today)/1000/60/60/24)

    if(result === 0)result = `Today`
    if(result === 1)result = `Tomorrow`
    if(result < 0 ) result = `Expired`

    return result
}



class Mission{
    constructor(title,object,objectInfo,content,date,time){
        this.key=`${date}-${title}`
        this.title = title;
        this.object = object;
        this.objectInfo = objectInfo;
        this.content = content;
        this.date = date;
        this.time = time;
        this.hidden = true;
    }
}

function MissionBoard(){

    function getLocalStorage(){
        const missionsInLocalStorage = JSON.parse(localStorage.getItem("missions"))
        return missionsInLocalStorage ? missionsInLocalStorage:[]
    }

    const [missions, setMissions] = useState(getLocalStorage())

    const title = useRef(null)
    const object = useRef(null)
    const information = useRef(null)
    const content = useRef(null)
    const date = useRef(null)
    const time = useRef(null)

    // LocalStorage
   
    function setLocalStorage(missions){
        localStorage.setItem("missions",JSON.stringify(missions))
        // console.log(`save to localstorage`, missions)
    }

    useEffect(()=>{
        getLocalStorage()
    },[])

    useEffect(()=>{
        setLocalStorage(missions)
    },[missions])


    function sortMissions(){
        let sortedMissions
        if(order){
            sortedMissions = [...missions].sort((a,b)=> new Date(a.date) - new Date(b.date))
        }else{
            sortedMissions = [...missions].sort((a,b)=> new Date(b.date) - new Date(a.date))
        }
        order = !order
        setMissions(sortedMissions)
        console.log(`sort`,missions)
    }

    function handleAdding(){
        let newMission = new Mission(
            title.current ? title.current.value:null,
            object.current ? object.current.value:null,
            information.current ? information.current.value:null,
            content.current ? content.current.value:null,
            date.current ? date.current.value:null,
            time.current ? time.current.value:null
        )
        setMissions([...missions,newMission])

        title.current.value = `Title`;
        object.current.value= ``;
        information.current.value=``;
        content.current.value=``;
        date.current.value= todayInformed;
        time.current.value=``;
    }

    function handleDelete(itemKey){
        setMissions(missions.filter((item)=>{
            return item.key !== itemKey
        }))
    }

    return (
        <div className="overflow-y-scroll snap-y max-h-full">
            <div id="add">
                <div name="card-container" className="border m-1 px-2 border-8 rounded h-14 overflow-hidden hover:h-auto">

                    <div name="card-main" className="flex justify-between">
                        <input ref={title} type="text" defaultValue ="Title" className={`underline underline-offset-4 ${inputStyling} text-lg w-auto`} required/>
                        <button onClick={sortMissions} className="underline rounded border-2 mt-1 py-0 px-2 text-lg w-auto bg-gray-400  tracking-wide font-bold ">sort</button>
                    </div>

                    <div name="card-detail" className="mt-2">

                        <div name="date-n-control" className="bg-inherit">
                            <div name="time&date" className="flex gap-8 mb-1">
                                <input type="date" ref={date} className="w-full text-sm rounded text-center" defaultValue={todayInformed}  />
                                <input type="time" ref={time} className="w-full text-sm rounded text-center"/>
                            </div>
                        </div>

                        <div name="detail-content" className="bg-gray-200">
                            <div name="receiver">
                                <input type="text" ref={object} className={`underline underline-offset-4 ${inputStyling} w-full`} required placeholder="Object" />
                                <input type="text" ref={information} className={`underline underline-offset-4 ${inputStyling} w-full`} required placeholder="Contact information"/>
                            </div>
                            <div name="content">
                                <input type="text" ref={content}  className={`${inputStyling} w-full`} placeholder="Content"/>
                            </div>
                            <div className="w-full flex justify-center">
                                <button name="save" onClick={handleAdding} className="text-center mb-1 py-1 bg-gray-500 w-1/2 rounded-full">Save</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div id="library">
                {
                    missions.map(item => {
                        return (
                        <div key={item.key}>
                        <div name="card-container" className="border m-1 px-2 border-8 rounded h-12 overflow-hidden hover:h-auto">
                            <div name="card-main" className=" flex justify-between" >
                                <div className="underline w-1/3 underline-offset-4 tracking-wide font-bold text-xl pb-2 bg-transparent">{item.title}</div>
                                <div className= {`w-1/3 text-right tracking-wide font-bold text-xl pb-2 bg-transparent 
                                    ${deadLineCalc(item.date).length >3? "text-amber-600 underline underline-offset-4 ":"black"}
                                    `} >{deadLineCalc(item.date)}</div>
                            </div>
        
                            <div name="card-detail" className={`bg-gray-800`}>
        
                                <div name="date-n-control" className="bg-gray-500">
                                    <div name="time&date" className="flex gap-8">
                                        <p className="w-full text-sm"><span>{item.date}</span> <span>{item.time}</span></p>
                                    </div>
                                </div>
        
                                <div name="detail-content" className="bg-gray-200 col-span-2">
                                    <div name="receiver">
                                        <p className={`tracking-wide font-bold text-m pb-2 bg-transparent`}>object: <span>{item.object}</span> <span>{item.information}</span> </p>
                                    </div>
                                    <div name="content">
                                        <p className={`tracking-wide text-m pb-2 bg-transparent`}>{item.content}</p>
                                    </div>
                                    <button name="delete" onClick={()=>{handleDelete(item.key)}} className="text-center w-full">Delete</button>
                                </div>
        
        
                            </div>
                        </div>
                    </div>
                    )})
                }



            </div>
        </div>
    )
}



export default MissionBoard