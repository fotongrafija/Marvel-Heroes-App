
import { ComponentPropsWithoutRef } from "react";
import "../styles/searchBar.scss"


// @param value = charachterName
const SearchBar = ({ onChange, value }: ComponentPropsWithoutRef<'input'>) => {

  return (
    <div className='search'>
      <input type="text"
        value={value}
        placeholder='Type character name...'
        onChange={onChange}
      />
    </div>
  )
}

export default SearchBar
