import WeatherBoard from "./weather"
import CreateCalender from "./calender"
import MissionBoard from "./missionBoard"

function WorkingDesk(){
    return(
        <div className="w-10/12 min-h-75p flex rounded-lg bg-slate-500 gap-x-1 p-1">
            <div className="w-1/3 flex flex-col justify-between rounded-lg bg-slate-300">
                <WeatherBoard locationName="高雄市" />
                <CreateCalender />
            </div>
            <div className="w-1/3  rounded-lg bg-slate-300">
                <h1>Middle</h1>
            </div>
            <div className="w-1/3  rounded-lg bg-slate-300">
                <MissionBoard />
            </div>
        </div>
    )
}


export default WorkingDesk