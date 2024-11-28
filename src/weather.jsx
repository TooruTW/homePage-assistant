import { useEffect, useState } from "react"

let weeklyWeatherCode = new Map([
    ["宜蘭縣", "F-D0047-003"],
    ["桃園市", "F-D0047-007"],
    ["新竹縣", "F-D0047-011"],
    ["苗栗縣", "F-D0047-015"],
    ["彰化縣", "F-D0047-019"],
    ["南投縣", "F-D0047-023"],
    ["雲林縣", "F-D0047-027"],
    ["嘉義縣", "F-D0047-031"],
    ["屏東縣", "F-D0047-035"],
    ["台東縣", "F-D0047-039"],
    ["花蓮縣", "F-D0047-043"],
    ["澎湖縣", "F-D0047-047"],
    ["基隆市", "F-D0047-051"],
    ["新竹市", "F-D0047-055"],
    ["嘉義市", "F-D0047-059"],
    ["台北市", "F-D0047-063"],
    ["高雄市", "F-D0047-067"],
    ["新北市", "F-D0047-071"],
    ["台中市", "F-D0047-075"],
    ["台南市", "F-D0047-079"],
    ["連江縣", "F-D0047-083"],
    ["金門縣", "F-D0047-087"]]
)

const weatherTypeMap = new Map([
    [1, { weatherType: "晴天", picURL: "/element/weatherSvg/weather-sunny-svgrepo-com.svg" }],
    [2, { weatherType: "晴時多雲", picURL: "/element/weatherSvg/weather-partly-cloudy-day-svgrepo-com.svg" }],
    [3, { weatherType: "多雲時晴", picURL: "/element/weatherSvg/weather-partly-cloudy-day-svgrepo-com.svg" }],
    [4, { weatherType: "多雲", picURL: "/element/weatherSvg/weather-cloudy-svgrepo-com.svg" }],
    [5, { weatherType: "多雲時陰", picURL: "/element/weatherSvg/weather-cloudy-svgrepo-com.svg" }],
    [6, { weatherType: "陰天", picURL: "/element/weatherSvg/weather-cloudy-svgrepo-com.svg" }],
    [7, { weatherType: "短暫雨", picURL: "/element/weatherSvg/weather-drizzle-svgrepo-com.svg" }],
    [8, { weatherType: "陣雨", picURL: "/element/weatherSvg/weather-drizzle-svgrepo-com.svg" }],
    [9, { weatherType: "雷雨", picURL: "/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg" }],
    [10, { weatherType: "短暫雷陣雨", picURL: "/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg" }],
    [11, { weatherType: "雪", picURL: "/element/weatherSvg/weather-snowflake-svgrepo-com.svg" }],
    [12, { weatherType: "短暫雪", picURL: "/element/weatherSvg/weather-snow-svgrepo-com.svg" }],
    [13, { weatherType: "有霧", picURL: "/element/weatherSvg/weather-fog-svgrepo-com.svg" }],
    [14, { weatherType: "晨霧", picURL: "/element/weatherSvg/weather-fog-svgrepo-com.svg" }],
    [15, { weatherType: "多雲短暫雨", picURL: "/element/weatherSvg/weather-drizzle-svgrepo-com.svg" }],
    [16, { weatherType: "晴時多雲短暫雨", picURL: "/element/weatherSvg/weather-rain-showers-day-svgrepo-com.svg" }],
    [17, { weatherType: "多雲陣雨", picURL: "/element/weatherSvg/weather-rain-svgrepo-com.svg" }],
    [18, { weatherType: "晴時多雲陣雨", picURL: "/element/weatherSvg/weather-rain-showers-day-svgrepo-com.svg" }],
    [19, { weatherType: "多雲短暫雷陣雨", picURL: "/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg" }],
    [20, { weatherType: "晴時多雲短暫雷陣雨", picURL: "/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg" }],
    [21, { weatherType: "晴雷陣雨", picURL: "/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg" }],
    [22, { weatherType: "陣雨或雷雨後多雲", picURL: "/element/weatherSvg/weather-rain-svgrepo-com.svg" }],
    [23, { weatherType: "晴後雨", picURL: "/element/weatherSvg/weather-rain-showers-day-svgrepo-com.svg" }],
    [24, { weatherType: "雨後晴", picURL: "/element/weatherSvg/weather-rain-showers-day-svgrepo-com.svg" }],
    [25, { weatherType: "晴後陰", picURL: "/element/weatherSvg/weather-partly-cloudy-day-svgrepo-com.svg" }],
    [26, { weatherType: "陰後晴", picURL: "/element/weatherSvg/weather-partly-cloudy-day-svgrepo-com.svg" }],
    [27, { weatherType: "陰短暫雨", picURL: "/element/weatherSvg/weather-drizzle-svgrepo-com.svg" }],
    [28, { weatherType: "陰短暫雪", picURL: "/element/weatherSvg/weather-snow-svgrepo-com.svg" }],
    [29, { weatherType: "有雨或雪", picURL: "/element/weatherSvg/weather-rain-snow-svgrepo-com.svg" }],
    [30, { weatherType: "晴雨交替", picURL: "/element/weatherSvg/weather-rain-showers-day-svgrepo-com.svg" }],
    [31, { weatherType: "晴雪交替", picURL: "/element/weatherSvg/weather-hail-day-svgrepo-com.svg" }],
    [32, { weatherType: "暴風雪", picURL: "/element/weatherSvg/weather-snowflake-svgrepo-com.svg" }],
    [33, { weatherType: "積冰", picURL: "/element/weatherSvg/weather-snowflake-svgrepo-com.svg" }],
    [34, { weatherType: "有霧有短暫雨", picURL: "/element/weatherSvg/weather-drizzle-svgrepo-com.svg" }],
    [35, { weatherType: "有霧有短暫雪", picURL: "/element/weatherSvg/weather-snow-svgrepo-com.svg" }],
    [36, { weatherType: "多雲短暫雨或雪", picURL: "/element/weatherSvg/weather-rain-snow-svgrepo-com.svg" }],
    [37, { weatherType: "雷陣雨後多雲", picURL: "/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg" }],
    [38, { weatherType: "多雲雷陣雨", picURL: "/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg" }],
    [39, { weatherType: "短暫陣雨或雷雨", picURL: "/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg" }],
    [40, { weatherType: "午後雷陣雨", picURL: "/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg" }],
    [41, { weatherType: "晴午後短暫雷陣雨", picURL: "/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg" }],
    [42, { weatherType: "多雲午後短暫雷陣雨", picURL: "/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg" }]
]);

let authorizationKey=`CWA-2FF9CA6F-7CE3-45AE-B9E1-AB4183199775`

async function getData(locationCode,authorization) {
    const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${locationCode}?Authorization=${authorization}`
    try {
        let result = await fetch(url)
        let rawData = await result.json()
        let byZone = await rawData.records.locations[0].location
        console.log(rawData)
        return byZone
    } catch (error) {
        console.error(error)
    }
}

function WeatherBoard(prop){
    const [locationName,setLocationName] = useState(prop.locationName)
    const [data,setData] = useState(`initial`)

    function handleChange(event){
        setLocationName(event.target.value)
    }

    useEffect(()=>{
       ( async () => {
        if(locationName === `initial`) return
            let locationCode = weeklyWeatherCode.get(locationName)
            let responseData = await getData(locationCode, authorizationKey)
            setData(responseData)
            console.log(responseData)
        })()
    },[locationName])
    return (
        <div className=" m-1 bg-slate-100 border-slate-500 px-2 border-2 rounded">
            <div className="flex justify-around my-2">
            <select className="bg-slate-100 border-slate-500 border-b-2 w-1/5 tracking-widest text-center" onChange={handleChange}>
                <option key="default" value ="default">{locationName}</option>
                {Array.from(weeklyWeatherCode.entries()).map((element) => {
                    return (
                    <option key={element[0]} value ={element[0]}>{element[0]}</option>
                    )})}
            </select>
            </div>
    
            <div id="weatherBoard" className="h-28 flex justify-center gap-1 flex-wrap overflow-y-scroll snap-y">
            {
            data!=="initial" && (
            data.map((location)=>{
            return (
                    <div key ={location.locationName} className="my-l snap-center">                        
                        <ul className="w-16 mb-4 flex flex-col items-center">
                            <li className="text-xm">{location.locationName}</li>
                            <img className="w-12" src={weatherTypeMap.get(Number(location.weatherElement[6].time[0].elementValue[1].value)).picURL} alt={location.weatherElement[6].time[0].elementValue[0].value} />
                            <li>
                                <span>{location.weatherElement[0].time[0].elementValue[0].value.padStart(2," ")}<span className="text-xs">%</span> </span>
                                <span>{location.weatherElement[1].time[0].elementValue[0].value}<span className="text-xs">°C</span></span>
                            </li>
                        </ul>                        
                    </div>
                )}))}
            </div>

        </div>
    )
}

export default WeatherBoard