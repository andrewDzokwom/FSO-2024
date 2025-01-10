const Person = ({person, deleteContact})=>{
    return(
        <div className={"person"}>
            {person.name} {person.number} {"  "}
            <button onClick={()=> deleteContact(person.id)}>delete</button>
        </div>
    )
}

export default Person;