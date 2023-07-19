import { useState } from 'react';
import './App.css';

function App() {
  let [ans1,setAns1]=useState("")
  let [ans2,setAns2]=useState("")
  let [ans3,setAns3]=useState("")

  let handleSubmit=async(e)=>{
    e.preventDefault()
    let userInput=`feeling ${ans1} right now, they currently are ${ans2} and facing  ${ans3} issues today`
    console.log(userInput)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="ans1" >How are you feeling right now?</label>
        <input type="text" htmlFor="ans1" onChange={(e)=>{setAns1(e.target.value)}} required />
        <label htmlFor="ans2" >What do you do?</label>
        <input type="text" htmlFor="ans2" onChange={(e)=>{setAns2(e.target.value)}} required />
        <label htmlFor="ans3" >What are the issues you are facing today?</label>
        <input type="text" htmlFor="ans3" onChange={(e)=>{setAns3(e.target.value)}} required />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
