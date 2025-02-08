import Person from "./Person"

const Persons = ({persons, deleteContact})=>{
    return(
        <>{persons.map(person=> <Person key={person.id} person={person} id={person.id} deleteContact={deleteContact} /> )}
        </>
    )

}

export default Persons;