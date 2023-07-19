import { useState } from 'react';
import './App.css';
import Loading from './components/Loading/Loading';

function App() {
  let [ans1, setAns1] = useState("")
  let [ans2, setAns2] = useState("")
  let [ans3, setAns3] = useState("")
  let [loading, setLoading] = useState(false)
  let [response, setResponse] = useState(undefined)

  let handleSubmit = async (e) => {
    e.preventDefault()
    let userInput = `feeling ${ans1} right now, they currently are ${ans2} and facing  ${ans3} issues today`
    setResponse(undefined)
    setLoading(true)
      try {
        let res = await fetch("https://qt-ai-api.onrender.com/", {
          method: "POST",
          headers: {
            "Content-Type":"application/json", 
          },
          body: JSON.stringify({
            "usecase": "GPT_MEDITATION_CREATOR", userInput
          }),
        })
        res=await res.json()
        setLoading(false)
        setResponse(res)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className="App">
      <h1>Mediation Ai</h1>
      {!loading && <form onSubmit={handleSubmit}>
        <label htmlFor="ans1" >How are you feeling right now?</label>
        <input type="text" htmlFor="ans1" onChange={(e) => { setAns1(e.target.value) }} required />
        <label htmlFor="ans2" >What do you do?</label>
        <input type="text" htmlFor="ans2" onChange={(e) => { setAns2(e.target.value) }} required />
        <label htmlFor="ans3" >What are the issues you are facing today?</label>
        <input type="text" htmlFor="ans3" onChange={(e) => { setAns3(e.target.value) }} required />
        <input type="submit" />
      </form>}
      {loading&&<Loading />}
      {response && <div>
        <h2>Generated Text</h2>
        <h4>{response.generatedText}</h4>
        </div>}
    </div>
  );
}

export default App;
