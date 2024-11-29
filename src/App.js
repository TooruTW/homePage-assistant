import './App.css';
import WorkingDesk from './workingDesk';
import Clock from './clock';

function App() {
  return (
    <div className="App w-screen h-screen">
      <div className="w-screen h-5/6 bg-slate-100 flex flex-col items-center">     
      <Clock />   
      <WorkingDesk />
      </div>
      <div>
      </div>
      
    </div>
  );
}

export default App;
