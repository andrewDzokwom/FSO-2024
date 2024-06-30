import { useState } from 'react'

function isPositive(array){
  return array.reduce((sum, currentValue) => sum + currentValue, 0) > 0;
}

const Title = ({title})=>(
  <h1>{title}</h1>
)

const Button = ({title, handClick})=>(
  <button onClick={handClick}>{title}</button>
)

const Anecdote = ({anecdotes, vote, selected})=>{
  return(
    <>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected] > 1 ? `${vote[selected]} votes`:`${vote[selected]} vote`}</p>
    </>
  )
}
const MostVotedAnecdote = ({vote, anecdotes, selected})=>(
  <p>{isPositive(vote)? `${anecdotes[selected]}`: `No most voted anecdote yet!`}</p>
)


function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const[indexOfMaxVote, setIndex] = useState(null);
  const anecdotesLength = anecdotes.length;


  const [selected, setElected] = useState(0)
  const [vote, setVote] = useState(new Array(anecdotesLength).fill(0))
  
  const handleRandomAnecdote = ()=>{
    setElected(Math.floor(Math.random()* anecdotesLength))
  }
  const handleVote = ()=>{
    const newVote = [...vote]
    newVote[selected] += 1
    setVote(newVote) 
    const maxVote = Math.max(...newVote)
    setIndex(newVote.indexOf(maxVote))
  } 
  

  return (
    <>
      <Title title={"Another Anecdote of the Day"} />
      <Anecdote 
        selected={selected}
        anecdotes={anecdotes} 
        vote={vote} 
       />
      <Button title={"vote"} handClick={handleVote} />
      <Button title={"next anecdote"} handClick={handleRandomAnecdote} />
      <Title title={"Anecdote with Most Votes"} />
     <MostVotedAnecdote vote={vote} anecdotes={anecdotes} selected={indexOfMaxVote} />
    </>
  )
}

export default App
