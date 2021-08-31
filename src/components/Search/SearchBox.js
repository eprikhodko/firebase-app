import { useState } from "react"

import { useHistory } from "react-router"
import * as ROUTES from "../../constants/routes"

const SearchBox = ({searchInput}) => {

    // https://stackoverflow.com/questions/48433008/js-es6-destructuring-of-undefined
    // here we're using "Short-circuit evaluation", https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR#short-circuit_evaluation
    const {searchQuery, setSearchQuery} = searchInput || {}

    const history = useHistory()

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        // if (searchQuery !== "") {
        //     history.push(`/search`)
        // } else {
        //     history.push("/not-found")
        // }

        history.push("/search")
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

export default SearchBox