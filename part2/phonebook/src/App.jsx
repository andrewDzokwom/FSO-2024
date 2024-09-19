import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Header from './components/Header'
import Persons from "./components/Persons"
import axios from "axios"




const App = () => {
  // contacts list
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "690-234-90",
      id: 1
     }
  ]) 
  // for adding new name and number
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")

  // contact searching 
  const [searchTerm, setSearchTerm] = useState("")

  //contacts to dispaly
  const filteredPersons = searchTerm.trim().length > 0? persons.filter(person => person.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())): persons;

  // use effect 
  useEffect(()=>{
    
    axios.get("http://localhost:3001/persons").then((response)=>{
      setPersons(response.data)
    })
  }, [])

  // handle setting of new contact name 
  const handleNewName = (e)=>{
    setNewName(e.target.value)
  }

  //handle setting of new number
  const handleNewNumber = (e)=>{
    setNewNumber(e.target.value) 
  }
  

  // add contact to contact list and empty the newName and newNumber
  const addPerson = (e)=>{
    e.preventDefault()
    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(), 
      id: persons.length + 1
    }

    setPersons(persons.concat(newPerson))
    setNewName("")
    setNewNumber("")
  
  }

  const  searchContacts = (e)=>{
    setSearchTerm(e.target.value.trim())
  }


  return (
    <div>
      <Header
        title={"Phonebook"}
        />
      <Filter searchContacts={searchContacts} />
      
      <Header
        title={"Add new contact"}
        />

      <PersonForm
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
        />
   
      <Header
        title={"Numbers"}
        />
      <Persons
        persons={filteredPersons}
        />
    </div>
  )
}

export default App