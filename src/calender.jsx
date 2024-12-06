import { useState } from "react";

const today = new Date();
const thisDate = today.getDate()
const thisMonth = today.getMonth()
const thisYear = today.getFullYear()

// 製作月曆序列先做處日數接這在前方插入空格 來對齊星期
function createMonth(calender){
    let monthArr = new Array(calender.daysOfMonth).fill(0).map((element, index) => {
         element = {
            date:index + 1,
            hasMission:false
        }
        if(calender.missionDate.includes(element.date)) element.hasMission = true
         return element
    })   
    
    let emptyObject = new Array(calender.firstDayOfMonth).fill(0).map(element => element = { date: ".", hasMission: false })
    monthArr.unshift(...emptyObject);    
    console.log(monthArr)
    return monthArr
}

// 計算該月份第一天是周幾何這個月有幾天
function getMonthInfo(year,month){
    let daysOfMonth = new Date(year, month, 1).getDay()
    let dateOfMonth = new Date(year, month + 1, 0).getDate()
    let missionsInLocalStorage = JSON.parse(localStorage.getItem("missions"))
    let allMissionDate = []
    let thisMonthMissionDate = []

    if(missionsInLocalStorage){
        allMissionDate = missionsInLocalStorage.map((item)=>{
            return item.date
        })
    }
    console.log(`u got mission in these days`,allMissionDate)
    thisMonthMissionDate = allMissionDate.filter((item)=>{
        return item.slice(0,7)===`${year}-${(month + 1 ).toString().padStart(2,0)}`
    })
    thisMonthMissionDate = thisMonthMissionDate.map(item=>Number (item.slice(8)))

    console.log(`thisMonth`,thisMonthMissionDate)

    let monthInfo = {firstDayOfMonth:daysOfMonth, daysOfMonth:dateOfMonth, missionDate:thisMonthMissionDate}
    return createMonth(monthInfo)
}

function CreateCalender(){
    let initialCalender = getMonthInfo(thisYear,thisMonth)

    const [calender,setCalender] = useState({year:thisYear,month:thisMonth,calenderArr:initialCalender})

    function handleMonthUpdate(direction){
       setCalender((prev)=>{
        let newYear , newMonth;
        let answer = prev
            if(direction === "decresc"){
                if(prev.month === 0) {
                    newYear=prev.year-1;
                    newMonth=11
                }else{
                    newYear=prev.year;
                    newMonth=prev.month-1
                }
            }else{
                if(prev.month === 11) {
                    newYear=prev.year+1;
                    newMonth=0
                }else{
                    newYear=prev.year;
                    newMonth=prev.month+1
                }
            }
            answer={year:newYear,month:newMonth,calenderArr:getMonthInfo(newYear,newMonth)}
            return answer
        }
       )
    }

    return (
        <div className="m-1 bg-slate-100 border-slate-500 p-2 border-2 rounded h-96 flex flex-col items-center gap-3">
            <div className="flex items-center tracking-widest">
                <button onClick={()=>handleMonthUpdate("decresc")} className="border-2 w-8 h-8 flex justify-center items-center">
                    <div className="rotate-45 w-2 h-2 border-slate-500 border-l-2 border-b-2"></div>
                </button>
                <h1>{calender.year} 年 {calender.month+1} 月</h1>
                <button onClick={()=>handleMonthUpdate("increase")} className="border-2 w-8 h-8 flex justify-center items-center">
                    <div className="-rotate-45 w-2 h-2 border-slate-500 border-r-2 border-b-2"></div>
                </button>
            </div>
            <div className="w-full">
                <div className="grid grid-cols-7 text-center border-8">
                    <p>日</p><p>一</p><p>二</p><p>三</p><p>四</p><p>五</p><p>六</p>
                </div>
                <div className="grid grid-cols-7 border-8 text-center p-2">
                    {calender.calenderArr.map((element,index) =>{
                        return (
                            <div className={`
                                w-10 h-10 flex justify-center items-center 
                                ${element.hasMission && "font-black text-orange-500 underline underline-offset-2"}
                                ${element.date === thisDate && calender.month === thisMonth && calender.year === thisYear ? "ring-2 rounded-full":null}`} 
                                key={index}>{element.date}</div>
                        )
                       })
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateCalender