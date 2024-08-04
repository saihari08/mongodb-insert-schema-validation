import {useState} from "react";
import './App.css';

function App() {

let [studentArr,setStudentsArr]=useState([]);
  let getStudents=async()=>{
    let reqOptions={
      method:"GET"
    }
  let JSONData = await fetch("http://localhost:2120/students",reqOptions);

  let JSOData = await JSONData.json();
  setStudentsArr(JSOData);
  console.log(JSOData);

  }
  return (
    <div className="App">
      <button onClick={()=>{
        getStudents();
      }}>Get Students</button>
      {studentArr.map((ele,i)=>{
        return<div style={{border:"2px solid black"}}>
          <h2>Name:{ele.firstName}{ele.lastName}</h2>
          <h2>Gender:{ele.gender}</h2>
          <h2>Email:{ele.email}</h2>
        </div>
      })}
    </div>
  );
}

export default App;
