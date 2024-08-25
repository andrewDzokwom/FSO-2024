

function Total({ parts }) {
    return (
      <h3>Number of exercises {parts.map((part)=>{ return part.exercises;}).reduce((sum, current)=>{return sum + current;}, 0)}</h3>
    )
  }
export default Total;  