import WeatherBoard from "./weather"

function WorkingDesk(){
    return(
        <div className="w-10/12 min-h-70p flex rounded-lg bg-slate-500 gap-x-1 p-1">
            <div className="w-3/12  rounded-lg bg-slate-300">
                <WeatherBoard locationName="高雄市" />
            </div>
            <div className="w-6/12  rounded-lg bg-slate-300">
                <h1>Middle</h1>
            </div>
            <div className="w-3/12  rounded-lg bg-slate-300">
                <h1>Right</h1>
            </div>
        </div>
    )
}


export default WorkingDesk