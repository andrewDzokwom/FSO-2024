import { useState, useEffect } from 'react'
import contacts from "./services/contacts"
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Header from './components/Header'
import Persons from "./components/Persons"
import axios from 'axios'




const App = () => {
  // contacts list
  const [persons, setPersons] = useState([]) 
  // for adding new name and number
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")

  // contact searching 
  const [searchTerm, setSearchTerm] = useState("")

  //contacts to dispaly
  const filteredPersons = searchTerm.trim().length > 0? persons.filter(person => person.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())): persons;

  // hook 
  const fecthDataHook = ()=>{
    // axios.get("http://localhost:3001/persons").then((response)=>{
    //   setPersons(response.data)
    // })
    contacts.getAll().then(person => setPersons(persons.concat(person)))
  }
  // use effect 
  useEffect(fecthDataHook, [])

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
      number: newNumber.trim()
    }
    // create person contact and update list on the front side
    contacts
      .createPerson(newPerson)
      .then(person => setPersons(persons.concat(person)))
    
      setNewName("")
      setNewNumber("")
  
  }
  // contacts searching 
  const  searchContacts = (e)=>{
    setSearchTerm(e.target.value.trim())
  }

  // delete a contact from the list
  const deleteContact = (id) =>{
    const [targetedContact] = persons.filter(note => note.id === id)
    console.log("the target is", targetedContact);
    
    const filteredPersons = persons.filter(person => person.id !== id)
    console.log("target", targetedContact);

    //confirm delete 
    if(window.confirm(`delete ${targetedContact.name}?`)){
      contacts.removePerson(id)
    .then(()=>{
      console.log("targettted", targetedContact);
      
      setPersons(filteredPersons)
    })
    }
    
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
        deleteContact={deleteContact}
        />
        <button onClick={()=>{
          axios.delete("http://localhost:3001/persons/8")
        }}>delete</button>
    </div>
  )
}

export default App