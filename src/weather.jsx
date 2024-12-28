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
    [1, { weatherType: "晴天", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-sunny-svgrepo-com.svg` }],
    [2, { weatherType: "晴時多雲", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-partly-cloudy-day-svgrepo-com.svg` }],
    [3, { weatherType: "多雲時晴", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-partly-cloudy-day-svgrepo-com.svg` }],
    [4, { weatherType: "多雲", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-cloudy-svgrepo-com.svg` }],
    [5, { weatherType: "多雲時陰", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-cloudy-svgrepo-com.svg` }],
    [6, { weatherType: "陰時多雲", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-cloudy-svgrepo-com.svg` }],
    [7, { weatherType: "陰天", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-cloudy-svgrepo-com.svg` }],
    [8, { weatherType: "陣雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-drizzle-svgrepo-com.svg` }],
    [9, { weatherType: "多雲時陰短暫雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-drizzle-svgrepo-com.svg` }],
    [10, { weatherType: "陰時多雲短暫雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-drizzle-svgrepo-com.svg` }],
    [11, { weatherType: "雨天", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-rain-svgrepo-com.svg` }],
    [12, { weatherType: "多雲時陰有雨", picURL: `${process.env.PUBLIC_URL}/element/weather-rain-svgrepo-com.svg` }],
    [13, { weatherType: "陰時多雲有雨", picURL: `${process.env.PUBLIC_URL}/element/weather-rain-svgrepo-com.svg` }],
    [14, { weatherType: "陰有雨", picURL: `${process.env.PUBLIC_URL}/element/weather-rain-svgrepo-com.svg` }],
    [15, { weatherType: "多雲陣雨或雷雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-drizzle-svgrepo-com.svg` }],
    [16, { weatherType: "多雲時陰陣雨或雷雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-rain-showers-day-svgrepo-com.svg` }],
    [17, { weatherType: "陰時多雲有雷陣雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-rain-showers-day-svgrepo-com.svg` }],
    [18, { weatherType: "陰有陣雨或雷雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg` }],
    [19, { weatherType: "晴午後多雲局部雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-drizzle-svgrepo-com.svg` }],
    [20, { weatherType: "多雲午後局部雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-drizzle-svgrepo-com.svg` }],
    [21, { weatherType: "晴午後多雲陣雨或雷雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg` }],
    [22, { weatherType: "多雲午後局部陣雨或雷雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg` }],
    [23, { weatherType: "多雲局部陣雨或雪", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-drizzle-svgrepo-com.svg` }],
    [24, { weatherType: "晴有霧", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-fog-svgrepo-com` }],
    [25, { weatherType: "晴時多雲有霧", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-fog-svgrepo-com` }],
    [26, { weatherType: "多雲時晴有霧", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-fog-svgrepo-com` }],
    [27, { weatherType: "多雲有霧", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-fog-svgrepo-com` }],
    [28, { weatherType: "陰有霧", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-fog-svgrepo-com` }],
    [29, { weatherType: "多雲局部雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-drizzle-svgrepo-com.svg` }],
    [30, { weatherType: "多雲時陰局部雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-drizzle-svgrepo-com.svg` }],
    [31, { weatherType: "多雲有霧有局部雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-drizzle-svgrepo-com.svg` }],
    [32, { weatherType: "多雲時陰有霧有局部雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-drizzle-svgrepo-com.svg` }],
    [33, { weatherType: "多雲局部陣雨或雷雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-drizzle-svgrepo-com.svg` }],
    [34, { weatherType: "多雲時陰局部陣雨或雷雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-drizzle-svgrepo-com.svg` }],
    [35, { weatherType: "多雲有陣雨或雷雨有霧", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg` }],
    [36, { weatherType: "多雲時陰有雷陣雨有霧", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg` }],
    [37, { weatherType: "多雲局部雨或雪有霧", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-fog-svgrepo-com` }],
    [38, { weatherType: "短暫陣雨有霧", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-fog-svgrepo-com` }],
    [39, { weatherType: "有雨有霧", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-fog-svgrepo-com` }],
    [40, { weatherType: "午後雷陣雨", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg` }],
    [41, { weatherType: "短暫陣雨或雷雨有霧", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-thunderstorm-svgrepo-com.svg` }],
    [42, { weatherType: "下雪", picURL: `${process.env.PUBLIC_URL}/element/weatherSvg/weather-snowflake-svgrepo-com.svg` }]
]);

let authorizationKey=`CWA-2FF9CA6F-7CE3-45AE-B9E1-AB4183199775`

async function getData(locationCode,authorization) {
    const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${locationCode}?Authorization=${authorization}`
    try {
        let result = await fetch(url)
        let rawData = await result.json()
        let byZone = await rawData.records.Locations[0].Location
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
        })()
    },[locationName])

    return (
        <div className=" m-1 bg-slate-100 border-slate-500 px-2 border-2 rounded">
            <div className="flex justify-around my-2">
            <select className="bg-slate-100 border-slate-500 border-b-2 min-w-20 tracking-widest text-center" onChange={handleChange}>
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
                    <div key ={location.LocationName} className="my-l w-1/6  snap-center">                        
                        <ul className="mb-4 flex flex-col items-center">
                            <li className="text-xm">{location.LocationName}</li>
                            <img className="w-auto px-3" src={weatherTypeMap.get(Number(location.WeatherElement[12].Time[0].ElementValue[0].WeatherCode)).picURL} alt={location.WeatherElement[12].Time[0].ElementValue[0].Weather} />
                            <li className="w-full flex justify-around ">
                                <span>{location.WeatherElement[11].Time[0].ElementValue[0].ProbabilityOfPrecipitation.padStart(2," ")}<span className="text-xs">%</span></span>
                                <span>{location.WeatherElement[0].Time[0].ElementValue[0].Temperature}<span className="text-xs">°C</span></span>
                            </li>
                            
                        </ul>                        
                    </div>
                )}))}
            </div>

        </div>
    )
}

export default WeatherBoard