const Person = ({person, deleteContact})=>{
    return(
        <div>
            {person.name} {person.number} {"  "}
            <button onClick={()=> deleteContact(person.id)}>delete</button>
        </div>
    )
}

export default Person;