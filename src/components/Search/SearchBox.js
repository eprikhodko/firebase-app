import { useState, useEffect, useContext } from "react"

import AlbumsContext from "../../context/albums"

import { useHistory } from "react-router"
import * as ROUTES from "../../constants/routes"

const SearchBox = ({searchInput, nothingIsFound, albums, submit}) => {

    // https://stackoverflow.com/questions/48433008/js-es6-destructuring-of-undefined
    // here we're using "Short-circuit evaluation", https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR#short-circuit_evaluation
    const {searchQuery, setSearchQuery} = searchInput || {}
    // const {nothingFound, setNothingFound} = nothingIsFound || {}
    // const {albumsCollection} = albums || {}
    const {submitSearch, setSubmitSearch} = submit || {}
  

    const history = useHistory()

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        setSubmitSearch(searchQuery)
        history.push(`/search`)
        // if (searchQuery !== "") {
        //     history.push(`/search`)
        // } else {
        //     history.push("/upload")
        // }

        // history.push(`/search/${searchQuery}`)
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
                <button 
                    // className="button-search" 
                    className={`button-search ${!searchQuery && "btn-disabled"}`}
                    // className="btn-disabled"
                    type="submit">Search</button>
            </form>
        </div>
    )    
}

export default SearchBox