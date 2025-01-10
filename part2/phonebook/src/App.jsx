import { useState, useEffect } from 'react'
import contacts from "./services/contacts"
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Header from './components/Header'
import Persons from "./components/Persons"
import Notification from './components/Notification'


const App = () => {
  // contacts list
  const [persons, setPersons] = useState([]) 
  // for adding new name and number
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")

  // contact searching 
  const [searchTerm, setSearchTerm] = useState("")

  // handle notification
  const [notificationMessage, setNotificationMessage] = useState({message: "", isNotifiable: false, isAlert: false})

  //contacts to display
  const filteredPersons = searchTerm.trim().length > 0? persons.filter(person => person.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())): persons;

  // hook 
  const fetchDataHook = ()=>{
    contacts.getAll().then(person => setPersons(persons.concat(person)))
  }
  // use effect 
  useEffect(fetchDataHook, [])

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
    if (newPerson.name.length === 0 && newPerson.number.length === 0){
      return
    }
    
    // check if contact already exists
    if(persons.find(person => person.name.toLocaleLowerCase() === newPerson.name.toLowerCase())){
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){
        const targetedPerson = persons.find(person => person.name.toLocaleLowerCase() === newPerson.name.toLowerCase())
        const {id} = targetedPerson
        let updatedPerson = {...targetedPerson, number: newPerson.number}
        contacts
        .updatePerson(id, updatedPerson)
        .then(response => {
          setPersons(persons.map(person => (person.id !== id)? person: response))
          setNotificationMessage({message: `${updatedPerson.name}'s number updated`, isNotifiable: true, isAlert: false})
          setTimeout(()=>{
            setNotificationMessage({...notificationMessage, message:"", isNotifiable: false})
          }, 3000)
        .catch(error => {
          console.log(error)
          setNotificationMessage({...notificationMessage, message:`Information of ${updatedPerson.name} has already been removed from server`, isNotifiable: false})
          setTimeout(()=>{
            setNotificationMessage({...notificationMessage, message:"", isNotifiable: false})
          }, 3000)
        })
        })
      }
      setNewName("")
      setNewNumber("")
      return
    }
    // create person contact and update list on the front side
    contacts
      .createPerson(newPerson)
      .then(person => {
        setPersons(persons.concat(person))
        setNotificationMessage({...notificationMessage, message: `Added ${newPerson.name} successfully!`, isNotifiable: true})
        setTimeout(()=>{
          setNotificationMessage({...notificationMessage, message:"", isNotifiable: false})
        }, 3000)
      })
      .catch(error => {
        console.log(error)

      })
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
    
    const filteredPersons = persons.filter(person => person.id !== id)

    //confirm delete 
    if(window.confirm(`delete ${targetedContact.name}?`)){
      contacts.removePerson(id)
    .then(()=>{
      setNotificationMessage({isAlert: true,message: `${targetedContact.name} deleted from the server!`, isNotifiable: true})
      setPersons(filteredPersons)
      setTimeout(()=>{
        setNotificationMessage({isAlert: false, message:"", isNotifiable: false})
      }, 3000)

    })
    .catch(error => console.log(`failed: ${error.message}`))
    }
    
  }


  return (
    <div>
      <Header
        title={"Phonebook"}
        />
      {notificationMessage.isNotifiable? <Notification message={notificationMessage.message} isAlert={notificationMessage.isAlert} />:null}
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
        
    </div>
  )
}

export default App