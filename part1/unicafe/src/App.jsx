import { useState } from "react"

const Statistic = (props)=>{

  
  const {good, neutral, bad} = props
  const total = good + neutral + bad
  if (total === 0){
    return <p>No feedback given</p>
  }

  console.log(props)
  return (
    <>
    
    <p>good: {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {good+bad+neutral}</p>
    <p>average{((good - bad)/(good + bad + neutral))}</p>
    <p>positive {(good/(good + bad + neutral)*100)}%</p>
  </>
  )
}


function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  

  return (
    <>
    <h2>give feedback</h2>
    <div>
      <button onClick={()=> setGood(good + 1)}>good</button>
      <button onClick={()=> setNeutral(neutral + 1)}>neutral</button>
      <button onClick={()=> setBad(bad + 1)}>bad</button>
    </div>
    <h2>statistics</h2>
    <Statistic good={good} bad={bad} neutral={neutral} />

    </>
  )
}

export default App
