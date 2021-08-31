import { useContext, useEffect, useState } from "react"
import {Link, useHistory} from "react-router-dom"
import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"
import AlbumsContext from "../context/albums"

import * as ROUTES from "../constants/routes"

import Header from "../components/Header"
import SearchResults from "../components/Search/SearchResults"

const Search = ({searchInput}) => {
    
    const {albumsCollection} = useContext(AlbumsContext)

    // const [searchQuery, setSearchQuery] = useState("")
    // const value = {searchQuery, setSearchQuery}

    // console.log(value)

    // console.log("this search query is rendered at Search page component, ", searchQuery)

    return (
        <div>
            <Header searchInput={searchInput}/>

            <h2>this is search results page</h2>

            <SearchResults searchInput={searchInput}/>
        </div>
    )
}

export default Search