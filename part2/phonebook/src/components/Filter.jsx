const Filter = ({searchContacts})=>{
    return (
      <div>
          filter shown with 
          <input 
            type="text" 
            onChange={searchContacts}
          />
        </div>
    )
  }

  export default Filter;