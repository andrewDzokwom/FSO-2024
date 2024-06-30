import { useState } from "react"

const Button = ({handleClick, text})=>{
  return <button onClick={handleClick}>{text}</button>
}


const  StatisticLine = ({text, value}) => {
  return(
    <>
    <table>
      <thead>
        <tr>
          <td>{text}</td> 
          <td>{value}</td>
        </tr>
      </thead>
     </table>
     </>
      
    
    
  )

}

const Statistic = ({good, neutral, bad})=>{
  
  
  const total = good + neutral + bad
  const average = good/total;
  const positivePercent = ((good - bad)/total)*100


  if (total === 0){
    return <p>No feedback given</p>
  }
  
  
  return (
    <>
    <StatisticLine text="good" value={good} />
    <StatisticLine text ="neutral" value={neutral} />
    <StatisticLine text ="bad" value={bad} />
    <StatisticLine text ="all" value={total} />
    <StatisticLine text ="average" value={average} />
    <StatisticLine text ="positive" value={positivePercent} />
  </>
  )
}


function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // handling clicks
  const handleGoodClick = ()=> setGood(good+1)
  const handleNeutralClick =()=> setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)
  
  

  return (
    <>
    <h2>give feedback</h2>
      <div>      
        <Button text="good" handleClick={handleGoodClick} />
        <Button text="neutral" handleClick={handleNeutralClick} /> 
        <Button text="bad" handleClick={handleBadClick} />
      </div>
      <h2>statistics</h2>
      <Statistic good={good} bad={bad} neutral={neutral} />

    </>
  )
}

export default App
