import WeatherBoard from "./weather"
import CreateCalender from "./calender"
import MissionBoard from "./missionBoard"
import CreateNote from "./noteBoard"

function WorkingDesk(){
    return(
        <div className="w-10/12 min-h-75p flex rounded-lg bg-slate-500 gap-x-1 p-1">
            <div className="w-1/3 rounded-lg bg-slate-300 overflow-y-scroll">
                <WeatherBoard locationName="高雄市" />
                <CreateCalender />
            </div>
            <div className="w-1/3  rounded-lg bg-slate-300">
                <CreateNote />
            </div>
            <div className="w-1/3  rounded-lg bg-slate-300">
                <MissionBoard />
            </div>
        </div>
    )
}


export default WorkingDesk