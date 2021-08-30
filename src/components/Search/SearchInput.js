import { useState } from "react"

const SearchInput = () => {

    const [searchQuery, setSearchQuery] = useState("")

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        console.log("search this:", searchQuery)
    }

    console.log("this is input value:", searchQuery)

    return (
        <div>
            <form className="header__form-search" onSubmit={handleSearchSubmit}>
                {/* <label className="label" htmlFor="query"></label> */}
                <input 
                    className="header__input-search" 
                    type="search" 
                    name="query"
                    placeholder="search" 
                    value={searchQuery} 
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
                <button className="button-search" type="submit">Search</button>
            </form>
        </div>
    )    
}

export default SearchInput