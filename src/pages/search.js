import { useContext, useEffect, useState } from "react"
import {Link, useHistory} from "react-router-dom"
import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"
import AlbumsContext from "../context/albums"

import * as ROUTES from "../constants/routes"

import Header from "../components/Header"
import SearchResults from "../components/Search/SearchResults"
import NothingFoundOnSearch from "../components/Search/NothingFoundOnSearch"

const Search = ({searchInput}) => {
    
    const {albumsCollection} = useContext(AlbumsContext)
    const {searchQuery} = searchInput

    // console.log("this value was rendered at SearchResults component ", searchQuery )

    // console.log(searchQuery)

    if (searchQuery !== "") {
        const filteredAlbums = albumsCollection.filter(album => {
            return album.albumTitle.toLowerCase().includes(searchQuery.toLowerCase())
        })   
        // console.log(filteredAlbums)

    }

    

    // console.log(filteredAlbums)

    // console.log(albumsCollection)
    // console.log(searchQuery)

    // const [isSearchInputEmpty, setIsSearchInputEmpty] = useState(true)
    // console.log("is search input is empty?", isSearchInputEmpty)

    // const [searchQuery, setSearchQuery] = useState("")
    // const value = {searchQuery, setSearchQuery}

    // console.log(value)

    // console.log("this search query is rendered at Search page component, ", searchQuery)

    return (
        <div>
            <Header searchInput={searchInput}/>

            <h2>this is search page</h2>

            {/* if searchQuery is empty, render NothingFoundOnSearch instead of SearchResults */}
            {/* {searchQuery ? <SearchResults searchInput={searchInput}/> : <NothingFoundOnSearch searchInput={searchInput}/>}  */}
            <SearchResults searchInput={searchInput}/>
            {/* {isSearchInputEmpty ? <NothingFoundOnSearch searchInput={searchInput}/> : <SearchResults searchInput={searchInput}/>}  */}
        </div>
    )
}

export default Search