import React , {useState} from 'react';
import './App.css';
import Header from './components/Header';
import DayIntervalChart from './components/DayIntervalChart';
function App() {
  const [name , setName] = useState("IBM")
  const [dayIntervalData, setDayIntervalData] = useState({})
  return (
    <div className="App">
      <Header name={name} setName={setName} setDayIntervalData={setDayIntervalData}/>
      
      <DayIntervalChart dayIntervalData={dayIntervalData} id="first" />
      <DayIntervalChart dayIntervalData={dayIntervalData} id="second" />
      <DayIntervalChart dayIntervalData={dayIntervalData} id="third" />

    </div>
  );
}

export default App;
