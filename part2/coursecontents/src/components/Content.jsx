import Header from "./Header"
import Part from "./Part"

const Content = ({course})=>{
    const { parts} = course
    
    return (
      <>
      <Header title={course.name} />
     
      {parts.map(part => <Part key={part.id}  part={part} />)}
      </>
    )
  }

  export default Content;
  