import { useContext, useEffect, useState } from "react"
import {Link, useHistory} from "react-router-dom"
import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"
import AlbumsContext from "../context/albums"

import * as ROUTES from "../constants/routes"

import Header from "../components/Header"
import SearchResults from "../components/Search/SearchResults"
import NothingFoundOnSearch from "../components/Search/NothingFoundOnSearch"

const Search = ({searchInput, nothingIsFound, filtered, submit}) => {

    // console.log("repeat search?", searchAgain)

    return (
        <div>
            <Header searchInput={searchInput} submit={submit}/>

            <h2>this is search page</h2>

            {/* if searchQuery is empty, render NothingFoundOnSearch instead of SearchResults */}
            {/* {searchQuery ? <SearchResults searchInput={searchInput}/> : <NothingFoundOnSearch searchInput={searchInput}/>}  */}
            <SearchResults searchInput={searchInput} nothingIsFound={nothingIsFound} filtered={filtered} submit={submit}/>
            {/* {isSearchInputEmpty ? <NothingFoundOnSearch searchInput={searchInput}/> : <SearchResults searchInput={searchInput}/>}  */}
        </div>
    )
}

export default Search