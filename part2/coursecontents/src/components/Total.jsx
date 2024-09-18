

function Total({ parts }) {
    return (
      <h3>Total of {parts.map((part)=>{ return part.exercises;}).reduce((sum, current)=>{return sum + current;}, 0)} exercises</h3>
    )
  }
export default Total;  